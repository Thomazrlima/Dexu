# 12: Criar, nomear e retomar Time vazio

**What to build:** Criar Time SoulSilver nomeado, salvar em IndexedDB e reabrir após recarregar o navegador.

**Blocked by:** 01: Entrada Dexu e área SoulSilver.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Membros, sync ou contas.

**Test seam:** IndexedDB real e fluxo navegador criar → editar nome → recarregar.

- [ ] ID, versão fixa, nome, carimbos e revisão persistem
- [ ] Só mostrar “salvo” após transação; falha mantém edição em memória
- [ ] Time vazio e slots têm estados acessíveis em celular/desktop
