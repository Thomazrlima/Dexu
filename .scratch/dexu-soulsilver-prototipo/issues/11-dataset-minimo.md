# 11: Carregar candidato auditado e falhar com segurança

**What to build:** Exibir na área SoulSilver um candidato real do conjunto auditado, versionado e validado; falha de carga bloqueia afirmações de validade.

**Blocked by:** 01: Entrada Dexu e área SoulSilver; 02: Protocolo de fontes e evidências de SoulSilver; 03: Amostra mínima comprovada para o primeiro Time.

**Status:** resolved

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Pokédex completa ou GameRuleset monolítico.

**Test seam:** Validador do dataset real e fixtures inválidas; fluxo navegador com carga/erro.

- [x] Manifesto distingue dataset/esquema/versão/grupo/geração/marco/amostra
- [x] Catálogo, variante, caminho, learnset e elegibilidade não se confundem
- [x] Referência órfã, prova ausente ou marco errado rejeitam conjunto
- [x] Sem fallback à PokéAPI; aviso de amostra parcial

## Answer

Resolvida. O dataset SoulSilver é versionado, carregado por rota estática e validado antes do uso; referências órfãs, evidências ausentes, marco incompatível e matriz incompleta rejeitam o conjunto. A amostra parcial é informada e não há fallback à PokéAPI.
