# Contribuindo para o Padrão SDD

Obrigado pelo seu interesse em fortalecer o **Spec-Driven Development (SDD)** como o padrão de desenvolvimento assistido por IA.

---

## Tipos de Contribuição

1. **Aprimoramentos da Especificação Canônica (RFCs)**:
   - Propostas de evolução dos princípios fundamentais (P1–P11) ou da gramática GEARS.
   - Abra uma *Issue* com a tag `[RFC]` descrevendo a motivação, o trade-off e a regra proposta.
2. **Novos Adaptadores de Tooling (Novas IDEs/Agentes)**:
   - Quer portar a suíte SDD para o Cursor, Roo Code, Windsurf ou Copilot?
   - Crie um repositório satélite seguindo a convenção `sdd-<plataforma>` e submeta um Pull Request adicionando-o na tabela de implementações do README.
3. **Casos de Uso e Documentação**:
   - Exemplos práticos de greenfield e brownfield (spec-on-touch).
   - Tradução do manifesto para outros idiomas (inglês, espanhol, etc.).

---

## Diretrizes Fundamentais

- **Preservação da Pureza Metodológica**: Qualquer extensão ou adaptação deve respeitar os 11 princípios fundamentais, com ênfase absoluta no **P1** (a spec como fonte da verdade) e **P11** (estado fora do chat).
- **Sintaxe GEARS**: Requisitos devem sempre manter as palavras-chave canônicas em inglês (`Where`, `While`, `When`, `shall`).
