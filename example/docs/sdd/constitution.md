# Constitution — TaskFlow

> Non-negotiable governance rules for the TaskFlow project. All agents, developers, and specifications must comply. This file changes only by an explicit, dated, and justified decision of the project owner — never silently by an agent or a self-learning loop.
> Sections 1–8 follow the canonical SDD numbering (`spec/05-artifact-model.md`, section 5.6); project-specific sections would start at 9.

## 1. Architecture
- **API:** RESTful API with JSON responses. HTTP status codes follow RFC 9110.
- **Data access:** Migrations managed via versioned SQL files. No ORM magic queries — explicit SQL or query builder.
- **Frontend:** Functional components only. Server state via React Query, client state via Zustand.

## 2. Fixed Stack
- **Backend:** Node.js + Express, TypeScript in strict mode (`strict: true`); no `any` types in production code.
- **Database:** PostgreSQL 16+.
- **Frontend:** React 18+.

## 3. Testing Policy
- **Coverage:** Minimum 80% line coverage for business logic. No untested public API endpoint.
- **Unit Tests:** Required for all domain services and utilities.
- **Integration Tests:** Required for all API endpoints (supertest).
- **E2E Tests:** Required for critical user flows (authentication, task creation, board management).
- **Official verification command (Say-Do Gate):** `npm test` — must exit with code 0 after the last code edit before any milestone or change is closed.

## 4. Security & Compliance
- **Authentication:** All passwords hashed with bcrypt (cost factor ≥ 12). JWT tokens expire in 1 hour; refresh tokens in 7 days.
- **Authorization:** Role-Based Access Control (RBAC). Default deny: every endpoint is protected unless explicitly marked public.
- **Data Protection:** PII fields encrypted at rest. Audit log for all write operations on user data.

## 5. Process & Governance
- **Linting:** ESLint with strict mode enabled. Zero warnings policy.
- **Branch Strategy:** `main` is always deployable. Feature branches via `feature/<name>`.
- **Commit Messages:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **CI/CD:** All tests must pass before merge. No force-push to `main`.
- **Dependencies:** Adding a new dependency requires explicit approval from the project owner, with a pinned version.

## 6. Domain Criticality Calibration (Quality Gate Severities)
On top of the Universal SDD Severity Matrix, TaskFlow treats the following as domain-specific risk:
- **Raises a finding to `Critical`:** any path that lets a user read or modify a board or task they neither own nor are a member of; any leak of password hashes, tokens, or PII; any write on user data that bypasses the audit log.
- **Raises a finding to `High`:** a missing or wrong error code from the `DOMAIN-NNN` convention on a public endpoint; a task status transition accepted outside the allowed set.
- **Tolerated as `Medium`/`Low` in this phase:** UI polish, non-critical performance tuning below the NFR-001 threshold, and internal naming.

## 7. Model Routing
The tiers below are provider-neutral; each plugin maps them to the models available in its platform.
- **Fast tier:** documentation and routine summaries.
- **Balanced tier:** implementation, tests, and the passive validation gate.
- **Deep tier:** discovery, specification, domain modeling, and architecture.

## 8. Active Exceptions (user-accepted risks against this constitution)
- None.
