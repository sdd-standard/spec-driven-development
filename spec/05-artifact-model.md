# 5. The SDD Artifact Model

SDD operationalizes ISO/IEEE 29148 not through a single monolithic document, but through a structured, flat directory of Markdown artifacts (`docs/sdd/`). Each artifact represents a specific dimension of the system's lifecycle and serves as deterministic context for AI agents.

## 5.1 The Canonical Flat Structure

A compliant SDD project must maintain the following directory structure:

```text
docs/sdd/
  ├── constitution.md              # Global governance and non-negotiable rules
  ├── 00-project-brief.md           # Executive vision and macro Intent Blocks
  ├── 01-discovery.md               # Assumptions, constraints, NFRs, and SLAs
  ├── 02-spec.md                    # Functional capabilities and detailed Intent Blocks
  ├── 03-requirements.md            # System requirements written in GEARS syntax (FR-xxx)
  ├── 04-domain-model.md            # Bounded contexts, entities, and Ubiquitous Language
  ├── 05-design.md                  # Technical architecture and design decisions (DES-xxx)
  ├── 06-roadmap.md                 # Phases, milestones, and logical schedule
  ├── 07-tasks.md                   # Global execution ledger (greenfield/baseline phase)
  ├── 08-acceptance.md              # Acceptance criteria in Given/When/Then (AC-xxx)
  ├── 09-traceability.md            # Tracing matrix: Intent → FR → DES → TASK → AC
  ├── 10-validation.md              # Living backlog of ACTIVE technical debt / risks
  ├── 11-project-memory.md          # Volatile session context and memory rotation pointer
  ├── changes/                      # Directory for active, unmerged Delta Specs
  │   └── <kebab-name>/
  │       ├── proposal.md
  │       ├── delta-spec.md
  │       └── tasks.md
  └── archive/                      # Cold storage for finalized auditing
      ├── validation-log.md         # Append-only log of resolved technical debts
      ├── memory-history.md         # Append-only log of past project memory states
      └── <kebab-name>/             # Archived delta specs after consolidation
```

## 5.2 Artifact Lifecycles

*   **Static vs. Living:** `constitution.md` is generally static once defined. Artifacts `00` through `09` are *living documents*. They represent the "as-built" baseline. After the initial greenfield phase, these files must NEVER be edited manually. They are updated exclusively via the consolidation of `Delta Specs` upon the archiving of a change.
*   **Volatile Artifacts:** `07-tasks.md`, `10-validation.md`, and `11-project-memory.md` are highly volatile. They represent the immediate state of execution and risk. They are frequently updated by agents during development sessions.
*   **Cold Storage:** The `archive/` directory is strictly append-only or write-once. It exists to provide an immutable audit trail of how the system reached its current baseline state.
