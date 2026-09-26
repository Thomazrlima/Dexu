# 17: Oferecer métodos especiais comprovados no moveset

**What to build:** Estender seleção de golpes para relações realmente auditadas de egg move, tutor e move reminder, com suas condições e exclusões.

**Blocked by:** 06: Auditar egg moves, tutor e reminder; 15: Escolher golpes básicos no Team Builder; 16: Ampliar candidatos e condições no Team Builder.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Forçar cada método na amostra se a pesquisa não o comprovar.

**Test seam:** API de elegibilidade com cadeia positiva/insuficiente e método pós-Red; UI mostra apenas relações comprovadas.

- [ ] Método especial só é oferecido com prova positiva de acesso até Red
- [ ] Egg chain e pré-requisito são explicados quando presentes
- [ ] Relação sem prova permanece omitida, sem virar indisponibilidade
- [ ] Tipos variáveis válidos podem ocupar slot sem crédito automático de cobertura
