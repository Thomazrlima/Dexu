# 14: Escolher habilidade elegível do Membro

**What to build:** Selecionar e persistir habilidade comprovada para variante e período; troca de variante preserva escolha antiga inválida com motivo.

**Blocked by:** 13: Adicionar Membro e Variante jogável elegível.

**Status:** resolved

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Efeito defensivo da habilidade ou sugestão automática.

**Test seam:** API do Membro com habilidade válida, impossível e antiga; UI de seleção.

- [x] Apenas habilidades positivas são oferecidas
- [x] Habilidade persiste no Time
- [x] Incompatibilidade após troca fica visível até reparo

## Answer

Resolvida. As opções de habilidade são filtradas por decisões elegíveis da variante, são persistidas com o Time e permanecem visíveis como inválidas quando a variante é trocada.
