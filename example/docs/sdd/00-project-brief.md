# 00 — Project Brief

## Vision
TaskFlow is a lightweight, multi-user task management application designed for small teams. It enables users to organize work into boards, create and assign tasks, and track progress through customizable statuses.

## Intent Blocks

### IB-001: User Authentication
```
Intent Block:
Goal:        Enable secure, multi-user access to the platform.
Expectation: Users can register, log in, and manage their sessions without friction.
Action:      Authentication flow with email/password, JWT tokens, and session persistence.
Result:      Only authenticated users access the system; unauthorized access is rejected.
```

### IB-002: Board Management
```
Intent Block:
Goal:        Allow teams to organize their work into logical containers.
Expectation: Users can create, rename, and delete boards that group related tasks.
Action:      CRUD operations on boards with ownership and visibility rules.
Result:      Each user sees only the boards they own or have been invited to.
```

### IB-003: Task Lifecycle
```
Intent Block:
Goal:        Provide a clear, trackable lifecycle for every unit of work.
Expectation: Tasks can be created, assigned, moved between statuses, and completed.
Action:      Task CRUD with status transitions, assignee management, and due dates.
Result:      Team members have a single, reliable view of what needs to be done and by whom.
```

## Target Users
- **Team Lead:** Creates boards, assigns tasks, monitors progress.
- **Team Member:** Picks up tasks, updates status, collaborates.

## Key Constraints
- MVP: Single-tenant (one organization). Multi-tenant deferred.
- No real-time collaboration (WebSockets) in v1. Polling-based refresh.
- No file attachments in v1.
