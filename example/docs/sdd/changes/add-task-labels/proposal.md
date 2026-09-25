# Proposal: Add Task Labels

## Why
Users need to categorize tasks beyond just status. Labels (e.g., "bug", "feature", "urgent") enable filtering and visual identification on the board.

## What
Add a labeling system to tasks. Labels are user-defined strings with a color, scoped to a board.

## Scope
### In Scope
- Create/delete labels within a board.
- Attach/detach labels to/from tasks.
- Filter tasks by label.

### Out of Scope
- Predefined/global labels across boards.
- Label-based automations (e.g., auto-assign on label).

## Success Criteria
- A user can create a label on a board and attach it to one or more tasks.
- The task list can be filtered by one or more labels.
- Labels persist and survive board/task updates.

## Artifacts Impacted
- `03-requirements.md` (new FR-LABEL-xxx requirements)
- `04-domain-model.md` (new Label entity, many-to-many with Task)
- `05-design.md` (new DES for label storage)
- `08-acceptance.md` (new AC-LABEL-xxx)
- `09-traceability.md` (new chain entries)
