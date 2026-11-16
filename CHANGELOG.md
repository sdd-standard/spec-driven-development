# Changelog

All notable changes to the SDD Canonical Standard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.1.0] - 2026-11-16

### Added
- **Official Plugin `sdd-hermes` (`sdd-standard/sdd-hermes`)**: Added Hermes Agent (Nous Research) as the 3rd official platform in the Tooling Hub (`README.md`, `README.en.md`, `mkdocs.yml`, and `docs/index.md`).
- **Passive Layer-0 `Say-Do Gate` (`DÍVIDA-SDD-01`)**: Formalized deterministic verification of session tool execution ledgers to prove tests/builds ran with `exit code 0` after the latest code modification (`spec/02-terminology.md`, `spec/06-delta-specs.md`, `spec/07-conformance.md`).
- **Pre-Design `Validate-Gap` Check (`DÍVIDA-SDD-02`)**: Added mandatory brownfield gap analysis between existing module code (*as-built*) and new GEARS requirements (*to-be*) prior to creating `DES-xxx` decisions.
- **3-Layer 100% Passive Quality Gate (`DÍVIDA-SDD-03`)**: Standardized milestone and archive gates into 3 strictly passive (`read-only`) layers: Layer 0 Mechanical Floor (`check-ids` + `Say-Do Gate`), Stage 1 Strict GEARS & Anti-Scope-Creep Compliance, and Stage 2 Constitution, Security & Global Infra Quality.
- **Learning-Loop Governance Guard (`DÍVIDA-SDD-04`)**: Added conformance rule (`spec/07-conformance.md`) prohibiting self-improving agent loops from silently mutating `constitution.md` or canonical SDD workflow skills.
- **Scoped Low-Friction Interview & Proactive Scope Slicing (`DÍVIDA-SDD-05`)**: Formalized domain-scoped code inspection (never scanning the entire legacy repository at once), low-friction interviews (max 3–5 surgical questions with recommended defaults), and proactive splitting/narrowing of oversized changes.
- **Elastic Pagination with Auto-Compaction (`-02.md` — `DÍVIDA-SDD-06`)**: Added `spec/05-artifact-model.md` section `5.3` enforcing the 150-line cap + 4–5 line paragraph density limit on `10-validation.md` and `11-project-memory.md`, with numbered sibling overflow files (`-02.md`) that are automatically compacted and deleted once debts/fronts are resolved.
- **Deterministic Severity Taxonomy & Domain Calibration (`DÍVIDA-SDD-07`)**: Added `spec/05-artifact-model.md` section `5.4` and Manifesto tables defining the Universal SDD Severity Matrix (`Critical | High | Medium | Low`) paired with project-specific risk calibration in `constitution.md`.

### Changed
- Aligned `spec/06-delta-specs.md` State 1/2/3 descriptions with the canonical plugin workflow and fixed the Claude Code quick-start installation snippet in `docs/index.md`.

