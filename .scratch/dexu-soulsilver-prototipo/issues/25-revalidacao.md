# 25: Preservar escolhas após atualização do dataset

**What to build:** Ao trocar a versão do conjunto auditado, revalidar Time salvo sem apagar variante, habilidade ou golpe antigo; explicar invalidação e calcular apenas parcelas confiáveis.

**Blocked by:** 12: Criar, nomear e retomar Time vazio; 14: Escolher habilidade elegível do Membro; 15: Escolher golpes básicos no Team Builder; 18: Cobertura ofensiva reage aos golpes escolhidos; 19: Cobertura defensiva natural do Time; 20: Efeitos auditados de habilidade na defesa; 21: HMs escolhidos e Capacidades de campo.

**Status:** ready-for-agent

**Source:** Spec aprovada do protótipo privado de SoulSilver; usar o vocabulário de `CONTEXT.md` e respeitar os ADRs.

**UI baseline:** Toda interface nova desta fatia deve funcionar por teclado e em celular/desktop, com foco visível, texto além de cor e estados compreensíveis por leitor de tela. Usar a identidade Dexu e os assets existentes sem arte da franquia.

**Not in scope:** Remover seleção automaticamente ou congelar validade antiga.

**Test seam:** Seam principal: Time salvo + dataset corrigido → estado preservado e análise parcial; E2E de atualização simulada.

- [ ] Versão anterior e atual de dataset permanecem distinguíveis
- [ ] Escolha inválida fica visível com motivo e ação de reparo
- [ ] Offense/HM excluem golpe inválido; defesa preserva apenas parte confiável
- [ ] Resultado afetado mostra análise parcial
