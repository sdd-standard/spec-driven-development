# 2. Terminology

This glossary defines the specific terms and concepts used within the Spec-Driven Development (SDD) framework. Precise vocabulary is critical for avoiding ambiguity between human engineers and AI agents.

## Core Concepts

*   **Artifact (Artefato):** A discrete markdown file located within the `docs/sdd/` directory that captures a specific dimension of the project's state (e.g., domain model, requirements, tasks). Artifacts are the source of truth for AI agents.
*   **Baseline:** The consolidated, stable state of all SDD artifacts at a given point in time. Direct edits to baseline artifacts are strictly forbidden once established; they must evolve through Delta Specs.
*   **Constitution:** The foundational artifact (`constitution.md`) that defines the non-negotiable architectural principles, quality standards, and governance rules of the project. All work is validated against the Constitution.
*   **Ledger:** An append-only list of executable work items (`tasks.md`). In SDD, code is never written without a corresponding entry in a ledger. 
*   **Ubiquitous Language:** A concept borrowed from Domain-Driven Design (DDD). The shared, formal vocabulary used by both domain experts and engineers, rigorously documented in the `04-domain-model.md` artifact.

## Process & Workflow

*   **Milestone:** A logical grouping of tasks that represents a deliverable increment of value. Milestones end with a Quality Gate.
*   **Quality Gate (Gate de Qualidade):** A mandatory, **100% passive (`read-only`)** 3-layer validation checkpoint (Layer 0 Mechanical Floor, Layer 1 Strict GEARS Spec Compliance, Layer 2 Code & Global Infra Quality). The gate audits the proposed changes against the Constitution and Requirements without editing any files, reporting discrepancies for the implementer agent to fix.
*   **Say-Do Gate:** A deterministic Layer 0 check that audits the session's tool execution ledger to mechanically verify that test/build commands were actually executed with `exit code 0` after the latest code modification.
*   **Delta Spec:** A transient specification artifact (`delta-spec.md`) that describes an incremental change to the system using GEARS syntax (categorized as ADDED, MODIFIED, or REMOVED).
*   **Change Lifecycle:** The three-state process for implementing system modifications post-baseline:
    1.  **Proposal:** Scoped domain inspection, low-friction interview, proactive scope slicing (when oversized), and definition of *Why* and *What*.
    2.  **Apply:** `Validate-Gap` check, definition of the *Delta Spec* and its local *Tasks*, followed by guided task execution.
    3.  **Archive:** 3-Layer Passive Gate validation, consolidation of the delta into the baseline artifacts, debt hygiene, and archival of the change folder.
*   **Spec-on-Touch:** A strategy used in legacy (Brownfield) projects. Instead of writing a massive retroactive specification, engineers only specify the areas of the system they are actively modifying via a Delta Spec.
*   **Scoped Inspection & Scope Slicing:** A context-engineering rule requiring the architect agent to inspect only the specific domain/module being modified (never scanning the entire legacy repository at once) and to proactively propose splitting or narrowing changes that are too large.
*   **Validate-Gap:** A pre-design diagnostic in brownfield changes comparing the existing code of the touched module (*as-built*) against the new GEARS requirements (*to-be*) before defining `DES-xxx` decisions.
*   **Elastic Pagination (Overflow Sharding):** The mechanism allowing volatile artifacts (`10-validation.md` and `11-project-memory.md`) to stay within their 150-line cap and 4–5 line paragraph density limit by spawning numbered sibling files (`-02.md`) linked in the main header, which are automatically compacted and deleted once debts/fronts are resolved.

## Syntax & Notation

*   **Intent Block:** A standardized format used during the Discovery phase to capture the business rationale. It consists of four fields: `Goal`, `Expectation`, `Action`, and `Result`.
*   **GEARS (Generalized EARS):** The formal, combinable syntax used in SDD for writing requirements. It is a streamlined evolution of the EARS methodology designed for algorithmic parsing by AI agents (`[Where...] [While...] [When...] the <subject> shall <behavior>.`).
*   **Check-ID:** A unique, parsable identifier assigned to tasks (`TASK-xxx`), requirements (`FR-xxx`, `NFR-xxx`), decisions (`DES-xxx`), and acceptance criteria (`AC-xxx`). These IDs form the backbone of the mechanical traceability matrix.
