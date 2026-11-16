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
