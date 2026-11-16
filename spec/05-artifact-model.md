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

*   **Static vs. Living:** `constitution.md` is generally static once defined. The baseline artifacts — `00` through `06`, `08`, and `09` — are *living documents*. They represent the "as-built" baseline. After the initial greenfield phase, these files must NEVER be edited manually. They are updated exclusively via the consolidation of `Delta Specs` upon the archiving of a change.
*   **Volatile Artifacts:** `07-tasks.md`, `10-validation.md`, and `11-project-memory.md` are highly volatile and are NOT covered by the baseline immutability rule. They represent the immediate state of execution and risk, and are updated by agents on every event (task status change, gate result, debt opened or resolved).
*   **Cold Storage:** The `archive/` directory is strictly append-only or write-once. It exists to provide an immutable audit trail of how the system reached its current baseline state.

## 5.3 Elastic Pagination (Overflow Sharding) for Volatile Artifacts

Volatile artifacts must stay small enough to be injected at session start (`P11`) without ever losing the information needed to act on them:
1.  **Pagination Trigger (not a truncation limit):** `10-validation.md` shards when it reaches **150 lines or 16,000 characters**; `11-project-memory.md` shards when it reaches **150 lines or the character ceiling defined by the plugin in use** — whichever comes first. The memory is injected into every session and some agent platforms limit how much text a hook may inject, so each official plugin derives that ceiling from its platform's injection budget and documents it. Measuring characters as well as lines closes the "one giant line" bypass without imposing any per-paragraph or per-debt length limit.
2.  **Injection Within the Platform Budget:** A session injector MUST NOT rely on the platform's own truncation. It injects by priority — alerts, active tasks and active changes first, then the memory — and, when the memory does not fit, it injects only its critical sections (*Current State*, *Immediate Next Steps*, *Open Items*) preceded by an explicit instruction to read the full file before acting.
3.  **No Information Loss:** Reaching the trigger never authorizes summarizing or cutting content. Each debt keeps its mandatory fields (section 5.7); a debt with independent fronts is split into child entries instead of being compressed.
4.  **Structured Overflow (`-02.md`):** When legitimate active content reaches the trigger, the agent MUST create a numbered sibling file (`10-validation-02.md`, `11-project-memory-02.md`) following the exact same format and add an explicit **Active Pagination Index** block at the top of the primary file.
5.  **Auto-Compaction and Deletion:** As active debts are resolved (and moved to `archive/validation-log.md`) or active fronts are closed (and rotated to `archive/memory-history.md`), remaining entries from `-02.md` MUST be repatriated into the primary file as soon as they fit within both ceilings, **immediately deleting the emptied `-02.md` file**.

## 5.4 Canonical Severity Taxonomy, Domain Calibration & User Risk Acceptance

Findings recorded in `10-validation.md` (`VAL-xxx`) follow a two-layer deterministic taxonomy:
1.  **Universal SDD Severity Matrix:**
    *   **`Critical` (BLOCKS):** Direct violation of `constitution.md`, security/data flaw, Layer 0 mechanical failure (`check-ids` orphans or failing/unrun tests after edit), regression, or unfulfilled primary `shall` clause.
    *   **`High` (BLOCKS):** Omitted conditional GEARS clause (`Where`/`While`/`When`), failure in Global Infrastructure (middlewares, auth, root routes, DB), requirement lacking automated test for its `AC-xxx`, or unauthorized *scope creep*.
    *   **`Medium` (NON-BLOCKING → `10-validation.md`):** Partial deviation from `DES-xxx` without breaking behavior (`FR`/`AC`), missing test only for a secondary edge case, runtime/manual QA verification item, or localized module debt.
    *   **`Low` (NON-BLOCKING → `10-validation.md`):** Cosmetic divergence, minor internal naming, or optional optimization beyond `NFR-xxx`.
