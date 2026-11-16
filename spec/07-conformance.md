# 7. SDD Conformance

A project, IDE plugin, or AI agent workflow is considered "SDD Compliant" only if it adheres to the strict guidelines outlined in this specification. Adopting the folder structure without enforcing the behavioral rules is insufficient.

To claim conformance with the SDD Standard, an implementation must satisfy the following criteria:

## 7.1 Structural Conformance
1.  **Canonical Flat Hierarchy:** The project MUST maintain the `docs/sdd/` root directory containing the standard artifacts (`constitution.md`, `00` through `11`, `changes/`, and `archive/` with `validation-log.md` and `memory-history.md`) as defined in `spec/05-artifact-model.md`.
2.  **Immutability Post-Baseline:** Baseline artifacts (`00` through `09`) MUST NOT be directly edited by humans or agents once established, except during the final consolidation step of a Delta Spec archive process.
3.  **Traceability Keys:** The project MUST utilize the standard ID prefixes (`IB-`, `FR-`, `NFR-`, `DES-`, `TASK-`, `AC-`, `VAL-`) to maintain mechanical traceability.

## 7.2 Behavioral Conformance
4.  **No Orphan Code:** The implementation pipeline MUST enforce that no source code is modified without a corresponding `TASK-xxx` in `Status: In Progress` in an active ledger (`07-tasks.md` or `changes/<name>/tasks.md`).
5.  **Strict Delta Specs with Scoped Inspection:** All modifications to a baseline system MUST traverse the three-state lifecycle (`Proposal → Apply → Archive`) as defined in `spec/06-delta-specs.md`, restricting legacy code inspection to the touched domain, applying proactive scope slicing when oversized, and running `Validate-Gap` prior to design.
6.  **GEARS Syntax:** All functional and non-functional requirements MUST be written using the canonical GEARS syntax (`[Where...] [While...] [When...] the <subject> shall <behavior>.`) with English keywords, ensuring deterministic parsing.
7.  **3-Layer 100% Passive Quality Gates & Deterministic Severities:** The workflow MUST enforce strictly passive (`read-only`) validation gates combining Layer 0 mechanical checks (`check-ids` + `Say-Do` test execution verification) with a two-stage validator (`Stage 1: Spec Compliance` → `Stage 2: Code & Global Infra Quality`), classifying findings via the Universal Severity Matrix (`Critical | High | Medium | Low`) calibrated by `constitution.md`.

## 7.3 Context Engineering Conformance (For AI Agents)
8.  **Memory Indexing (`Memory-as-Index`):** AI agents MUST rely on the externalized state (`11-project-memory.md` and the `docs/sdd/` directory) rather than their internal conversational history to make architectural or implementation decisions.
9.  **Token Efficiency & Elastic Pagination:** Tools injecting SDD context into LLM sessions MUST filter active tasks rather than dumping entire historical ledgers, and volatile artifacts (`10-validation.md`, `11-project-memory.md`) MUST enforce the 150-line cap and 4–5 line paragraph density limit using **Elastic Pagination (`-02.md`)** with automatic compaction and deletion when debts/fronts are resolved.
10. **Learning-Loop Governance:** In self-improving agent platforms (such as Hermes Agent), autonomous learning loops MUST be prevented from silently mutating `constitution.md` or canonical SDD workflow skills.
