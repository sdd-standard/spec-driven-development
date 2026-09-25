# 4. GEARS Syntax vs. Original EARS

The **EARS (Easy Approach to Requirements Syntax)** methodology, developed by Alistair Mavin, was a breakthrough in reducing ambiguity in natural language requirements. However, it was designed for human engineers reading monolithic documents. 

In SDD, requirements are primarily parsed, audited, and implemented by AI agents. For this, we developed **GEARS (Generalized EARS)**.

## 4.1 The Limitations of Original EARS for AI

Original EARS relies on 5 distinct templates:
1.  **Ubiquitous:** `The [system] shall [response].`
2.  **Event-Driven:** `When [trigger], the [system] shall [response].`
3.  **State-Driven:** `While [state], the [system] shall [response].`
4.  **Optional Feature:** `Where [feature included], the [system] shall [response].`
5.  **Unwanted Behavior:** `If [unwanted event], then the [system] shall [response].`

While effective for humans, these disjointed templates create friction for AI validators and static analysis tools. An agent must first categorize the requirement into one of five buckets before it can parse the logical conditions. Furthermore, complex real-world requirements often combine these patterns (e.g., an unwanted behavior that only occurs in a specific state of an optional feature).

## 4.2 The GEARS Unified Formula

GEARS solves this by collapsing the 5 patterns into a single, unified, combinable formula. It acts like a programming language grammar (BNF-like) that an LLM can parse deterministically.

**The Canonical GEARS Syntax:**
`[Where <static>] [While <state>] [When <trigger>] the <subject> shall <behavior>.`

*   **`Where <static>`**: Defines environmental preconditions, configurations, or optional features that do not change during runtime. (Absorbs EARS Pattern 4).
*   **`While <state>`**: Defines the dynamic runtime state of the system that must be true. (Absorbs EARS Pattern 3).
*   **`When <trigger>`**: Defines the specific event, user action, or error that initiates the behavior. (Absorbs EARS Patterns 2 and 5).
*   **`the <subject> shall <behavior>`**: The mandatory core defining the actor and the observable outcome. (The base of EARS Pattern 1).

### Mapping EARS to GEARS

| Original EARS Pattern | Equivalent GEARS Construction |
| :--- | :--- |
| **Ubiquitous** | `the <system> shall <behavior>` (All condition blocks omitted) |
| **Event-Driven** | `When <trigger>, the <system> shall <behavior>` |
| **State-Driven** | `While <state>, the <system> shall <behavior>` |
| **Optional Feature** | `Where <feature>, the <system> shall <behavior>` |
| **Unwanted Behavior** | `When <unwanted event>, the <system> shall <handle error>` |

## 4.3 Why GEARS is Superior for Autonomous Engineering

1.  **Combinability:** GEARS allows for highly specific, multi-condition requirements without breaking format. 
    *   *Example:* `Where multi-factor authentication is enabled, while the user account is locked, when the user attempts a login, the authentication service shall return a 403 Forbidden response.`
2.  **Predictability:** The rigid ordering (`Where` → `While` → `When` → `Shall`) acts as a predictable AST (Abstract Syntax Tree) for validation agents like `sdd-validator`. If a requirement puts a `When` before a `Where`, the validator immediately flags a syntax error.
3.  **English-Only Keywords:** By enforcing English keywords (`Where`, `While`, `When`, `shall`) regardless of the project's native language, grep-based scripts and regex parsers can extract requirements mechanically across international codebases.
