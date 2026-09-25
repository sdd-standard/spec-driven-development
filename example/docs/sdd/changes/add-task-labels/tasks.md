# Tasks — Change: add-task-labels

### TASK-012
- **Title:** Database migration for labels and task_labels tables
- **Goal:** Create the schema for labels (name, color, board_id) and the many-to-many join table.
- **Related Requirements:** FR-LABEL-001, FR-LABEL-003.
- **Done When:** Migration runs. Tables exist with correct columns, FK constraints, and unique index on (board_id, name).
- **Status:** Pending

### TASK-013
- **Title:** Implement label CRUD and task attachment endpoints
- **Goal:** POST/DELETE /api/boards/:id/labels, POST/DELETE /api/tasks/:id/labels.
- **Related Requirements:** FR-LABEL-001, FR-LABEL-002, FR-LABEL-003, FR-LABEL-004, FR-LABEL-005.
- **Done When:** All 5 FR-LABEL requirements satisfied. Integration tests green.
- **Status:** Pending
