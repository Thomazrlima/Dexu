# 23: Explorar Pokédex regional com filtros e estados

**What to build:** Listar todas as entradas regionais e permitir busca por nome/número e filtro por tipo, distinguindo disponibilidade comprovada de falta de auditoria.

**Blocked by:** 09: Auditar catálogo regional de SoulSilver; 11: Carregar candidato auditado e falhar com segurança.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** National Dex completa ou Dex pessoal.

**Test seam:** Validação do catálogo real e E2E de busca/filtro/estado em celular e desktop.

- [ ] Catálogo integral carrega com numeração/tipos históricos
- [ ] Entrada ainda não verificada não oferece ação de adicionar
- [ ] Elegível e indisponível comprovado têm rótulos distintos
- [ ] Presença na Pokédex nunca prova elegibilidade
