# 7. SDD Conformance

A project, IDE plugin, or AI agent workflow is considered "SDD Compliant" only if it adheres to the strict guidelines outlined in this specification. Adopting the folder structure without enforcing the behavioral rules is insufficient.

To claim conformance with the SDD Standard, an implementation must satisfy the following criteria:

## 7.1 Structural Conformance
1.  **Canonical Hierarchy:** The project MUST maintain the `docs/sdd/` root directory containing the standard artifacts (Constitution, 00-10, Memory, Changes, Archive) as defined in `spec/05-artifact-model.md`.
2.  **Immutability Post-Baseline:** Baseline artifacts (`00` through `09`) MUST NOT be directly edited by humans or agents once established, except during the final consolidation step of a Delta Spec archive process.
3.  **Traceability Keys:** The project MUST utilize the standard ID prefixes (`FR-`, `NFR-`, `DES-`, `TASK-`, `AC-`, `VAL-`) to maintain mechanical traceability.

## 7.2 Behavioral Conformance
4.  **No Orphan Code:** The implementation pipeline MUST enforce that no source code is modified without a corresponding `TASK-xxx` in an active ledger (`07-tasks.md` or `changes/<name>/tasks.md`).
5.  **Strict Delta Specs:** All modifications to a baseline system MUST traverse the three-state lifecycle (Proposal → Apply → Archive) as defined in `spec/06-delta-specs.md`.
6.  **GEARS Syntax:** All functional requirements MUST be written using the canonical GEARS syntax (`[Where...] [While...] [When...] the <subject> shall <behavior>.`) with English keywords, ensuring deterministic parsing.
7.  **Quality Gates:** The workflow MUST include explicit validation steps (manual or automated via AI) before transitioning between major states (e.g., Spec → Design, Task → Done, Apply → Archive).

## 7.3 Context Engineering Conformance (For AI Agents)
8.  **Memory Indexing:** AI agents MUST rely on the externalized state (`11-project-memory.md` and the `docs/sdd/` directory) rather than their internal conversational history to make architectural or implementation decisions. 
9.  **Token Efficiency:** Tools injecting SDD context into LLM sessions MUST filter active tasks rather than dumping entire historical ledgers, prioritizing the `Memory-as-Index` strategy.
