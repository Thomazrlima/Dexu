# 01: Entrada Dexu e área SoulSilver

**What to build:** Abrir app React/TypeScript/Vite com identidade existente, cards de jogos e área SoulSilver navegável.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Pokémon fictícios, sprites/capas, backend ou Team Builder.

**Test seam:** Smoke de navegador para entrada → SoulSilver por teclado e em duas larguras.

- [ ] App inicia, compila e oferece scripts de typecheck/teste/build
- [ ] Só SoulSilver abre área funcional; os três outros cards dizem “em estudo, sem previsão”
- [ ] Marca existente, foco e layout móvel/desktop aparecem desde o início
