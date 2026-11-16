# 6. The Delta Spec Lifecycle

Unlike Waterfall methodologies which attempt to specify an entire system upfront and freeze it, SDD uses a continuous integration approach to requirements management, inspired by Git's branching and merging model. This is achieved through the **Delta Spec Lifecycle**.

Once the initial (Greenfield) baseline is established in `docs/sdd/`, the central artifacts become read-only. All subsequent modifications, new features, or bug fixes must traverse a strict 3-state machine.

## State 1: Proposal (`docs/sdd/changes/<name>/proposal.md`)

Before any code is written or complex logic designed, the *intent* of the change must be captured, stress-tested, and approved.
*   **Scoped Domain Inspection:** In Brownfield projects, the architect agent MUST inspect **only** the files and modules of the specific domain being modified (never scanning the entire legacy repository at once).
*   **Proactive Scope Slicing:** If the requested change is too large (e.g., spans multiple independent bounded contexts or would generate an excessive number of tasks), the agent MUST proactively propose either splitting it into sequential smaller changes or narrowing the current change and logging the remaining items as active debt/future scope in `10-validation.md` or `06-roadmap.md`.
*   **Low-Friction Interview:** Based on the scoped inspection, the agent asks at most 3 to 5 surgical questions regarding unforeseen edge cases or contract impacts, always providing a recommended default option.
*   **Contents & Approval:** `proposal.md` captures the `Intent Block`, *Why*, *What*, scope boundaries (in/out), success criteria, and impacted artifacts. A human stakeholder must approve the Proposal before advancing.

## State 2: Delta Spec, Tasks & Apply (`delta-spec.md` & `tasks.md`)

Once the proposal is approved, the technical definition and execution occur in an isolated "branch" (the `changes/<name>/` directory).

1.  **Pre-Design `Validate-Gap` Check (Brownfield):** Before drafting design decisions, the agent compares the current *as-built* code of the touched module against the proposed change to identify reusable components and prevent contract collisions.
2.  **The Delta Spec (`delta-spec.md`):** Instead of editing `03-requirements.md`, engineers create a `delta-spec.md` containing only the specific GEARS requirements and `DES-xxx` decisions being `ADDED`, `MODIFIED`, or `REMOVED`.
    *   *Brownfield Context (Spec-on-Touch):* If a change touches an undocumented legacy area, the `ADDED` section must include the minimum "as-built" specification for that area before specifying the new behavior.
3.  **The Local Ledger (`tasks.md`) & Pre-Apply Gate:** A local `tasks.md` is created exclusively for this change, audited passively by `sdd-validator` against `constitution.md` before code execution begins.
4.  **Execution & Discovery (`Apply`):** As agents implement the tasks (`Status: In Progress`), they may discover technical nuances. Sub-tasks of the same requirement are added to the *local* ledger first; if a discovery alters business behavior, `delta-spec.md` must be updated in GEARS and approved first.

## State 3: Archive (3-Layer Passive Gate & Consolidation)

When all tasks in the local ledger reach `Status: Done`, the change must be audited and merged back into the baseline:

1.  **Layer 0 — Passive Mechanical Floor (`check-ids` & `Say-Do Gate`):** Run mechanical ID checks (`check-ids`) to ensure zero orphan IDs and audit the session execution ledger (`Say-Do Gate`) to verify that test/build commands succeeded (`exit code 0`) after the latest code edit.
2.  **Layers 1 & 2 — Two-Stage Passive `sdd-validator` Gate:** The read-only validator audits the real code (`file:line`) in two distinct stages: **Stage 1 (Strict GEARS & Anti-Scope-Creep Compliance)** and **Stage 2 (Constitution, Security & Global Infra Quality)**. Discrepancies are reported passively for the implementer to fix.
3.  **Consolidation & Elastic Debt Hygiene:** The `ADDED`, `MODIFIED`, and `REMOVED` entries from `delta-spec.md` are merged into the central baseline artifacts (`02`–`05`, `08`, `09`). Resolved debts from `10-validation.md` are moved to `archive/validation-log.md` (compacting and deleting any `-02.md` overflow shard if remaining items fit back into the primary file).
4.  **Archival & Memory Rotation:** The `docs/sdd/changes/<name>/` directory is moved to `docs/sdd/archive/<name>/`, and `11-project-memory.md` is updated (rotating older change summaries to `archive/memory-history.md`).
