# Contribuindo para o Padrão SDD

Obrigado pelo seu interesse em fortalecer o **Spec-Driven Development (SDD)** como o padrão de desenvolvimento assistido por IA.

---

## Tipos de Contribuição

1. **Aprimoramentos da Especificação Canônica (RFCs)**:
   - Propostas de evolução dos princípios fundamentais (P1–P11) ou da gramática GEARS.
   - Abra uma *Issue* com a tag `[RFC]` descrevendo a motivação, o trade-off e a regra proposta.
2. **Novos Adaptadores de Tooling (Novas IDEs/Agentes)**:
   - Quer portar a suíte SDD para o Cursor, Roo Code, Windsurf ou Copilot?
   - Crie um repositório satélite seguindo a convenção `sdd-<plataforma>` e submeta um Pull Request adicionando-o na tabela de implementações do README.
3. **Casos de Uso e Documentação**:
   - Exemplos práticos de greenfield e brownfield (spec-on-touch).
   - Tradução do manifesto para outros idiomas (inglês, espanhol, etc.).

---

## Diretrizes Fundamentais

- **Preservação da Pureza Metodológica**: Qualquer extensão ou adaptação deve respeitar os 11 princípios fundamentais, com ênfase absoluta no **P1** (a spec como fonte da verdade) e **P11** (estado fora do chat).
- **Sintaxe GEARS**: Requisitos devem sempre manter as palavras-chave canônicas em inglês (`Where`, `While`, `When`, `shall`).
- **Fonte única do site**: `docs/manifesto/`, `docs/spec/` e as páginas numeradas de `docs/example/` são **geradas** por `node scripts/sync-docs.mjs` a partir de `README.md`, `README.en.md`, `spec/` e `example/`. Edite sempre a fonte e rode o script; o CI regenera as cópias e publica com `mkdocs build --strict`.

---

## Como o site é montado (leia antes de mexer em `docs/`, `spec/`, `example/` ou nos READMEs)

Os arquivos do repositório são escritos para funcionar **no GitHub**: os links são relativos à pasta da fonte (`./spec/...`, `docs/sdd/constitution.md`, `./LICENSE`). O site do GitHub Pages (MkDocs) publica a pasta `docs/`, onde esses mesmos caminhos não existem. Por isso o site **não usa cópias idênticas**: `scripts/sync-docs.mjs` gera cada página de `docs/` a partir da fonte e reescreve os links.

| Fonte (edite aqui) | Página gerada no site | Quem gera |
|---|---|---|
| `README.md` / `README.en.md` | `docs/manifesto/pt.md` / `en.md` | `sync-docs.mjs` |
| `spec/*.md` | `docs/spec/*.md` | `sync-docs.mjs` (todo `.md` da pasta, automaticamente) |
| `example/README.md` | `docs/example/index.md` | `sync-docs.mjs` |
| `example/docs/sdd/*.md` | `docs/example/*.md` | `sync-docs.mjs` (todo `.md` da pasta, automaticamente) |
| `docs/index.md`, `docs/example/changes-labels.md`, `docs/example/archive-sharing.md` | — | escritos à mão (não são gerados) |

Regras de reescrita: alvo publicado no site → link relativo ao site; arquivo que só existe no repositório (`LICENSE`, `CONTRIBUTING.md`) → URL absoluta do GitHub; âncora com acento → slug do MkDocs (sem acento). Link quebrado na própria fonte faz o script falhar.

O CI (`.github/workflows/deploy-docs.yml`) roda, nesta ordem: `check-ids` no exemplo → `sync-docs.mjs` → `mkdocs build --strict`. Qualquer link interno quebrado, página fora do menu ou lista de plugins divergente derruba o deploy. Para conferir localmente sem gerar nada: `node scripts/sync-docs.mjs --check`.

### Checklist — incluir um novo plugin oficial (`sdd-<plataforma>`)

O conjunto de plugins aparece em **quatro lugares** e o `sync-docs.mjs` falha se eles divergirem:
1. `README.md` — tabela "Implementações Oficiais (Tooling Hub)" (e o parágrafo de comparação, se citar os implementadores).
2. `README.en.md` — tabela "Official Implementations (Tooling Hub)".
3. `docs/index.md` — aba de instalação rápida e tabela de plugins.
4. `mkdocs.yml` — seção `Plugins` do `nav`.

Depois: `node scripts/sync-docs.mjs` (regenera os manifestos do site) e registre a inclusão no `CHANGELOG.md`.

### Checklist — incluir uma página nova

- **Nova seção da especificação (`spec/08-...md`) ou novo artefato do exemplo (`example/docs/sdd/...md`):** basta criar a fonte; o script a publica. Acrescente a página ao `nav` do `mkdocs.yml` (o script falha se ela ficar fora do menu).
- **Página fora dessas pastas** (ex.: uma nova change do exemplo, um guia): ou escreva direto em `docs/` e adicione ao `nav`, ou, se ela precisar existir também no GitHub, acrescente o par fonte → página em `FILE_MAP` (arquivo) ou `DIR_MAP` (pasta) no topo de `scripts/sync-docs.mjs`.
- Rode `node scripts/sync-docs.mjs` e, se tiver MkDocs instalado, `mkdocs build --strict`.
