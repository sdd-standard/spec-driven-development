# 07 — Tasks (Global Execution Ledger)

> Status values: `Pending` | `In Progress` | `Done` | `Blocked`

## Milestone M1: Foundation

### TASK-001
- **Title:** Project scaffolding (Express + TypeScript + PostgreSQL)
- **Goal:** Initialize the repository with the base stack, linting, and CI.
- **Inputs:** Constitution (stack, linting rules, test policy).
- **Related Requirements:** N/A (infrastructure).
- **Done When:** `npm run build` succeeds, ESLint passes, PostgreSQL connection verified, CI pipeline green.
- **Status:** Done

### TASK-002
- **Title:** Database migrations for users and refresh_tokens tables
- **Goal:** Create the schema for the Authentication bounded context.
- **Inputs:** 04-domain-model.md (User, RefreshToken entities), DES-004 (organization_id).
- **Related Requirements:** FR-AUTH-001.
- **Done When:** Migration runs without errors. Tables exist with correct columns and constraints.
- **Status:** Done

### TASK-003
- **Title:** Implement user registration endpoint
- **Goal:** POST /api/auth/register — create user with hashed password.
- **Inputs:** FR-AUTH-001, FR-AUTH-002, DES-005 (error format).
- **Related Requirements:** FR-AUTH-001, FR-AUTH-002.
- **Done When:** 201 on success, 409 on duplicate email, bcrypt hash verified, integration test green.
- **Status:** Done

### TASK-004
- **Title:** Implement login and token issuance endpoint
- **Goal:** POST /api/auth/login — validate credentials, return JWT + refresh token.
- **Inputs:** FR-AUTH-003, FR-AUTH-004, DES-001 (JWT strategy).
- **Related Requirements:** FR-AUTH-003, FR-AUTH-004.
- **Done When:** 200 with tokens on valid credentials, 401 on invalid, refresh token persisted in DB.
- **Status:** Done

### TASK-005
- **Title:** Implement token refresh endpoint
- **Goal:** POST /api/auth/refresh — issue new access token from valid refresh token.
- **Inputs:** FR-AUTH-005, FR-AUTH-006.
- **Related Requirements:** FR-AUTH-005, FR-AUTH-006.
- **Done When:** 200 with new access token, 401 on expired/revoked refresh token.
- **Status:** Done

### TASK-006
- **Title:** Implement auth middleware
- **Goal:** Middleware that validates JWT on protected routes.
- **Inputs:** FR-AUTH-007, DES-001.
- **Related Requirements:** FR-AUTH-007.
- **Done When:** Protected routes return 401 without token, 200 with valid token. Unit test green.
- **Status:** Done

---

## Milestone M2: Core

### TASK-007
- **Title:** Database migrations for boards and tasks tables
- **Goal:** Create the schema for the Task Management bounded context.
- **Inputs:** 04-domain-model.md (Board, Task entities), DES-002 (soft-delete), DES-004 (organization_id).
- **Related Requirements:** FR-BOARD-001, FR-TASK-001.
- **Done When:** Migration runs. Tables exist with correct columns, constraints, and indexes.
- **Status:** Done

### TASK-008
- **Title:** Implement board CRUD endpoints
- **Goal:** POST/GET/PATCH/DELETE /api/boards — full lifecycle with ownership.
- **Inputs:** FR-BOARD-001 to FR-BOARD-005, DES-002, DES-005.
- **Related Requirements:** FR-BOARD-001, FR-BOARD-002, FR-BOARD-003, FR-BOARD-004, FR-BOARD-005.
- **Done When:** All 5 FR-BOARD requirements satisfied. Integration tests green.
- **Status:** Done

### TASK-009
- **Title:** Implement task CRUD endpoints
- **Goal:** POST/GET/PATCH /api/boards/:boardId/tasks — task lifecycle within board.
- **Inputs:** FR-TASK-001, FR-TASK-002, FR-TASK-003.
- **Related Requirements:** FR-TASK-001, FR-TASK-002, FR-TASK-003.
- **Done When:** Tasks created, listed, and updated within a board. Integration tests green.
- **Status:** In Progress

### TASK-010
- **Title:** Implement task status transition logic
- **Goal:** PATCH /api/tasks/:id/status — enforce allowed transitions.
- **Inputs:** FR-TASK-004, FR-TASK-005, DES-003.
- **Related Requirements:** FR-TASK-004, FR-TASK-005.
- **Done When:** Valid transitions succeed (200), invalid transitions rejected (422). Unit + integration tests green.
- **Status:** Pending

### TASK-011
- **Title:** Implement task assignment logic
- **Goal:** PATCH /api/tasks/:id/assignee — assign to board members.
- **Inputs:** FR-TASK-006, FR-TASK-007.
- **Related Requirements:** FR-TASK-006, FR-TASK-007.
- **Done When:** Assignment to member succeeds (200), assignment to non-member rejected (403). Tests green.
- **Status:** Pending
