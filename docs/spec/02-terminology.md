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
*   **Quality Gate (Gate de Qualidade):** A mandatory validation checkpoint. An AI agent (e.g., `sdd-validator`) must audit the proposed changes against the Constitution and the defined Requirements before the work can be merged or consolidated.
*   **Delta Spec:** A transient specification artifact (`delta-spec.md`) that describes an incremental change to the system using GEARS syntax (categorized as ADDED, MODIFIED, or REMOVED).
*   **Change Lifecycle:** The three-state process for implementing system modifications post-baseline:
    1.  **Proposal:** Definition of *Why* and *What*.
    2.  **Apply:** Definition of the *Delta Spec* and execution of its *Tasks*.
    3.  **Archive:** Mechanical validation, consolidation of the delta into the baseline artifacts, and archival of the change folder.
*   **Spec-on-Touch:** A strategy used in legacy (Brownfield) projects. Instead of writing a massive retroactive specification, engineers only specify the areas of the system they are actively modifying via a Delta Spec.

## Syntax & Notation

*   **Intent Block:** A standardized format used during the Discovery phase to capture the business rationale. It consists of four fields: `Goal`, `Expectation`, `Action`, and `Result`.
*   **GEARS (Generalized EARS):** The formal, combinable syntax used in SDD for writing requirements. It is a streamlined evolution of the EARS methodology designed for algorithmic parsing by AI agents (`[Where...] [While...] [When...] the <subject> shall <behavior>.`).
*   **Check-ID:** A unique, parsable identifier assigned to tasks (`TASK-xxx`), requirements (`FR-xxx`, `NFR-xxx`), decisions (`DES-xxx`), and acceptance criteria (`AC-xxx`). These IDs form the backbone of the mechanical traceability matrix.
