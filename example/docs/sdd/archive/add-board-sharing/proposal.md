# Proposal: Add Board Sharing (ARCHIVED)

## Why
Board owners needed to share boards with other team members for collaboration.

## What
Added the ability for board owners to invite users to a board, granting them read/write access to tasks on that board.

## Scope
### In Scope
- Invite a user to a board by email.
- Remove a user's access to a board.
- List board members.

### Out of Scope
- Role-based permissions within a board (all members have equal access).
- Public/link-based sharing.

## Result
Successfully consolidated into the baseline. Requirements FR-SHARE-001, FR-SHARE-002, FR-SHARE-003 added to `03-requirements.md`; capability CAP-BOARD-002 added to `02-spec.md`; design decision DES-006 added to `05-design.md`; the `BoardMember` entity added to `04-domain-model.md`; acceptance criterion AC-SHARE-001 added to `08-acceptance.md`; and the new chain added to `09-traceability.md`.
