#!/usr/bin/env node
/**
 * sync-docs.mjs — gera os espelhos do site MkDocs (`docs/`) a partir das fontes do repositório,
 * reescrevendo os links relativos para que funcionem nos DOIS lugares:
 *   - no GitHub web, as fontes (README.md, spec/, example/) mantêm os links relativos ao repositório;
 *   - no GitHub Pages, as cópias em docs/ recebem links relativos ao site.
 *
 * Regra de reescrita de cada link relativo encontrado numa fonte espelhada:
 *   1. o alvo é resolvido a partir da pasta da FONTE (como o GitHub faz);
 *   2. se o alvo também é publicado no site (arquivo ou pasta mapeada abaixo), o link aponta
 *      para a página correspondente, relativo à pasta da CÓPIA;
 *   3. se o alvo existe no repositório mas não no site (LICENSE, CONTRIBUTING.md...), vira URL
 *      absoluta do GitHub (`repo_url` do mkdocs.yml);
 *   4. links externos, âncoras (#...) e conteúdo de blocos de código não são tocados.
 *
 * Guardas de consistência (falham nos dois modos):
 *   - toda página gerada está no `nav` do mkdocs.yml;
 *   - README.md, README.en.md, docs/index.md e mkdocs.yml citam o mesmo conjunto de plugins
 *     (`github.com/sdd-standard/sdd-*`).
 *
 * Para incluir uma página nova ou um plugin oficial, siga o "Checklist" do CONTRIBUTING.md.
 *
 * Uso:  node scripts/sync-docs.mjs          gera/atualiza os espelhos
 *       node scripts/sync-docs.mjs --check  só verifica (exit 1 se algum espelho estiver desatualizado
 *                                           ou alguma guarda falhar)
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = "docs";
const checkOnly = process.argv.includes("--check");

const mkdocsYml = readFileSync(join(ROOT, "mkdocs.yml"), "utf8");
const REPO_URL = (mkdocsYml.match(/^repo_url:\s*(\S+)/m)?.[1] ?? "").replace(/\/+$/, "");
const BRANCH = "main";

// Fonte (relativa ao repositório) → página do site (relativa a docs/)
const FILE_MAP = new Map([
  ["README.md", "manifesto/pt.md"],
  ["README.en.md", "manifesto/en.md"],
  ["example/README.md", "example/index.md"],
]);
for (const f of readdirSync(join(ROOT, "spec")).filter((n) => n.endsWith(".md")).sort()) {
  FILE_MAP.set(`spec/${f}`, `spec/${f}`);
}
for (const f of readdirSync(join(ROOT, "example/docs/sdd")).filter((n) => n.endsWith(".md")).sort()) {
  FILE_MAP.set(`example/docs/sdd/${f}`, `example/${f}`);
}

// Pastas da fonte que, no site, viram uma página específica
const DIR_MAP = new Map([
  ["spec", "spec/01-introduction.md"],
  ["example", "example/index.md"],
  ["example/docs/sdd", "example/index.md"],
  ["example/docs/sdd/changes/add-task-labels", "example/changes-labels.md"],
  ["example/docs/sdd/archive/add-board-sharing", "example/archive-sharing.md"],
]);

// Casa só o alvo `](alvo)`: cobre texto de link com `código`, imagens e badges aninhados `[![..](..)](alvo)`.
const LINK_RE = /(\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g;
const isExternal = (t) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t);

// O GitHub preserva acentos no slug dos títulos (`#implementações-oficiais`); o MkDocs (toc/slugify
// padrão) os remove (`#implementacoes-oficiais`). Âncoras que apontam para páginas do site são convertidas.
const toSiteAnchor = (anchor) =>
  decodeURIComponent(anchor).normalize("NFKD").replace(/[̀-ͯ]/g, "");

function rewriteTarget(target, srcRel, destRel) {
  if (isExternal(target)) return target;
  const hashAt = target.indexOf("#");
  const pathPart = hashAt >= 0 ? target.slice(0, hashAt) : target;
  const anchor = hashAt >= 0 ? target.slice(hashAt) : "";
  if (!pathPart) return toSiteAnchor(anchor);

  const resolvedRel = posix.normalize(posix.join(posix.dirname(srcRel), pathPart)).replace(/\/+$/, "");
  const sitePage = FILE_MAP.get(resolvedRel) ?? DIR_MAP.get(resolvedRel);
  if (sitePage) {
    const fromDir = posix.dirname(destRel);
    return posix.relative(fromDir, sitePage) + toSiteAnchor(anchor);
  }

  const abs = join(ROOT, resolvedRel);
  if (resolvedRel.startsWith("..") || !existsSync(abs)) {
    throw new Error(`${srcRel}: link quebrado na própria fonte → "${target}"`);
  }
  const kind = statSync(abs).isDirectory() ? "tree" : "blob";
  return `${REPO_URL}/${kind}/${BRANCH}/${resolvedRel}${anchor}`;
}

function transform(text, srcRel, destRel) {
  let fenced = false;
  return text
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        fenced = !fenced;
        return line;
      }
      if (fenced) return line;
      return line.replace(LINK_RE, (_, open, target, close) => open + rewriteTarget(target, srcRel, destRel) + close);
    })
    .join("\n");
}

const header = (srcRel) =>
  `<!-- ARQUIVO GERADO por scripts/sync-docs.mjs a partir de ${srcRel} — edite a fonte, não esta cópia. -->\n`;

let stale = 0;
for (const [srcRel, destRelFromDocs] of FILE_MAP) {
  const destRel = `${DOCS}/${destRelFromDocs}`;
  const body = transform(readFileSync(join(ROOT, srcRel), "utf8"), srcRel, destRelFromDocs);
  const output = header(srcRel) + body;
  const destAbs = join(ROOT, destRel);
  const current = existsSync(destAbs) ? readFileSync(destAbs, "utf8") : null;
  if (current === output) continue;
  stale++;
  if (checkOnly) {
    console.log(`desatualizado: ${destRel} (fonte: ${srcRel})`);
  } else {
    mkdirSync(dirname(destAbs), { recursive: true });
    writeFileSync(destAbs, output, "utf8");
    console.log(`gerado: ${destRel}  ←  ${srcRel}`);
  }
}

// ── Guardas de consistência do site (rodam nos dois modos; qualquer falha derruba o CI) ──
const problems = [];

// 1. Toda página gerada precisa estar no `nav` do mkdocs.yml (página fora do nav não aparece no menu
//    e o `mkdocs build --strict` não acusa).
const navTargets = new Set([...mkdocsYml.matchAll(/^\s*-\s*(?:"[^"]*"|[^:\n]+):\s*(\S+\.md)\s*$/gm)].map((m) => m[1]));
for (const page of new Set([...FILE_MAP.values(), ...DIR_MAP.values()])) {
  if (!navTargets.has(page)) problems.push(`docs/${page} é gerada mas não está no nav do mkdocs.yml`);
}

// 2. Os plugins oficiais são listados em 4 lugares; todos precisam citar o mesmo conjunto de repositórios.
const PLUGIN_LISTINGS = ["README.md", "README.en.md", "docs/index.md", "mkdocs.yml"];
const pluginSets = PLUGIN_LISTINGS.map((rel) => {
  const text = readFileSync(join(ROOT, rel), "utf8");
  return [rel, new Set([...text.matchAll(/github\.com\/sdd-standard\/(sdd-[a-z0-9-]+)/g)].map((m) => m[1]))];
});
const allPlugins = new Set(pluginSets.flatMap(([, s]) => [...s]));
for (const [rel, set] of pluginSets) {
  const missing = [...allPlugins].filter((p) => !set.has(p));
  if (missing.length) problems.push(`${rel} não lista o(s) plugin(s): ${missing.join(", ")}`);
}

if (problems.length) {
  console.error(`\nInconsistências do site (${problems.length}) — ver "Checklist" no CONTRIBUTING.md:`);
  for (const p of problems) console.error(`  - ${p}`);
}

if (checkOnly) {
  console.log(stale ? `\n${stale} espelho(s) desatualizado(s). Rode: node scripts/sync-docs.mjs` : "OK: espelhos em dia.");
  process.exit(stale || problems.length ? 1 : 0);
}
console.log(`\n${FILE_MAP.size} espelho(s) verificados, ${stale} atualizado(s).`);
if (problems.length) process.exit(1);
