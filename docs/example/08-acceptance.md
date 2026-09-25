# 08 — Acceptance Criteria

> Format: Given/When/Then (Gherkin-like).

## Authentication

### AC-AUTH-001 (→ FR-AUTH-001)
- **Given** a new user with a valid email and password (≥ 8 chars)
- **When** they submit a registration request
- **Then** the system returns HTTP 201 and the user exists in the database with a bcrypt-hashed password.

### AC-AUTH-002 (→ FR-AUTH-002)
- **Given** a user with an email that already exists in the system
- **When** they submit a registration request
- **Then** the system returns HTTP 409 with error code `USER-001`.

### AC-AUTH-003 (→ FR-AUTH-003, FR-AUTH-004)
- **Given** a registered user
- **When** they submit valid credentials
- **Then** the system returns HTTP 200 with a JWT access token (1h expiry) and a refresh token (7d expiry).
- **Given** a registered user
- **When** they submit invalid credentials
- **Then** the system returns HTTP 401 with error code `AUTH-001` and does not reveal which field was wrong.

### AC-AUTH-004 (→ FR-AUTH-005, FR-AUTH-006)
- **Given** a client with a valid, non-expired refresh token
- **When** they request a new access token
- **Then** the system returns HTTP 200 with a new access token.
- **Given** a client with an expired or revoked refresh token
- **When** they request a new access token
- **Then** the system returns HTTP 401 with error code `AUTH-002`.

---

## Boards

### AC-BOARD-001 (→ FR-BOARD-001, FR-BOARD-002, FR-BOARD-003)
- **Given** an authenticated user
- **When** they create a board with a name
- **Then** the board is created (201), the user is the owner, and the board appears in their list.
- **When** they rename the board
- **Then** the name is updated (200).

### AC-BOARD-002 (→ FR-BOARD-004, FR-BOARD-005)
- **Given** a board owned by User A
- **When** User A deletes the board
- **Then** the board and all tasks are soft-deleted (204).
- **When** User B (non-owner) attempts to access the board
- **Then** the system returns HTTP 403 with error code `BOARD-001`.

---

## Tasks

### AC-TASK-001 (→ FR-TASK-001, FR-TASK-002, FR-TASK-003)
- **Given** an authorized user on a board
- **When** they create a task with a title
- **Then** the task is created (201) with status `todo` and appears in the board's task list.
- **When** they update the task's title or description
- **Then** the changes are persisted (200).

### AC-TASK-002 (→ FR-TASK-004, FR-TASK-005)
- **Given** a task with status `todo`
- **When** the user changes its status to `in_progress`
- **Then** the status is updated (200).
- **When** the user changes its status directly to `done`
- **Then** the system rejects the transition (422) with error code `TASK-001`.

### AC-TASK-003 (→ FR-TASK-006, FR-TASK-007)
- **Given** a task on a board with members User A and User B
- **When** the owner assigns the task to User A (a member)
- **Then** the assignee is updated (200).
- **When** the owner assigns the task to User C (not a member)
- **Then** the system rejects (403) with error code `TASK-002`.
