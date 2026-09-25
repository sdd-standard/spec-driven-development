# 11 — Project Memory
<!-- máx. 150 linhas, sobrescrever, atualizado por evento -->
<!-- Roll-up: ao fechar o gate de um milestone, comprima as entradas por-task dele em 1 linha cada. -->
<!-- Rotação: mantenha apenas as ~5 mudanças/milestones mais recentes aqui. Histórico completo: archive/memory-history.md -->

### Estado Atual
- Fase: Milestone M2 (Core) — implementação em andamento.
- Última atualização: 2026-09-24 — evento: TASK-009 (Task CRUD) em progresso.

### Resumo Executivo do Progresso
- M1 (Foundation): 100% concluído. 6 tasks (TASK-001 a TASK-006) entregues. Auth endpoints operacionais.
- M2 (Core): 3/5 tasks concluídas. TASK-009 in progress, TASK-010 e TASK-011 pendentes.
- Change ativa: `add-task-labels` — proposta aprovada, delta-spec em revisão. 2 tasks na fila.
- Change arquivada: `add-board-sharing` — consolidada na baseline. Ver archive/add-board-sharing/.

### Decisões de Arquitetura Travadas
- DES-001: JWT stateless + refresh tokens no DB. Sem sessão no server.
- DES-002: Soft-delete para boards e tasks.
- DES-003: Transições de status no domain layer, não no DB.
- DES-004: organization_id em todas as tabelas desde o dia 1.
- DES-005: Error codes no formato DOMAIN-NNN.

### Próximos Passos Imediatos
1. Completar TASK-009 (Task CRUD — já em progresso).
2. Implementar TASK-010 (Status transitions).
3. Implementar TASK-011 (Task assignment).
4. Revisar delta-spec da mudança `add-task-labels` para aprovação.

### Pendências em Aberto (Blockers)
- VAL-001: JWT secret rotation strategy ainda indefinida (Medium).

### Mapa de Estabilidade
- Estáveis: Auth (registration, login, refresh, middleware), Board CRUD.
- Em mutação: Task CRUD (TASK-009), Status transitions (próximo), Assignment (próximo).
