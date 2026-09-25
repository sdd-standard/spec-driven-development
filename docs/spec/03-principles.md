# 3. The 11 Principles of SDD

Spec-Driven Development is built upon 11 non-negotiable principles. These principles shift the focus of development from code-centric improvisation to specification-centric engineering, optimized for AI agents.

### P1: The Specification is the Single Source of Truth
*   **Definition:** Did the requirement change? The change begins in the specification, never in the code.
*   **Foundation:** This aligns with ISO/IEEE 29148, which posits that requirements are the foundation for system validation. For AI agents, the specification is their sole window into business intent. If the code drifts from the spec, the agent loses its ability to reason about the system correctly.

### P2: Constitution Precedes Specification
*   **Definition:** Global, non-negotiable rules (quality, testing, security, architecture) reside in `constitution.md` and govern all subsequent phases.
*   **Foundation:** Prevents repeated clarification. In human-AI collaboration, establishing "ground rules" upfront prevents the agent from making misaligned technical decisions during later, granular tasks.

### P3: The Specification Must Be Alive
*   **Definition:** The spec evolves continuously alongside the software. Outdated specifications are technical debt.
*   **Foundation:** Rejects the "write once, read never" flaw of the IEEE 830 era. SDD mandates that changes occur via *Delta Specs*, ensuring the central artifacts (`docs/sdd/`) accurately reflect the "as-built" reality at all times.

### P4: End-to-End Traceability
*   **Definition:** Mandatory chain: `Goal (Intent) → Requirement (GEARS) → Design Decision (DES) → Task (TASK) → Acceptance Criteria (AC) → Test → Code`.
*   **Foundation:** Traceability is a core pillar of high-maturity engineering (CMMI, ISO 29148). SDD materializes this via mechanical `Check-IDs`, allowing scripts to mathematically prove that every line of code traces back to a business intent, and no requirement is left unimplemented.

### P5: Requirements Must Be Verifiable
*   **Definition:** Vague terms ("fast", "robust", "simple") are strictly prohibited. They must be transformed into observable metrics (SLAs, response times, status codes).
*   **Foundation:** An AI cannot evaluate "robustness." It can evaluate "rejects the request with code 400 within 200ms." This enforces the formal quality criteria defined in ISO 29148.

### P6: Ambiguity Handled Early
*   **Definition:** Gaps are not filled by assumptions. Undefined behaviors become explicit `PENDING DEFINITION` entries and are moved to the risk log (`10-validation.md`).
*   **Foundation:** LLMs have a tendency to "hallucinate" or assume missing details to please the user. P6 forces the agent to stop and ask, preserving the integrity of the domain.

### P7: Design Precedes Execution
*   **Definition:** Architecture, components, integrations, and justified trade-offs are formalized before any code is written.
*   **Foundation:** Coding is the translation of design. Skipping design leads to AI-generated spaghetti code, as the agent lacks a structural blueprint to map its micro-decisions against.

### P8: Tasks Derive from Artifacts
*   **Definition:** No programming task is created in a vacuum. Every item in the task ledger must point to a specific requirement or technical decision.
*   **Foundation:** Prevents scope creep and "shadow engineering." If a developer or agent realizes a new database table is needed, they cannot just create it; they must add a task to the ledger referencing the requirement that necessitates it.

### P9: Continuous Validation (Quality Gates)
*   **Definition:** Specs are validated before design; design before tasks; code before closing a milestone. Quality gates block progression if critical debts remain.
*   **Foundation:** Shifts left the cost of bugs. In an automated AI pipeline, relying on end-of-cycle QA is catastrophic. SDD uses static validation agents (`sdd-validator`) as gatekeepers between state transitions.

### P10: SDD is Not Waterfall
*   **Definition:** Specify only what is necessary to eliminate ambiguity, implement incrementally, learn, and consolidate the spec back.
*   **Foundation:** Spec-Driven does not mean Big Design Up Front (BDUF). It means *Atomic Design Just In Time*. Using Delta Specs, SDD fully embraces Agile iteration without sacrificing rigor.

### P11: State Lives Outside the Chat (Context Engineering)
*   **Definition:** AI chat sessions are volatile, suffer from context limits, and compress history. ALL project state, tasks, and memory live in versioned files on disk.
*   **Foundation:** The cornerstone of SDD's viability with LLMs. By utilizing `11-project-memory.md` and the `docs/sdd/` directory, the agent relies on an external, immutable index rather than its own transient conversation history.
