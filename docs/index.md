---
hide:
  - navigation
  - toc
---

# Spec-Driven Development (SDD)

<div style="text-align: center; margin: 2rem 0;">
  <h2 style="font-size: 1.6rem; font-weight: 300; color: var(--md-default-fg-color--light);">The specification is the source of truth.<br/>Code must express it, never replace it.</h2>
</div>

<div class="grid cards" markdown>

-   :material-file-document-edit:{ .lg .middle } **Living Specification**

    ---

    Not a static document — a continuously evolving, versioned source of truth that grows alongside your software.

    [:octicons-arrow-right-24: Read the Manifesto](manifesto/en.md)

-   :material-shield-check:{ .lg .middle } **Formal Standard**

    ---

    Grounded in ISO/IEEE 29148 and EARS. Rigorous terminology, measurable quality criteria, and conformance rules.

    [:octicons-arrow-right-24: Formal Specification](spec/01-introduction.md)

-   :material-robot:{ .lg .middle } **AI-Native Governance**

    ---

    GEARS syntax and externalized state designed for deterministic AI agent behavior. No hallucinations, no drift.

    [:octicons-arrow-right-24: GEARS vs EARS](spec/04-gears-syntax.md)

-   :material-application-brackets:{ .lg .middle } **See It In Action**

    ---

    A complete example project with every artifact populated — from Constitution to archived Delta Specs.

    [:octicons-arrow-right-24: Example Project](example/index.md)

</div>

---

## The 11 Principles

| # | Principle | Meaning |
|:---:|:---|:---|
| **P1** | Spec is the source of truth | Changes start in the spec, never in code |
| **P2** | Constitution first | Non-negotiable rules govern all phases |
| **P3** | Spec must be alive | Evolves continuously with software |
| **P4** | End-to-end traceability | Intent → Requirement → Design → Task → Test → Code |
| **P5** | Requirements must be verifiable | No vague terms; observable metrics only |
| **P6** | Ambiguity handled early | Unknowns become explicit `PENDING DEFINITION` |
| **P7** | Design before execution | Architecture formalized before code |
| **P8** | Tasks derive from artifacts | No orphan code; every line traces back |
| **P9** | Continuous validation (Quality Gates) | Automated checkpoints between phases |
| **P10** | SDD is not Waterfall | Atomic, just-in-time specification |
| **P11** | State lives outside the chat | All context in versioned files, not LLM memory |

---

## Quick Start

=== "Antigravity IDE"

    Install the plugin in your Antigravity workspace:
    ```
    .gemini/config/plugins/sdd-workflow/
    ```
    Then use the skill: `sdd-init` (greenfield) or `sdd-adopt` (brownfield).

=== "Claude Code"

    Install the plugin in your project:
    ```
    .claude/plugins/sdd-workflow-plugin/
    ```
    Then use the command: `/sdd-workflow:init` or `/sdd-workflow:adopt`.

---

## Official Plugins

| Plugin | IDE | Repository |
|:---|:---|:---|
| **sdd-antigravity** | Google Antigravity IDE | [:material-github: sdd-standard/sdd-antigravity](https://github.com/sdd-standard/sdd-antigravity) |
| **sdd-claude** | Claude Code | [:material-github: sdd-standard/sdd-claude](https://github.com/sdd-standard/sdd-claude) |
