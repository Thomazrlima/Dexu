# 26: Exportar, importar e migrar backup de Times

**What to build:** Exportar Times locais em arquivo versionado e importar com validação atômica, migração conhecida e revalidação pelo dataset atual.

**Blocked by:** 22: Gerenciar vários Times locais; 25: Preservar escolhas após atualização do dataset.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Compartilhamento público ou sincronização.

**Test seam:** IndexedDB transacional real para importação; E2E exportar → importar → reabrir.

- [ ] Backup contém esquema, data, versão do dataset e Times, sem catálogo como autoridade
- [ ] Arquivo malformado/futuro/incompatível não modifica armazenamento
- [ ] Colisão de IDs cria cópias novas sem sobrescrever
- [ ] Esquemas de armazenamento, backup e dataset têm versões independentes; formato atual importa e versão futura desconhecida falha com segurança
- [ ] A rota de migração é explícita para a próxima evolução real de esquema, sem inventar uma versão anterior; escolhas importadas são revalidadas
