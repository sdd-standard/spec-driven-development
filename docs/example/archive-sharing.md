# Archived Change: Add Board Sharing

This is a **completed and archived Delta Spec**. It demonstrates the final state after the `archive` step — the change has been consolidated into the baseline and its folder moved to `archive/`.

---

## Proposal (Historical)

!!! success "Status: Archived — Consolidated into baseline"

**Why:** Board owners needed to share boards with other team members for collaboration.

**What:** Added the ability for board owners to invite users to a board, granting them read/write access to tasks on that board.

### Scope

| In Scope | Out of Scope |
|:---|:---|
| Invite a user to a board by email | Role-based permissions within a board |
| Remove a user's access to a board | Public/link-based sharing |
| List board members | |

---

## Delta Spec (Historical)

### ADDED

**FR-SHARE-001:** When the board owner sends an invitation with a valid user email, the sharing service shall grant the user read/write access to the board and return HTTP 201.

**FR-SHARE-002:** When the board owner sends a removal request for a board member, the sharing service shall revoke the user's access and unassign them from all tasks on that board, returning HTTP 204.

**FR-SHARE-003:** When an authorized user requests the member list for a board, the sharing service shall return the owner and all invited members with their join date.

---

## Tasks (All Done)

| ID | Title | Status |
|:---|:---|:---|
| TASK-BSH-001 | Database migration for board_members table | ✅ Done |
| TASK-BSH-002 | Implement board sharing endpoints | ✅ Done |

---

## Consolidation Record

After archiving, the following were merged into the baseline:

- **`03-requirements.md`**: FR-SHARE-001, FR-SHARE-002, FR-SHARE-003 added.
- **`05-design.md`**: DES-006 (board_members join table) added.
- **`09-traceability.md`**: New chain entries for sharing requirements.
- **`archive/memory-history.md`**: Change summary rotated from `11-project-memory.md`.
