# 21: HMs escolhidos e Capacidades de campo

**What to build:** Mostrar HMs válidos presentes nos movesets e capacidades de campo presentes/ausentes conforme edição do Time.

**Blocked by:** 05: Auditar level-up, TM/HM e pré-evolução; 15: Escolher golpes básicos no Team Builder.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Insígnias, obstáculos ou simulador de progressão.

**Test seam:** API de domínio sobre moveset válido; E2E de adicionar/remover HM.

- [ ] Adicionar/remover HM atualiza resumo imediatamente
- [ ] Golpe inválido não concede capacidade
- [ ] Ausência não afirma bloqueio da campanha
- [ ] Time sem golpes mostra estado vazio correto
