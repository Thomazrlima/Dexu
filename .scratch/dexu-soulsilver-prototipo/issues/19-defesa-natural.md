# 19: Cobertura defensiva natural do Time

**What to build:** Mostrar multiplicadores naturais de tipos por Membro e contagens factuais do Time, mesmo quando habilidade ainda não foi configurada.

**Blocked by:** 07: Auditar efetividade histórica de tipos; 13: Adicionar Membro e Variante jogável elegível.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Efeito de habilidade, nota geral ou recomendação.

**Test seam:** API de domínio com tabela controlada de relações históricas; E2E de alteração de Membro.

- [ ] Preservar 0, 0,25, 0,5, 1, 2 e 4 para dupla tipagem
- [ ] Contar Membros fracos, resistentes e imunes com origem natural
- [ ] Não calcular para variante inválida; indicar parcialidade
- [ ] Mudança de variante atualiza resultado
