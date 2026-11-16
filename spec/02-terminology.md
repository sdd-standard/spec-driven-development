# 2. Terminology

This glossary defines the specific terms and concepts used within the Spec-Driven Development (SDD) framework. Precise vocabulary is critical for avoiding ambiguity between human engineers and AI agents.

## Core Concepts

*   **Artifact (Artefato):** A discrete markdown file located within the `docs/sdd/` directory that captures a specific dimension of the project's state (e.g., domain model, requirements, tasks). Artifacts are the source of truth for AI agents.
*   **Baseline:** The consolidated, stable state of all SDD artifacts at a given point in time. Direct edits to baseline artifacts are strictly forbidden once established; they must evolve through Delta Specs.
*   **Constitution:** The foundational artifact (`constitution.md`) that defines the non-negotiable architectural principles, quality standards, and governance rules of the project. All work is validated against the Constitution.
*   **Ledger:** The list of executable work items (`07-tasks.md`, or the `tasks.md` of a change), each carrying a mutable `Status` (`Pending | In Progress | Blocked | Done`). Entries are added and their status updated, but never silently deleted. In SDD, code is never written without a corresponding entry in a ledger. 
*   **Ubiquitous Language:** A concept borrowed from Domain-Driven Design (DDD). The shared, formal vocabulary used by both domain experts and engineers, rigorously documented in the `04-domain-model.md` artifact.

## Process & Workflow

*   **Milestone:** A logical grouping of tasks that represents a deliverable increment of value. Milestones end with a Quality Gate.
*   **Quality Gate (Gate de Qualidade):** A mandatory, **100% passive (`read-only`)** 3-layer validation checkpoint (Layer 0 Mechanical Floor, Layer 1 Strict GEARS Spec Compliance, Layer 2 Code & Global Infra Quality). The gate audits the proposed changes against the Constitution and Requirements without editing any files, reporting discrepancies for the implementer agent to fix.
*   **Say-Do Gate:** A deterministic Layer 0 check that audits the session's tool execution ledger to mechanically verify that test/build commands were actually executed with `exit code 0` after the latest code modification. It is fail-closed: an empty ledger, an undetermined exit code, or a masked test command is never treated as a pass.
*   **Delta Spec:** A transient specification artifact (`delta-spec.md`) that describes an incremental change to the system using GEARS syntax (categorized as ADDED, MODIFIED, or REMOVED).
*   **Change Lifecycle:** The three-state process for implementing system modifications post-baseline:
    1.  **Proposal:** Scoped domain inspection, low-friction interview, proactive scope slicing (when oversized), and definition of *Why* and *What*.
    2.  **Apply:** `Validate-Gap` check, definition of the *Delta Spec* and its local *Tasks*, followed by guided task execution.
    3.  **Archive:** 3-Layer Passive Gate validation, consolidation of the delta into the baseline artifacts, debt hygiene, and archival of the change folder.
*   **Spec-on-Touch:** A strategy used in legacy (Brownfield) projects. Instead of writing a massive retroactive specification, engineers only specify the areas of the system they are actively modifying via a Delta Spec.
*   **Scoped Inspection & Scope Slicing:** A context-engineering rule requiring the architect agent to inspect only the specific domain/module being modified (never scanning the entire legacy repository at once) and to proactively propose splitting or narrowing changes that are too large.
*   **Validate-Gap:** A pre-design diagnostic in brownfield changes comparing the existing code of the touched module (*as-built*) against the new GEARS requirements (*to-be*) before defining `DES-xxx` decisions.
*   **Elastic Pagination (Overflow Sharding):** The mechanism that keeps volatile artifacts (`10-validation.md` and `11-project-memory.md`) injectable without losing information: when a file reaches its pagination trigger (150 lines or a character ceiling: 16,000 for the debt backlog; for the injected memory, the ceiling the plugin derives from its platform's injection budget), the agent spawns numbered sibling files (`-02.md`) linked in the main header, which are automatically compacted and deleted once debts/fronts are resolved. The trigger shards; it never truncates.
*   **Maturity Lifecycle:** The `Draft → Reviewed → Approved` status every specification artifact declares. Only the user promotes an artifact; no phase advances on an artifact below `Reviewed` (see `spec/05-artifact-model.md` section 5.5).
*   **Maturity Debt:** A `VAL` entry (`Type: Maturity`) recorded when a flow consumes a `Reviewed` artifact that is not yet `Approved`. It stores a snapshot of the consumed IDs and clause text; on approval it closes unchanged or forces revalidation of the dependents.
*   **Auto-Approved:** An item-level status the agent may set only for trivial items that do not touch the constitution's Security (4) or Domain Criticality (6) sections, derive 1:1 from a user-approved item (or apply a written convention), and carry a `Motivo:` line. It is never silently converted to `Approved`.
*   **User Risk Acceptance:** The validation exception by which the user (never the agent) lets a `Critical`/`High` debt stop blocking the gate. The severity is kept, the acceptance is recorded with who, when, why and a review trigger, Layer 0 failures are excluded, and constitution violations are recorded as exceptions in its section 8.

## Syntax & Notation

*   **`PENDING DEFINITION` / `PENDENTE DE DEFINIÇÃO`:** The explicit marker for an undefined behavior or decision (`P6`). Both spellings are equivalent and canonical (English and Portuguese artifacts); tools and validators MUST accept either. Every occurrence is also logged in `10-validation.md`.

*   **Intent Block:** A standardized format used during the Discovery phase to capture the business rationale. It consists of four fields: `Goal`, `Expectation`, `Action`, and `Result`.
*   **GEARS (Generalized EARS):** The formal, combinable syntax used in SDD for writing requirements. It is a streamlined evolution of the EARS methodology designed for algorithmic parsing by AI agents (`[Where...] [While...] [When...] the <subject> shall <behavior>.`).
*   **Check-ID:** A unique, parsable identifier assigned to tasks (`TASK-xxx`), requirements (`FR-xxx`, `NFR-xxx`), decisions (`DES-xxx`), and acceptance criteria (`AC-xxx`). These IDs form the backbone of the mechanical traceability matrix.
