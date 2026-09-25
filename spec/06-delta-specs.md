# 6. The Delta Spec Lifecycle

Unlike Waterfall methodologies which attempt to specify an entire system upfront and freeze it, SDD uses a continuous integration approach to requirements management, inspired by Git's branching and merging model. This is achieved through the **Delta Spec Lifecycle**.

Once the initial (Greenfield) baseline is established in `docs/sdd/`, the central artifacts become read-only. All subsequent modifications, new features, or bug fixes must traverse a strict 3-state machine.

## State 1: Proposal (`docs/sdd/changes/<name>/proposal.md`)

Before any code is written or complex logic designed, the *intent* of the change must be captured and approved.
*   **Contents:** Why the change is needed, what the change encompasses, scope boundaries (what is explicitly NOT in scope), success criteria, and a list of artifacts that will likely be impacted.
*   **Approval:** A human stakeholder or lead architect must review and approve the Proposal before moving to State 2.

## State 2: Apply (`docs/sdd/changes/<name>/delta-spec.md` & `tasks.md`)

Once the proposal is approved, the technical definition and execution occur in an isolated "branch" (the `changes/<name>/` directory).

1.  **The Delta Spec:** Instead of editing `03-requirements.md`, engineers create a `delta-spec.md` containing only the specific GEARS requirements that are being `ADDED`, `MODIFIED`, or `REMOVED`.
    *   *Brownfield Context (Spec-on-Touch):* If a change touches an undocumented legacy area, the `ADDED` section must include the minimum "as-built" specification for that area before specifying the new behavior.
2.  **The Local Ledger:** Tasks are not added to the global `07-tasks.md`. A local `tasks.md` is created exclusively for this change. 
3.  **Execution & Discovery:** As agents implement the tasks, they may discover technical nuances (e.g., a missing database index). These discoveries are added as new tasks to the *local* ledger. If a discovery alters business logic, the `delta-spec.md` must be updated and re-approved first.

## State 3: Archive (Consolidation)

When all tasks in the local ledger reach `Status: Done`, the change cannot simply be abandoned. It must be merged back into the baseline.

1.  **Mechanical Guard:** Run ID checks (e.g., `check-ids.mjs`) to ensure no orphan requirements or tasks exist.
2.  **Quality Gate:** An auditor (e.g., `sdd-validator`) verifies that the implemented code satisfies the `delta-spec.md` and does not violate `constitution.md`.
3.  **Consolidation:** The `ADDED`, `MODIFIED`, and `REMOVED` entries from the `delta-spec.md` are surgically merged into the central baseline artifacts (`02`, `03`, `05`, `08`, `09`).
4.  **Archival:** The entire `docs/sdd/changes/<name>/` directory is moved to `docs/sdd/archive/<name>/`, maintaining a perfect historical record of the system's evolution.
