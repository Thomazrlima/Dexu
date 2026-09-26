# 24: Explorar candidatos da campanha e adicionar ao Time

**What to build:** Abrir visão “Disponíveis na campanha” e detalhes auditados, inclusive candidato sem número regional, com caminho, variante, habilidades, golpes e retorno ao Time de origem.

**Blocked by:** 11: Carregar candidato auditado e falhar com segurança; 13: Adicionar Membro e Variante jogável elegível; 14: Escolher habilidade elegível do Membro; 15: Escolher golpes básicos no Team Builder.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Exibir National Dex ou opções não auditadas como válidas.

**Test seam:** API de catálogo elegível e E2E Pokédex → detalhe → Time → retorno.

- [ ] A visão reúne só positivos da amostra e declara parcialidade
- [ ] Detalhes distinguem catálogo de opções comprovadas e mostram provas resumidas
- [ ] Busca por nome/número e filtro por tipo funcionam
- [ ] Adicionar candidato a Time existente volta ao mesmo fluxo sem perder edições
- [ ] Candidatos e golpes auditados acrescentados depois aparecem por dados, sem regra específica da UI para cada espécie
