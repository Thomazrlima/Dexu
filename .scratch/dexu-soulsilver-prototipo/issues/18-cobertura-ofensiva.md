# 18: Cobertura ofensiva reage aos golpes escolhidos

**What to build:** Mostrar cobertura super efetiva contra cada tipo defensor isolado usando somente golpes válidos de dano e tipo conhecido do Time corrente.

**Blocked by:** 07: Auditar efetividade histórica de tipos; 15: Escolher golpes básicos no Team Builder.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Dano, score ou confronto contra espécie de dois tipos.

**Test seam:** API de domínio com matriz histórica; cenários de troca de golpe e contagem por Membro; E2E de atualização.

- [ ] Exibir tipos cobertos e sem cobertura, Membros distintos e golpes responsáveis
- [ ] Trocar/remover último golpe atualiza resultado imediatamente
- [ ] Status, tipo variável desconhecido, STAB, precisão e poder não contam
- [ ] Time incompleto indica análise parcial
