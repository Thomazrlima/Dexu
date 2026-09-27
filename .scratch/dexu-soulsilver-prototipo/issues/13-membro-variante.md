# 13: Adicionar Membro e Variante jogável elegível

**What to build:** Adicionar ao Time variante comprovada, com caminho/condições, até seis posições; persistir e impedir nova escolha não elegível.

**Blocked by:** 11: Carregar candidato auditado e falhar com segurança; 12: Criar, nomear e retomar Time vazio.

**Status:** resolved

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Habilidade, golpes, campo geral de item ou viabilidade conjunta.

**Test seam:** API de aplicação avalia elegibilidade; E2E adiciona/remove/reabre.

- [x] 0–6 Membros e espécie repetida funcionam
- [x] Caminho até Red e condições são explicados
- [x] Sétimo Membro e opção sem prova são impedidos com motivo
- [x] Ordem e escolhas sobrevivem ao reload

## Answer

Resolvida. O domínio limita o Time a seis Membros, permite espécies repetidas, oferece somente variantes elegíveis e preserva ordem, caminho de obtenção e escolhas no IndexedDB.
