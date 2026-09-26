# 13: Adicionar Membro e Variante jogável elegível

**What to build:** Adicionar ao Time variante comprovada, com caminho/condições, até seis posições; persistir e impedir nova escolha não elegível.

**Blocked by:** 11: Carregar candidato auditado e falhar com segurança; 12: Criar, nomear e retomar Time vazio.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Habilidade, golpes, campo geral de item ou viabilidade conjunta.

**Test seam:** API de aplicação avalia elegibilidade; E2E adiciona/remove/reabre.

- [ ] 0–6 Membros e espécie repetida funcionam
- [ ] Caminho até Red e condições são explicados
- [ ] Sétimo Membro e opção sem prova são impedidos com motivo
- [ ] Ordem e escolhas sobrevivem ao reload
