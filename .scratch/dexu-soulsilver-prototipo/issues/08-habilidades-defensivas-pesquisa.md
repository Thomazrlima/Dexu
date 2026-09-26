# 08: Auditar efeitos defensivos de habilidades da amostra

**What to build:** Publicar inventário de habilidades da amostra que alteram imunidade ou dano por tipo em condições normais.

**Blocked by:** 03: Amostra mínima comprovada para o primeiro Time; 04: Auditar obtenção especial e variantes da amostra.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**Not in scope:** Clima, item, estado ou sobrevivência não modelada.

**Test seam:** Casos históricos de imunidade/redução e de efeito desconhecido.

- [ ] Elegibilidade e efeito são provas separadas
- [ ] Cada efeito tem fonte, condição, resultado e exceções
- [ ] Efeito incerto permanece desconhecido
