# 20: Efeitos auditados de habilidade na defesa

**What to build:** Exibir a contribuição comprovada da habilidade escolhida separada da matriz natural, inclusive imunidade e redução por tipo.

**Blocked by:** 08: Auditar efeitos defensivos de habilidades da amostra; 14: Escolher habilidade elegível do Membro; 19: Cobertura defensiva natural do Time.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Clima, item, estado, dano ou efeitos não relacionados a tipo.

**Test seam:** API de domínio com efeito verificado e desconhecido; UI preserva explicação.

- [ ] Habilidade elegível e efeito modelado são decisões separadas
- [ ] Imunidade agregada identifica origem natural/por habilidade
- [ ] Efeito não determinado deixa defesa natural e marca parte afetada como parcial
- [ ] Alertas continuam factuais
