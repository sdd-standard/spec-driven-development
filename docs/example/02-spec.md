# 02 — Spec (Capabilities & Intent Blocks)

## Domain: Authentication

### CAP-AUTH-001: User Registration
```
Intent Block:
Goal:        Allow new users to create an account.
Expectation: A user provides email and password, and the system creates a verified account.
Action:      Registration endpoint validates uniqueness, hashes password, and persists the user.
Result:      User exists in the system and can log in immediately.
```

### CAP-AUTH-002: User Login
```
Intent Block:
Goal:        Allow registered users to authenticate and receive a session.
Expectation: Valid credentials return a JWT access token and a refresh token.
Action:      Login endpoint validates credentials, generates tokens, and returns them.
Result:      User holds a valid session for subsequent API calls.
```

### CAP-AUTH-003: Token Refresh
```
Intent Block:
Goal:        Allow users to extend their session without re-entering credentials.
Expectation: A valid refresh token returns a new access token.
Action:      Refresh endpoint validates the refresh token and issues a new access token.
Result:      User session is seamlessly extended.
```

---

## Domain: Task Management

### CAP-BOARD-001: Board CRUD
```
Intent Block:
Goal:        Allow users to organize work into boards.
Expectation: Users can create, list, rename, and delete boards they own.
Action:      RESTful CRUD endpoints for boards with ownership validation.
Result:      Users have isolated workspaces for different projects or contexts.
```

### CAP-TASK-001: Task CRUD
```
Intent Block:
Goal:        Allow users to create and manage individual work items within a board.
Expectation: Tasks have a title, description, status, assignee, and optional due date.
Action:      RESTful CRUD endpoints for tasks, scoped to a board.
Result:      Every unit of work is tracked with clear ownership and status.
```

### CAP-TASK-002: Task Status Transitions
```
Intent Block:
Goal:        Enforce a predictable lifecycle for tasks.
Expectation: Tasks move through defined statuses (To Do → In Progress → Done).
Action:      Status transition endpoint with validation rules (e.g., cannot skip from To Do to Done).
Result:      The team always knows the true state of every task.
```

### CAP-TASK-003: Task Assignment
```
Intent Block:
Goal:        Enable delegation of work to specific team members.
Expectation: A task can be assigned to any user who has access to the board.
Action:      Assignment endpoint validates user membership and updates the task.
Result:      Clear accountability: every task has zero or one owner.
```
