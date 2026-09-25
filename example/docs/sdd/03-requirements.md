# 03 — Requirements (GEARS Syntax)

> All requirements use the canonical GEARS syntax. Keywords (`Where`, `While`, `When`, `shall`) are always in English.

## Domain: Authentication

### FR-AUTH-001: User Registration
When the user submits a registration request with a valid email and a password of at least 8 characters,
the registration service shall create a new user record with the password hashed using bcrypt (cost factor ≥ 12) and return HTTP 201.

### FR-AUTH-002: Duplicate Email Rejection
When the user submits a registration request with an email that already exists in the system,
the registration service shall reject the request with HTTP 409 and error code `USER-001`.

### FR-AUTH-003: User Login
When the user submits valid credentials (email + password),
the authentication service shall return an access token (JWT, 1h expiry) and a refresh token (opaque, 7d expiry) with HTTP 200.

### FR-AUTH-004: Invalid Login Rejection
When the user submits invalid credentials,
the authentication service shall return HTTP 401 with error code `AUTH-001` without revealing whether the email or password was incorrect.

### FR-AUTH-005: Token Refresh
When the client sends a valid, non-expired refresh token,
the authentication service shall return a new access token with HTTP 200.

### FR-AUTH-006: Expired Refresh Token
When the client sends an expired or revoked refresh token,
the authentication service shall return HTTP 401 with error code `AUTH-002`.

### FR-AUTH-007: Protected Endpoint Guard
When an unauthenticated request reaches a protected endpoint,
the API gateway shall return HTTP 401 with error code `AUTH-003`.

---

## Domain: Task Management — Boards

### FR-BOARD-001: Create Board
When an authenticated user sends a board creation request with a non-empty name,
the board service shall create the board with the requesting user as owner and return HTTP 201.

### FR-BOARD-002: List Own Boards
When an authenticated user requests the board list,
the board service shall return only boards where the user is the owner, ordered by creation date descending.

### FR-BOARD-003: Rename Board
When the board owner sends a rename request with a non-empty new name,
the board service shall update the board name and return HTTP 200.

### FR-BOARD-004: Delete Board
When the board owner sends a delete request,
the board service shall soft-delete the board and all associated tasks, returning HTTP 204.

### FR-BOARD-005: Non-Owner Board Access Denial
When a non-owner user attempts to access, modify, or delete a board,
the board service shall return HTTP 403 with error code `BOARD-001`.

---

## Domain: Task Management — Tasks

### FR-TASK-001: Create Task
When the board owner or member sends a task creation request with a title (mandatory) and optional description, due date, and assignee,
the task service shall create the task with status `todo` within the specified board and return HTTP 201.

### FR-TASK-002: List Board Tasks
When an authorized user requests tasks for a board,
the task service shall return all non-deleted tasks for that board with their current status, assignee, and due date.

### FR-TASK-003: Update Task Details
When an authorized user sends an update request for a task's title, description, or due date,
the task service shall apply the changes and return HTTP 200.

### FR-TASK-004: Valid Status Transition
When an authorized user requests a task status change that follows the allowed transitions (`todo` → `in_progress`, `in_progress` → `done`, `in_progress` → `todo`),
the task service shall update the status and return HTTP 200.

### FR-TASK-005: Invalid Status Transition
When an authorized user requests a task status change that violates the allowed transitions (e.g., `todo` → `done`),
the task service shall reject the request with HTTP 422 and error code `TASK-001`.

### FR-TASK-006: Assign Task
When the board owner assigns a task to a user who has access to the board,
the task service shall update the task assignee and return HTTP 200.

### FR-TASK-007: Assign to Non-Member Denial
When the board owner attempts to assign a task to a user who does not have access to the board,
the task service shall reject the request with HTTP 403 and error code `TASK-002`.
