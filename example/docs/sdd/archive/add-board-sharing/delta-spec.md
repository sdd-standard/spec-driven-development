# Delta Spec: Add Board Sharing (ARCHIVED)

## ADDED

### FR-SHARE-001: Invite User to Board
When the board owner sends an invitation with a valid user email,
the sharing service shall grant the user read/write access to the board and return HTTP 201.

### FR-SHARE-002: Remove User from Board
When the board owner sends a removal request for a board member,
the sharing service shall revoke the user's access and unassign them from all tasks on that board, returning HTTP 204.

### FR-SHARE-003: List Board Members
When an authorized user requests the member list for a board,
the sharing service shall return the owner and all invited members with their join date.

## MODIFIED
(none)

## REMOVED
(none)
