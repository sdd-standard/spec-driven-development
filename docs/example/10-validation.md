# 10 — Validation (Active Technical Debt)

> Only ACTIVE debts live here. Resolved debts are moved to `archive/validation-log.md`.

## VAL-001 — JWT Secret Rotation Strategy Undefined
- **Severity:** Medium
- **Source:** RISK-002 (01-discovery.md)
- **Related:** DES-001, FR-AUTH-003
- **Description:** The strategy for rotating the JWT signing secret is undefined. If the secret is compromised, all active tokens become valid for an attacker until manually rotated.
- **Mitigation:** Define a rotation schedule and implement a key-pair strategy (current key + previous key accepted during a grace period).
- **Status:** Open

## VAL-002 — Refresh Token Limit Not Enforced
- **Severity:** Low
- **Source:** 04-domain-model.md (User Aggregate invariant)
- **Related:** FR-AUTH-005
- **Description:** The domain model states "a user can have at most 5 active refresh tokens," but no enforcement logic is implemented in the auth service yet.
- **Mitigation:** Add a check in the login flow: if the user already has 5 active refresh tokens, revoke the oldest one before issuing a new one.
- **Status:** Open
