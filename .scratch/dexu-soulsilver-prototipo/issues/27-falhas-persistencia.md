# 27: Recuperar falha de salvamento e conflito entre abas

**What to build:** Tornar recuperáveis quota, bloqueio de IndexedDB, transação falha, revisão concorrente e dataset indisponível enquanto Times locais permanecem visíveis.

**Blocked by:** 12: Criar, nomear e retomar Time vazio; 22: Gerenciar vários Times locais; 26: Exportar, importar e migrar backup de Times.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Fallback à PokéAPI ou garantia de permanência absoluta.

**Test seam:** Testes com transações reais, falha/quota simulada no limite do repositório e duas abas; E2E sem dataset.

- [ ] Salvar só confirma após commit; falha mantém edição em memória e oferece tentar de novo/exportar
- [ ] Abas concorrentes não sobrescrevem revisão mais recente silenciosamente
- [ ] Sem dataset, Times brutos são legíveis mas novas escolhas/cobertura ficam bloqueadas
- [ ] Mensagens de erro são específicas e acessíveis
