<!-- ARQUIVO GERADO por scripts/sync-docs.mjs a partir de example/docs/sdd/10-validation.md — edite a fonte, não esta cópia. -->
# 10 — Validation (Active Technical Debt)

> **Context hygiene & Elastic Pagination:** only ACTIVE debts live here. When a debt is resolved, MOVE its entry to `archive/validation-log.md` (the global ID is never reused). Pagination trigger: 150 lines or 16,000 characters, whichever comes first — it shards, it never truncates: each entry keeps what, evidence, impact, recommendation, closure criteria and dated history. If active debt legitimately reaches the trigger, create `10-validation-02.md`, index it at the top of this file, and delete it as soon as its entries fit back here.
>
> **User risk acceptance:** only the project owner may accept an open `Critical`/`High` debt; the severity is kept and the entry records who, when, why and a review trigger. Layer 0 failures cannot be accepted; accepting a constitution violation also requires an entry in `constitution.md` section 8.

> **Canonical Severity Matrix** (calibrated by `constitution.md` §6):
> - **`Critical` (BLOCKS):** constitution violation, security/data flaw, broken mechanical floor (`check-ids` orphans or failing/unrun tests after an edit), regression, or unfulfilled primary `shall`.
> - **`High` (BLOCKS):** omitted GEARS condition (`Where`/`While`/`When`), global infrastructure failure, requirement without an automated test for its `AC`, or scope creep.
> - **`Medium` (non-blocking):** partial deviation from a `DES` without changing behavior, untested secondary edge case, manual/runtime verification item, or debt contained in one module.
> - **`Low` (non-blocking):** cosmetic divergence, minor internal naming, or optional optimization.

## VAL-001 — JWT Secret Rotation Strategy Undefined
- **Severity:** Medium
- **Type:** Gap
- **Issue:** The strategy for rotating the JWT signing secret is undefined. If the secret is compromised, all active tokens stay valid for an attacker until someone rotates it manually.
- **Evidence:** `01-discovery.md` RISK-002 (`Status: PENDING DEFINITION`); `05-design.md` DES-001 defines signing but no rotation.
- **Impact:** Exposure window after a key leak equals the remaining lifetime of every issued token (up to 7 days for refresh tokens).
- **Recommendation:** Define a rotation schedule and a key-pair strategy (current key + previous key accepted during a grace period).
- **Closure Criteria:** A `DES` decision for key rotation is consolidated through a change, with a task and an `AC` proving that tokens signed with a retired key are rejected after the grace period.
- **Links:** DES-001, FR-AUTH-003
- **Status:** Open
- **History:**
  - M1 (baseline) — opened from RISK-002 during Discovery.

## VAL-002 — Refresh Token Limit Not Enforced
- **Severity:** Low
- **Type:** Debt
- **Issue:** The domain model states "a user can have at most 5 active refresh tokens," but the auth service does not enforce it yet.
- **Evidence:** `04-domain-model.md` (User aggregate invariant); no enforcement in the login flow.
- **Impact:** A user can accumulate unbounded refresh tokens, enlarging the set of credentials to revoke after a compromise.
- **Recommendation:** In the login flow, if the user already has 5 active refresh tokens, revoke the oldest before issuing a new one.
- **Closure Criteria:** Enforcement implemented with a test that issues a 6th token and asserts the oldest one is revoked.
- **Links:** FR-AUTH-005
- **Status:** Open
- **History:**
  - M1 (baseline) — opened from the domain-model invariant review.

## VAL-003 — Non-Functional Requirements Lack Full Traceability
- **Severity:** Medium
- **Type:** Gap
- **Issue:** The non-functional requirements are formalized in GEARS, but only NFR-001 has an acceptance criterion and none has an implementation task yet.
- **Evidence:** `09-traceability.md` (Known Gaps); `03-requirements.md` NFR-001..004; `08-acceptance.md` has AC-NFR-001 only.
- **Impact:** Verification of performance, availability and observability targets is manual or deferred to the Milestone M3 gate.
- **Recommendation:** Open a change before the M3 gate adding the load-test task for NFR-001 and acceptance criteria for NFR-002 to NFR-004.
- **Closure Criteria:** Every NFR has at least one `AC` and one `TASK` in the traceability matrix, and the M3 gate verifies NFR-001 with the load test.
- **Links:** NFR-001, NFR-002, NFR-003, NFR-004
- **Status:** Open
- **History:**
  - M2 — opened when the NFRs were formalized in GEARS and the matrix exposed the gap.