### Fixed (post-release audit)
- **Example project (TaskFlow) migrated to v2.1 and made to pass its own mechanical floor**: `check-ids` went from 14 orphan IDs to 0. The archived change `add-board-sharing` is now actually consolidated into the baseline (`FR-SHARE-001..003`, `CAP-BOARD-002`, `DES-006`, `BoardMember`, `AC-SHARE-001`); non-functional requirements are formalized in GEARS in `03-requirements.md`; acceptance criteria declare their ID alone on the heading with a `Requirement` field; `FR-AUTH-007` gained `AC-AUTH-005`; artifacts carry `Status: Approved`; `constitution.md` gained the domain criticality calibration (section 6), the official test command and provider-neutral model tiers; `10-validation.md` gained the hygiene/pagination header, the severity matrix and `VAL-003`.
- **CI**: `scripts/check-ids.mjs` vendored and run against `example/` before the docs build.
- **Broken links on GitHub Pages (404 on `example/docs/sdd/...`)**: the `docs/` mirrors were byte-identical copies, so links that are correct relative to the repository (`docs/sdd/constitution.md`, `./spec/...`, `./LICENSE`) broke once the file moved into the site tree. New `scripts/sync-docs.mjs` generates every mirror from its source and rewrites links for the site (published pages → site-relative; repository-only files → absolute GitHub URL; accented in-page anchors → MkDocs slugs). The sources keep their GitHub-relative links, so both GitHub web and Pages work. CI now runs the generator and builds with `mkdocs build --strict`, so any broken internal link fails the deploy. The files under `docs/manifesto/`, `docs/spec/` and the numbered `docs/example/` pages are generated — edit the sources, never the copies.
- **Baseline immutability range** in `spec/05-artifact-model.md` and `spec/07-conformance.md` corrected from `00–09` to `00–06`, `08`, `09`; the volatile artifacts (`07`, `10`, `11`) are explicitly exempt.
- **No hotfix bypass**: `spec/07-conformance.md` item 5 now states that every post-baseline change, however small or urgent, traverses the three-state lifecycle.
- `spec/02-terminology.md`: the Ledger is no longer described as append-only (its `Status` is mutable) and the Say-Do Gate is defined as fail-closed. Portuguese manifesto badge anchors fixed; `docs/index.md` P4 chain now includes Acceptance.
- **Canonical sections per artifact** (`spec/05-artifact-model.md` section 5.6): the standard now lists the minimum sections of every artifact, including the constitution's fixed numbering 1–8 (section 6 *Domain Criticality Calibration*, new section 8 *Active Exceptions*). The example constitution was reordered to that numbering and gained section 8.
- **Maturity lifecycle** (`spec/05-artifact-model.md` section 5.5, conformance item 8): only the user promotes an artifact; maturity debt with snapshot when a `Reviewed` artifact is consumed; item-level `Auto-Approved` criteria.
- **User Risk Acceptance** (`spec/05-artifact-model.md` section 5.4, conformance item 7): documented as a validation exception — user-only, severity kept, never for Layer 0, constitution violations recorded in its section 8.
- **Elastic pagination and debt format** (`spec/05-artifact-model.md` sections 5.3 and 5.7): the 4–5 lines per paragraph cap was removed in favour of a lines-or-characters pagination trigger (16,000 characters for the debt backlog; for the injected memory, the ceiling each plugin derives from its platform's injection budget, injecting by priority instead of relying on platform truncation) and mandatory debt fields; the example `10-validation.md` was migrated to the new format. Manifesto (PT/EN), terminology and conformance updated accordingly.
- `spec/02-terminology.md` and `spec/03-principles.md`: `PENDING DEFINITION` and `PENDENTE DE DEFINIÇÃO` declared equivalent markers.
- **Site build guards**: `scripts/sync-docs.mjs` now fails when a generated page is missing from the `mkdocs.yml` nav or when `README.md`, `README.en.md`, `docs/index.md` and `mkdocs.yml` list different official plugins. `CONTRIBUTING.md` documents how the site is generated and the checklists for adding a plugin or a page.

## [2.0.0] - 2026-09-14

### Added
- English version of the manifesto (`README.en.md`)
- Artifact maturity lifecycle section (`Draft → Reviewed → Approved`)
- Explicit mention of `09-traceability.md` in Principle P4
- Comparison table with checkmarks replacing the dense Mermaid diagram

### Changed
- Restructured comparison section for better readability on all screen sizes

## [1.0.0] - 2026-09-08

### Added
- Initial canonical specification with 11 Non-Negotiable Principles (P1–P11)
- GEARS (Generalized EARS) formal syntax with semantic keywords (`Where`, `While`, `When`, `shall`)
- Intent Block syntax for capturing business intent
- Artifact architecture with 12 documents (00–11) and lifecycle diagram
- Delta Specs continuous evolution model (3-state machine: proposal → apply → archive)
- Official Implementations hub (sdd-antigravity, sdd-claude)
- Comparison with GitHub Spec Kit, OpenSpec, and BMAD-METHOD
- Contributing guidelines (`CONTRIBUTING.md`)
- MIT License
