# 09 — Traceability Matrix

> Chain: Intent (IB) → Capability (CAP) → Requirement (FR) → Design (DES) → Task (TASK) → Acceptance (AC)

| Intent | Capability | Requirement | Design Decision | Task | Acceptance |
|:---|:---|:---|:---|:---|:---|
| IB-001 | CAP-AUTH-001 | FR-AUTH-001 | DES-001, DES-004 | TASK-002, TASK-003 | AC-AUTH-001 |
| IB-001 | CAP-AUTH-001 | FR-AUTH-002 | DES-005 | TASK-003 | AC-AUTH-002 |
| IB-001 | CAP-AUTH-002 | FR-AUTH-003 | DES-001 | TASK-004 | AC-AUTH-003 |
| IB-001 | CAP-AUTH-002 | FR-AUTH-004 | DES-001, DES-005 | TASK-004 | AC-AUTH-003 |
| IB-001 | CAP-AUTH-003 | FR-AUTH-005 | DES-001 | TASK-005 | AC-AUTH-004 |
| IB-001 | CAP-AUTH-003 | FR-AUTH-006 | DES-001 | TASK-005 | AC-AUTH-004 |
| IB-001 | — | FR-AUTH-007 | DES-001 | TASK-006 | — |
| IB-002 | CAP-BOARD-001 | FR-BOARD-001 | DES-004 | TASK-007, TASK-008 | AC-BOARD-001 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-002 | — | TASK-008 | AC-BOARD-001 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-003 | — | TASK-008 | AC-BOARD-001 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-004 | DES-002 | TASK-008 | AC-BOARD-002 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-005 | DES-005 | TASK-008 | AC-BOARD-002 |
| IB-003 | CAP-TASK-001 | FR-TASK-001 | DES-004 | TASK-007, TASK-009 | AC-TASK-001 |
| IB-003 | CAP-TASK-001 | FR-TASK-002 | — | TASK-009 | AC-TASK-001 |
| IB-003 | CAP-TASK-001 | FR-TASK-003 | — | TASK-009 | AC-TASK-001 |
| IB-003 | CAP-TASK-002 | FR-TASK-004 | DES-003 | TASK-010 | AC-TASK-002 |
| IB-003 | CAP-TASK-002 | FR-TASK-005 | DES-003, DES-005 | TASK-010 | AC-TASK-002 |
| IB-003 | CAP-TASK-003 | FR-TASK-006 | — | TASK-011 | AC-TASK-003 |
| IB-003 | CAP-TASK-003 | FR-TASK-007 | DES-005 | TASK-011 | AC-TASK-003 |

## Coverage Summary
- **Intents covered:** 3/3 (IB-001, IB-002, IB-003)
- **Requirements covered:** 19/19 (all FR-AUTH, FR-BOARD, FR-TASK)
- **Design decisions referenced:** 5/5 (DES-001 to DES-005)
- **Tasks mapped:** 11/11 (TASK-001 to TASK-011)
- **Acceptance criteria mapped:** 9/9 (AC-AUTH, AC-BOARD, AC-TASK)
- **Orphan requirements:** 0
- **Orphan tasks:** 0
