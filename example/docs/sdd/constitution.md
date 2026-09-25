# Constitution — TaskFlow

> Non-negotiable governance rules for the TaskFlow project. All agents, developers, and specifications must comply.

## 1. Quality Standards
- **Test Coverage:** Minimum 80% line coverage for business logic. No untested public API endpoint.
- **Linting:** ESLint with strict mode enabled. Zero warnings policy.
- **Type Safety:** TypeScript strict mode (`strict: true`). No `any` types in production code.

## 2. Security & Compliance
- **Authentication:** All passwords hashed with bcrypt (cost factor ≥ 12). JWT tokens expire in 1 hour; refresh tokens in 7 days.
- **Authorization:** Role-Based Access Control (RBAC). Default deny: every endpoint is protected unless explicitly marked public.
- **Data Protection:** PII fields encrypted at rest. Audit log for all write operations on user data.

## 3. Architecture
- **Backend:** Node.js + Express. RESTful API with JSON responses. HTTP status codes follow RFC 9110.
- **Database:** PostgreSQL 16+. Migrations managed via versioned SQL files. No ORM magic queries — explicit SQL or query builder.
- **Frontend:** React 18+ with functional components. State managed via React Query for server state, Zustand for client state.

## 4. Testing Policy
- **Unit Tests:** Required for all domain services and utilities.
- **Integration Tests:** Required for all API endpoints (supertest).
- **E2E Tests:** Required for critical user flows (authentication, task creation, board management).

## 5. Git & Deployment
- **Branch Strategy:** `main` is always deployable. Feature branches via `feature/<name>`.
- **Commit Messages:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **CI/CD:** All tests must pass before merge. No force-push to `main`.

## 6. Model Allocation
- **{{MODEL_DOCS}}:** Specification, discovery, and documentation phases.
- **{{MODEL_CODE}}:** Implementation and code generation.
- **{{MODEL_ARCH}}:** Architecture review and validation gates.
