# 01 — Discovery

## Stakeholder Interviews Summary
- **Product Owner:** Wants a simple, fast tool. No over-engineering. "If it takes more than 2 clicks to create a task, we failed."
- **Tech Lead:** Prefers PostgreSQL. Wants clear API contracts. Concerned about auth security.
- **QA Lead:** Needs clear acceptance criteria per feature. Wants API-level integration tests.

## Assumptions
- A-001: Users have a modern browser (Chrome, Firefox, Edge, Safari — latest 2 versions).
- A-002: The application will be deployed on a single cloud provider (AWS or GCP). No multi-cloud.
- A-003: Email is the unique identifier for user accounts. No SSO in v1.
- A-004: All users within the system belong to the same organization (single-tenant v1).

## Constraints
- C-001: Budget limited to open-source tooling only (no paid SaaS dependencies).
- C-002: Team size: 2 developers + 1 QA. Delivery timeline: 8 weeks.
- C-003: No mobile-native app. Responsive web only.

## Non-Functional Requirements (NFRs)
- **NFR-001 (Performance):** API response time ≤ 200ms (p95) for all CRUD endpoints under 100 concurrent users.
- **NFR-002 (Availability):** 99.5% uptime SLA (measured monthly).
- **NFR-003 (Security):** OWASP Top 10 compliance. All inputs sanitized. SQL injection prevention via parameterized queries.
- **NFR-004 (Scalability):** Horizontal scaling via stateless API servers. Database connection pooling (max 20 connections).

## Risks & Open Questions
- RISK-001: If multi-tenant is added later, the database schema must support `organization_id` on all tables. **Decision: Add `organization_id` from day one but enforce single-tenant at the application layer.**
- RISK-002: JWT secret rotation strategy undefined. **Status: PENDING DEFINITION** → logged in `10-validation.md`.
