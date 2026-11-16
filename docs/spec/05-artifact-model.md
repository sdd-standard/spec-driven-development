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

## 5.3 Elastic Pagination (Overflow Sharding) for Volatile Artifacts

To preserve token efficiency during session startup (`P11`) while preventing LLMs from bypassing line caps through giant single-line paragraphs or omitting critical debt context:
1.  **Line and Density Caps:** `10-validation.md` and `11-project-memory.md` enforce a strict ceiling of **150 lines per file** AND a maximum density of **4 to 5 lines per paragraph**.
2.  **Structured Overflow (`-02.md`):** When a project legitimately accumulates active debts or active memory fronts exceeding 150 lines, the agent MUST create a numbered sibling file (`10-validation-02.md`, `11-project-memory-02.md`) following the exact same format and add an explicit **Active Pagination Index** block at the top of the primary file.
3.  **Auto-Compaction and Deletion:** As active debts are resolved (and moved to `archive/validation-log.md`) or active fronts are closed (and rotated to `archive/memory-history.md`), remaining entries from `-02.md` MUST be repatriated into the primary file as soon as they fit within the 150-line cap, **immediately deleting the emptied `-02.md` file**.

## 5.4 Canonical Severity Taxonomy & Domain Calibration

Findings recorded in `10-validation.md` (`VAL-xxx`) follow a two-layer deterministic taxonomy:
1.  **Universal SDD Severity Matrix:**
    *   **`Critical` (BLOCKS):** Direct violation of `constitution.md`, security/data flaw, Layer 0 mechanical failure (`check-ids` orphans or failing/unrun tests after edit), regression, or unfulfilled primary `shall` clause.
    *   **`High` (BLOCKS):** Omitted conditional GEARS clause (`Where`/`While`/`When`), failure in Global Infrastructure (middlewares, auth, root routes, DB), requirement lacking automated test for its `AC-xxx`, or unauthorized *scope creep*.
    *   **`Medium` (NON-BLOCKING → `10-validation.md`):** Partial deviation from `DES-xxx` without breaking behavior (`FR`/`AC`), missing test only for a secondary edge case, runtime/manual QA verification item, or localized module debt.
    *   **`Low` (NON-BLOCKING → `10-validation.md`):** Cosmetic divergence, minor internal naming, or optional optimization beyond `NFR-xxx`.
2.  **Domain Criticality Calibration (`constitution.md`):** Each project's `constitution.md` defines domain-specific risk rules (e.g., financial precision, PII/LGPD compliance, regulatory audit trails) that automatically elevate matching issues to `Critical` or `High`.
