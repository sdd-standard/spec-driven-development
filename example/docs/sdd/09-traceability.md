# 09 — Traceability Matrix
Status: Approved

> Chain: Intent (IB) → Capability (CAP) → Requirement (FR/NFR) → Design (DES) → Task (TASK) → Acceptance (AC)

| Intent | Capability | Requirement | Design Decision | Task | Acceptance |
|:---|:---|:---|:---|:---|:---|
| IB-001 | CAP-AUTH-001 | FR-AUTH-001 | DES-001, DES-004 | TASK-002, TASK-003 | AC-AUTH-001 |
| IB-001 | CAP-AUTH-001 | FR-AUTH-002 | DES-005 | TASK-003 | AC-AUTH-002 |
| IB-001 | CAP-AUTH-002 | FR-AUTH-003 | DES-001 | TASK-004 | AC-AUTH-003 |
| IB-001 | CAP-AUTH-002 | FR-AUTH-004 | DES-001, DES-005 | TASK-004 | AC-AUTH-003 |
| IB-001 | CAP-AUTH-003 | FR-AUTH-005 | DES-001 | TASK-005 | AC-AUTH-004 |
| IB-001 | CAP-AUTH-003 | FR-AUTH-006 | DES-001 | TASK-005 | AC-AUTH-004 |
| IB-001 | CAP-AUTH-002 | FR-AUTH-007 | DES-001 | TASK-006 | AC-AUTH-005 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-001 | DES-004 | TASK-007, TASK-008 | AC-BOARD-001 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-002 | — | TASK-008 | AC-BOARD-001 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-003 | — | TASK-008 | AC-BOARD-001 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-004 | DES-002 | TASK-008 | AC-BOARD-002 |
| IB-002 | CAP-BOARD-001 | FR-BOARD-005 | DES-005 | TASK-008 | AC-BOARD-002 |
| IB-002 | CAP-BOARD-002 | FR-SHARE-001 | DES-006 | TASK-BSH-001, TASK-BSH-002 | AC-SHARE-001 |
| IB-002 | CAP-BOARD-002 | FR-SHARE-002 | DES-006 | TASK-BSH-002 | AC-SHARE-001 |
| IB-002 | CAP-BOARD-002 | FR-SHARE-003 | DES-006 | TASK-BSH-002 | AC-SHARE-001 |
| IB-003 | CAP-TASK-001 | FR-TASK-001 | DES-004 | TASK-007, TASK-009 | AC-TASK-001 |
| IB-003 | CAP-TASK-001 | FR-TASK-002 | — | TASK-009 | AC-TASK-001 |
| IB-003 | CAP-TASK-001 | FR-TASK-003 | — | TASK-009 | AC-TASK-001 |
| IB-003 | CAP-TASK-002 | FR-TASK-004 | DES-003 | TASK-010 | AC-TASK-002 |
| IB-003 | CAP-TASK-002 | FR-TASK-005 | DES-003, DES-005 | TASK-010 | AC-TASK-002 |
| IB-003 | CAP-TASK-003 | FR-TASK-006 | — | TASK-011 | AC-TASK-003 |
| IB-003 | CAP-TASK-003 | FR-TASK-007 | DES-005 | TASK-011 | AC-TASK-003 |
| IB-001, IB-002, IB-003 | (cross-cutting) | NFR-001 | — | — | AC-NFR-001 |
| IB-001, IB-002, IB-003 | (cross-cutting) | NFR-004 | DES-001 | — | — |

## Coverage Summary
- **Intents covered:** 3/3 (IB-001, IB-002, IB-003)
- **Functional requirements covered:** 22/22 (all FR-AUTH, FR-BOARD, FR-SHARE, FR-TASK)
- **Design decisions referenced:** 6/6 (DES-001 to DES-006)
- **Tasks mapped:** 13/13 (TASK-001 to TASK-011, plus TASK-BSH-001 and TASK-BSH-002 from the archived change `add-board-sharing`)
- **Acceptance criteria mapped:** 12/12 (AC-AUTH, AC-BOARD, AC-SHARE, AC-TASK, AC-NFR)
- **Orphan requirements:** 0
- **Orphan tasks:** 0

## Known Gaps
Tracked as active debt VAL-003 in `10-validation.md`:
- NFR-001 has an acceptance criterion but no task yet; the load test is planned for the Milestone M3 gate (`06-roadmap.md`).
- NFR-002 and NFR-003 have no design decision, task, or acceptance criterion yet.
- NFR-004 is backed by DES-001 (stateless tokens) but has no task or acceptance criterion yet.