2.  **Domain Criticality Calibration (`constitution.md` section 6):** Each project's `constitution.md` defines domain-specific risk rules (e.g., financial precision, PII/LGPD compliance, regulatory audit trails) that automatically elevate matching issues to `Critical` or `High`.

**User Risk Acceptance (validation exception).** A blocking finding that can only be resolved by changing the spec or a product decision may be accepted so the project is not stalled. Acceptance records the user's own recognition of a deficiency so it stays traceable until fixed. It is valid only if:
1.  **The user accepts it, never the agent.** The debt records `Risk Acceptance: <who>, <date> — <rationale> — review: <date or trigger>` and `Status: Accepted`.
2.  **The original severity is kept.** Acceptance only releases the gate and the `implement` entry check; it never downgrades the finding.
3.  **Layer 0 failures are not acceptable.** Orphan IDs and failing or unproven tests are mechanical facts: they are fixed, or the test is changed through a Delta Spec.
4.  **Accepting a `constitution.md` violation requires recording the exception in the constitution itself** (section 8, *Active Exceptions*), scoped and with a review trigger, or amending the rule.

## 5.5 Maturity Lifecycle (`Draft → Reviewed → Approved`)

Every specification artifact (`00`–`06`, `08`, `09`, and a change's `proposal.md` / `delta-spec.md`) declares `Status: Draft | Reviewed | Approved` in its header:
*   **`Draft`:** first version produced by the agent; may contain `PENDING DEFINITION` gaps.
*   **`Reviewed`:** the user reviewed it and answered the interview; critical gaps are resolved.
*   **`Approved`:** the user explicitly approved it; it is fit to serve as a stable base.

Rules:
1.  **Only the user promotes an artifact.** The agent never changes an artifact's `Status` on its own; batch approval ("approve 00 to 02?") is allowed.
2.  **Gate rule:** no phase advances on an artifact below `Reviewed`. Requiring `Approved` everywhere would deadlock *spec-on-touch* flows (a change is archived only after its gate, yet the baseline items it touches are consolidated during that same archive).
3.  **Maturity debt:** when a flow consumes a `Reviewed` artifact that is not yet `Approved`, a debt with `Type: Maturity` is recorded — one per base artifact — listing the dependents and a snapshot of the consumed IDs and their exact clause text. On approval, an unchanged snapshot closes the debt ("closed without change"); a changed one requires revalidating the listed dependents before closing. A changed base with dependents not revalidated is a `High` finding (spec drift).
4.  **Item-level `Auto-Approved`:** an item (`FR`, `NFR`, `DES`, `AC`, delta item) may carry `Status: Auto-Approved` only if (a) it does not touch sections 4 (Security) or 6 (Domain Criticality Calibration) of `constitution.md`, (b) it derives 1:1 from an item already approved by the user or applies a convention written in the constitution, and (c) it carries a one-line `Motivo:` (rationale). The marking is permanent — it becomes `Approved` only by user decision — and the artifact's approval request lists every `Auto-Approved` item. An `Auto-Approved` item outside these criteria is a `High` finding.

## 5.6 Canonical Sections per Artifact

Tooling and validators refer to sections by number and name; the sections below are the minimum each artifact carries. Projects may add sections, but never renumber the constitution's sections 1–8 (project-specific sections start at 9).

| Artifact | Canonical sections / fields | Declares |
| :--- | :--- | :--- |
| `constitution.md` | 1 Architecture · 2 Fixed Stack · 3 Testing Policy (including the **official test command** audited by the Say-Do Gate) · 4 Security & Compliance · 5 Process & Governance · **6 Domain Criticality Calibration** (what elevates findings to `Critical`/`High`, what is tolerated as `Medium`/`Low`) · 7 Model Routing · **8 Active Exceptions** (user-accepted risks against the constitution: `VAL-xxx`, rule, scope, review trigger, who/when) | — |
| `00-project-brief.md` | `Status` · Provisional name · Short description · Perceived problem · Requester / origin · Initial objective · Known context · Initial open items | — |
| `01-discovery.md` | `Status` · Problem · Users (personas) · Stakeholders · Pains · Objectives · Success metrics (KPIs) · Constraints · Scope (MVP) · Out of scope · Open questions | — |
| `02-spec.md` | `Status` · Product vision · Intent Blocks (`IB-xxx`: Goal / Expectation / Action / Result) · Main journeys · Business rules · Main requirements (detailed in 03) · Assumptions · Open items | `IB-` (and capability IDs) |
| `03-requirements.md` | `Status` · Functional Requirements (`FR-xxx`: Title, Source, Priority, GEARS, item `Status`) · Non-Functional Requirements (`NFR-xxx`: Category, Source, Priority, GEARS, Metric, Validation Method, item `Status`) | `FR-`, `NFR-` |
| `04-domain-model.md` | `Status` · Bounded Contexts · Ubiquitous Language · Entities and aggregates · Value Objects · Domain events · Invariants · Open items | — |
| `05-design.md` | `Status` · Architectural view · Technical decisions (`DES-xxx`: Decision, Related, Rationale, Trade-off) · Security, observability, data · Technical risks | `DES-` |
| `06-roadmap.md` | `Status` · MVP (Release 1) · Future releases · Dependencies | — |
| `07-tasks.md` | Ledger rule and status legend · `TASK-xxx` (Title, Goal, Inputs, Related Requirements, Done When, Recommended Agent, Dependencies, `Status`) · "Gate record Mn" blocks | `TASK-` |
| `08-acceptance.md` | `Status` · `AC-xxx` alone on its line (Requirement, Scenario, Given, When, Then) | `AC-` |
| `09-traceability.md` | `Status` · Matrix `Intent → Requirement → Design → Task → Acceptance` · Known gaps | — |
| `10-validation.md` | Gate rule · Two-layer findings convention · Mandatory debt content · Pagination header · Severity matrix · Risk acceptance and maturity-debt rules · `VAL-xxx` entries (section 5.7) · Active project debts | `VAL-` |
| `11-project-memory.md` | Pagination header · Current state · Executive progress summary · Locked architecture decisions · Immediate next steps · Open items (blockers) · Stability map. *Current state*, *Immediate next steps* and *Open items* are the critical sections injected first when the memory exceeds the platform's injection budget, so their titles must be kept. | — |
| `changes/<name>/` | `proposal.md`: `Status` · Why · What · Scope (in / out) · Success Criteria · Impacted artifacts — `delta-spec.md`: `Status` · ADDED · MODIFIED · REMOVED (GEARS) — `tasks.md`: change-local `TASK-` ledger | delta IDs |

## 5.7 Debt Entry Format (`VAL-xxx`)

There is no length limit per debt: an entry carries whatever the next agent needs to resolve it without reopening the investigation. What can never be compressed away is:

| Field | Content |
| :--- | :--- |
| `Severity` | `Critical | High | Medium | Low` (original severity, kept even when accepted) |
| `Type` | `Defect | Gap | Debt | Maturity` |
| `Issue` | What is wrong or missing, observably |
| `Evidence` | `file:line`, or artifact and ID |
| `Impact` | Why it matters: affected flow, user or rule |
| `Recommendation` | Minimal fix scope or template |
| `Closure Criteria` | Verifiable condition to move the entry to `archive/validation-log.md` |
| `Links` / `Parent` | Cross-references; `Parent: VAL-xxx` on child entries of a split debt |
| `Risk Acceptance` | Only for accepted `Critical`/`High` (section 5.4) |
| `Status` | Short and greppable: `Open`, `Scheduled: <milestone or change>`, `Accepted`, `PENDING DEFINITION` |
| `History` | Dated bullets with events and user decisions (keeps `Status` short) |

A debt whose fronts close in different changes is split into child entries with `Parent:`; the parent lists its children under `Links`.
