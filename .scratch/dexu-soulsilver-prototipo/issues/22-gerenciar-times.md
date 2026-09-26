# 22: Gerenciar vários Times locais

**What to build:** Mostrar lista de Times por última edição, abrir, duplicar e excluir com confirmação, mantendo registros separados no IndexedDB.

**Blocked by:** 12: Criar, nomear e retomar Time vazio.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Pastas, tags, histórico, contas ou sync.

**Test seam:** IndexedDB real e fluxo E2E criar dois → duplicar → excluir → recarregar.

- [ ] Vários Times coexistem com nome e carimbo corretos
- [ ] Duplicar cria ID/revisão novos sem alterar origem
- [ ] Excluir pede confirmação acessível; vazio orienta criação
- [ ] Reabrir depois do navegador preserva lista
