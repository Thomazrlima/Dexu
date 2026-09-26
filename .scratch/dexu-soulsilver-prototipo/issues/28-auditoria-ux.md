# 28: Fechar mobile e WCAG 2.2 AA dos fluxos principais

**What to build:** Auditar e corrigir problemas remanescentes de navegação móvel, teclado, foco, contraste, labels, leitor de tela e anúncios de cobertura no fluxo inteiro.

**Blocked by:** 10: Verificar fontes Dexu e entrega privada; 17: Oferecer métodos especiais comprovados no moveset; 18: Cobertura ofensiva reage aos golpes escolhidos; 20: Efeitos auditados de habilidade na defesa; 21: HMs escolhidos e Capacidades de campo; 23: Explorar Pokédex regional com filtros e estados; 24: Explorar candidatos da campanha e adicionar ao Time; 25: Preservar escolhas após atualização do dataset; 26: Exportar, importar e migrar backup de Times; 27: Recuperar falha de salvamento e conflito entre abas.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**Not in scope:** Criar design novo ou deixar acessibilidade apenas para este ticket.

**Test seam:** Poucos E2E multiviewport/teclado + inspeção manual de leitor de tela e contraste.

- [ ] Mobile e desktop oferecem as mesmas ações e informação
- [ ] Contraste, texto de tipos, foco e diálogos passam revisão WCAG 2.2 AA
- [ ] Mudança de cobertura tem resumo de status sem roubar foco
- [ ] Erros, parcialidade, importação e exclusão são compreensíveis por leitor de tela
