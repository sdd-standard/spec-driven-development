# Delta Spec: Add Task Labels

## ADDED

### FR-LABEL-001: Create Label
When the board owner sends a label creation request with a name and color,
the label service shall create the label scoped to that board and return HTTP 201.

### FR-LABEL-002: Delete Label
When the board owner sends a label deletion request,
the label service shall remove the label and detach it from all tasks, returning HTTP 204.

### FR-LABEL-003: Attach Label to Task
When an authorized user attaches an existing label to a task on the same board,
the label service shall create the association and return HTTP 200.

### FR-LABEL-004: Detach Label from Task
When an authorized user detaches a label from a task,
the label service shall remove the association and return HTTP 200.

### FR-LABEL-005: Filter Tasks by Label
When an authorized user requests tasks filtered by one or more label IDs,
the task service shall return only tasks that have ALL specified labels attached.

## MODIFIED
(none)

## REMOVED
(none)
