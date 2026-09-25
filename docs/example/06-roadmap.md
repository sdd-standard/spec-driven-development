# 06 — Roadmap

## Phase 1: Foundation (Milestone M1) — Weeks 1–3
> Authentication domain + project scaffolding.

| Deliverable | Scope |
|:---|:---|
| Project setup | Express server, PostgreSQL, migrations, CI pipeline |
| User registration | FR-AUTH-001, FR-AUTH-002 |
| User login & tokens | FR-AUTH-003, FR-AUTH-004, FR-AUTH-005, FR-AUTH-006 |
| Auth middleware | FR-AUTH-007 |
| Unit + integration tests for auth | AC-AUTH-* |

**Gate:** All auth endpoints tested. `sdd-validator` audit passes. Milestone closed.

---

## Phase 2: Core (Milestone M2) — Weeks 4–6
> Task Management domain.

| Deliverable | Scope |
|:---|:---|
| Board CRUD | FR-BOARD-001 to FR-BOARD-005 |
| Task CRUD | FR-TASK-001 to FR-TASK-003 |
| Status transitions | FR-TASK-004, FR-TASK-005 |
| Task assignment | FR-TASK-006, FR-TASK-007 |
| Integration tests for boards + tasks | AC-BOARD-*, AC-TASK-* |

**Gate:** All CRUD + status + assignment endpoints tested. Full traceability matrix populated. Milestone closed.

---

## Phase 3: Frontend & Polish (Milestone M3) — Weeks 7–8
> React frontend + E2E tests.

| Deliverable | Scope |
|:---|:---|
| Login / Register screens | Connected to auth API |
| Board list + detail views | Connected to board API |
| Task cards with drag & drop status | Connected to task API |
| E2E tests (critical flows) | Login → Create Board → Create Task → Move to Done |

**Gate:** E2E green. Performance under NFR-001 limits. Ready for staging deployment.
