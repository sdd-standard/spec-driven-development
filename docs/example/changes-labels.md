# Active Change: Add Task Labels

This is a simulated **active Delta Spec** in the `proposal` → `apply` stage. It demonstrates how SDD manages incremental changes post-baseline.

---

## Proposal

!!! info "Status: Approved"
    The proposal has been reviewed and approved by the stakeholder.

**Why:** Users need to categorize tasks beyond just status. Labels (e.g., "bug", "feature", "urgent") enable filtering and visual identification on the board.

**What:** Add a labeling system to tasks. Labels are user-defined strings with a color, scoped to a board.

### Scope

| In Scope | Out of Scope |
|:---|:---|
| Create/delete labels within a board | Predefined/global labels across boards |
| Attach/detach labels to/from tasks | Label-based automations |
| Filter tasks by label | |

---

## Delta Spec (GEARS)

### ADDED

**FR-LABEL-001:** When the board owner sends a label creation request with a name and color, the label service shall create the label scoped to that board and return HTTP 201.

**FR-LABEL-002:** When the board owner sends a label deletion request, the label service shall remove the label and detach it from all tasks, returning HTTP 204.

**FR-LABEL-003:** When an authorized user attaches an existing label to a task on the same board, the label service shall create the association and return HTTP 200.

**FR-LABEL-004:** When an authorized user detaches a label from a task, the label service shall remove the association and return HTTP 200.

**FR-LABEL-005:** When an authorized user requests tasks filtered by one or more label IDs, the task service shall return only tasks that have ALL specified labels attached.

---

## Tasks (Local Ledger)

| ID | Title | Status |
|:---|:---|:---|
| TASK-012 | Database migration for labels and task_labels tables | Pending |
| TASK-013 | Implement label CRUD and task attachment endpoints | Pending |
