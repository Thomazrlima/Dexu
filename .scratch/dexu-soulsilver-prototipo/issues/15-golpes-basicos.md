# 15: Escolher golpes básicos no Team Builder

**What to build:** Selecionar e persistir até quatro golpes distintos comprovados por level-up, TM/HM ou pré-evolução, com método/condições.

**Blocked by:** 13: Adicionar Membro e Variante jogável elegível; 05: Auditar level-up, TM/HM e pré-evolução.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Tutor/egg/reminder sem auditoria, dano e disponibilidade conjunta de TMs.

**Test seam:** API de aplicação com prova positiva/negativa, pré-evolução e quinto golpe; E2E.

- [ ] Learnset bruto sem acesso não vira opção
- [ ] Pré-evolução e nível alto seguem política da spec
- [ ] Quatro slots sem duplicatas; rascunho sem golpes permitido
- [ ] Explicar validação individual e persistir moveset
