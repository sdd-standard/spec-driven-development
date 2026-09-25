# TaskFlow — Example Project

> This is a canonical SDD example project demonstrating the full Spec-Driven Development workflow applied to a Task Management system.

## Purpose

This directory contains a **complete, populated `docs/sdd/` structure** showcasing every SDD artifact from Constitution through Traceability, including:
- A fully specified greenfield baseline (artifacts 00–10)
- A simulated active change in `changes/`
- An archived past change in `archive/`

## Domain

**TaskFlow** is a multi-user task management application with two bounded contexts:
1. **Authentication** — User registration, login, and session management
2. **Task Management** — Boards, tasks, statuses, and assignment

## How to Read This Example

1. Start with [`docs/sdd/constitution.md`](docs/sdd/constitution.md) — the governance rules.
2. Follow the numbered artifacts (`00` → `09`) to see how intent flows into requirements, design, and tasks.
3. Inspect [`docs/sdd/changes/add-task-labels/`](docs/sdd/changes/add-task-labels/) to see an **active Delta Spec** in progress.
4. Inspect [`docs/sdd/archive/add-board-sharing/`](docs/sdd/archive/add-board-sharing/) to see a **completed and archived change**.
5. Review [`docs/sdd/09-traceability.md`](docs/sdd/09-traceability.md) to see the full chain from Intent → FR → DES → TASK → AC.
