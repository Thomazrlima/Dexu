# Dexu — entendimento do produto

Registro das decisões de descoberta aprovadas. A [especificação do primeiro protótipo privado](./spec-prototipo-privado-soulsilver.md) transforma este recorte em contrato de implementação.

## Propósito

Dexu ajuda quem já conhece o básico de Pokémon e está voltando a SoulSilver a planejar um time para a campanha. Sua promessa é oferecer escolhas comprovadas para a versão e o período do jogo, explicar como obtê-las e analisar os golpes que o jogador realmente selecionou. O produto não é um simulador competitivo.

O teste principal do protótipo é observar se jogadores conseguem montar e revisar um time, entender por que as escolhas são válidas e perceber o efeito de trocar um golpe na análise sem consultar outro site para conferir legalidade.

## Primeiro marco: protótipo privado

- **Contexto:** SoulSilver é a única versão jogável. Cada time pertence a essa versão fixa. O período considerado inclui Johto e Kanto até imediatamente antes do primeiro confronto com Red; a primeira passagem dos créditos não encerra esse recorte.
- **Dados:** uma amostra declarada de candidatos com obtenção, habilidades e golpes oferecidos verificados, escolhida para testar caminhos de obtenção, evoluções, variantes, métodos de golpe e habilidades diferentes. Isso não promete esgotar todos os métodos de aprendizado de cada candidato. Fora da amostra, a Pokédex indica “ainda não verificado”; isso não significa “indisponível”.
- **Seleção de Pokémon:** são aceitos métodos normais internos a SoulSilver acessíveis até o marco, inclusive horário/dia, Safari Zone, presentes, trocas com personagens, reprodução e evolução por troca de um Pokémon originário da versão. Exclusivos recebidos de outra versão, transferências externas, eventos e obtenção apenas pelo Pokéwalker ficam fora.
- **Team Builder:** o usuário pode salvar vários times de zero a seis membros, repetir espécies e escolher uma variante jogável elegível, uma habilidade elegível e até quatro golpes por membro. O protótipo não configura item, natureza, nível, gender, EVs, IVs, shiny, nickname ou mecânicas de jogos posteriores.
- **Golpes:** level-up, TM/HM, egg move, tutor e move reminder entram quando o método e seu acesso até o marco estiverem comprovados. Golpes de pré-evoluções contam se a sequência for possível. Egg moves exigem prova da cadeia de reprodução. Níveis altos contam como mecanicamente válidos. A validação é individual: não garante recursos suficientes para montar todas as seis configurações em um único save.
- **Cobertura ofensiva:** usa apenas golpes de dano escolhidos com tipo efetivo conhecido contra cada tipo defensor isolado. Informa tipos cobertos, membros e golpes responsáveis. Não estima dano, precisão ou STAB; golpes de tipo variável desconhecido não recebem crédito.
- **Cobertura defensiva:** preserva multiplicadores naturais como 2× e 4× e explica à parte efeitos de habilidades sobre imunidade ou dano recebido por tipo em condições normais. O protótipo verifica completamente esses efeitos para as habilidades da amostra. Contagens agregadas identificam a origem de cada imunidade. Alertas são fatos descritivos, sem notas ou sugestões automáticas.
- **HMs:** mostra capacidades de campo presentes e ausentes nos golpes escolhidos. Não simula insígnias, obstáculos ou todo o percurso da história.
- **Pokédex e exploração:** a Pokédex regional de SoulSilver mantém suas entradas mesmo quando ainda não auditadas; somente candidatos verificados como elegíveis podem ser adicionados ao time. Uma visão “Disponíveis na campanha” reúne os candidatos verificados, inclusive espécies sem número regional. Busca e filtros por nome, número e tipo levam a detalhes catalográficos; variantes, habilidades, golpes e condições de obtenção são apresentados como opções da campanha apenas quando verificados.
- **Persistência:** times são salvos automaticamente no navegador com nome sugerido e editável. A lista mostra última edição e permite abrir, duplicar e excluir. Arquivos de backup podem ser exportados e importados. Se dados corrigidos invalidarem uma escolha salva, ela permanece visível com motivo, mas não conta nos cálculos afetados.
- **Fluxo:** um card de SoulSilver abre uma área com criar time, times salvos e Pokédex. Edição e análise acontecem no fluxo do Team Builder, com feedback desde o primeiro membro e indicação de análise parcial. O mesmo fluxo principal deve funcionar em celular e desktop.
- **Qualidade:** projetar e verificar os fluxos principais para WCAG 2.2 AA. Não há garantia offline no primeiro marco. Se os dados auditados falharem ao carregar, preservar times locais e impedir novas afirmações de validade ou cobertura até a base estar disponível.

## Dados e arquitetura decididos

- A PokéAPI é uma fonte inicial, não a autoridade final para obtenção até Red. Dexu consumirá um conjunto auditado, complementar e versionado; não consultará a API ao vivo durante o uso para substituir regras ausentes.
- Catálogo da Pokédex, variantes, caminhos de obtenção, learnsets e elegibilidade são conceitos separados. O contexto de regras combina o que cabe à geração, ao grupo de versões e à versão com seu marco da campanha.
- O protótipo não terá backend ou banco próprios. Os dados auditados serão entregues como conjunto versionado e os times ficarão no navegador. Framework, formato dos arquivos e mecanismo de armazenamento ainda não foram escolhidos.
- A interface e as explicações serão em português do Brasil, preservando nomes de Pokémon, golpes e habilidades conforme o jogo em inglês.

## Interface e identidade

A identidade visual existente é a fonte principal: coral `#FF5A5F`, amarelo `#FFC629`, ciano `#2EC5FF`, marinho `#0F172A`, creme `#FDF8F3` e cinza `#E5E7EB`; Plus Jakarta Sans nos títulos e controles, Inter no corpo; assinatura **MONTE • EXPLORE • CONECTE**. Os arquivos `Logo.png`, `Logo_Negativo.png` e `Icon.png` foram examinados. São rasterizados e têm fundo opaco, devendo ser usados em superfícies correspondentes; não há versão transparente ou símbolo reduzido separado no repositório.

A seleção visual mostra SoulSilver e cards de HeartGold, Emerald e Platinum como **“em estudo, sem previsão”**. Cards de Pokémon usam nome, número, tipos e recursos visuais próprios do Dexu. Não há autorização confirmada para capas, sprites ou outra arte da franquia.

## Fora do primeiro marco

- Auditoria exaustiva de todos os candidatos de SoulSilver até Red; essa é a meta da versão posterior que se apresentará como planejador completo desse período. Nela, todos os candidatos e golpes por level-up/TM/HM precisarão estar verificados; egg moves, tutors e reminder continuarão limitados às relações comprovadas.
- National Dex completa, checklist de Pokémon possuídos/registrados, itens e atributos detalhados dos membros, cálculo de dano, confrontos contra espécies reais e simulação de batalha ou progressão.
- Contas, sincronização, links de compartilhamento, times públicos, perfis, seguidores, favoritos e recursos sociais. Quando contas existirem, a importação de times locais será explícita; times em perfis serão privados por padrão.
- Garantia de funcionamento offline e publicação pública do produto.

## Pesquisas e riscos antes da implementação

1. **Dados reais de SoulSilver:** verificar diretamente versão, grupo, Pokédex regional, candidatos até Red, métodos de obtenção, evolução, TM/HM, tutor, reminder, egg chains, variantes, habilidades e relações históricas de tipos. A documentação da PokéAPI informa muitos desses campos, mas learnsets por grupo de versões não provam acesso no marco da campanha. [PokéAPI](https://pokeapi.co/docs/v2).
2. **Fontes complementares e evidência:** localizar fontes verificáveis para períodos de acesso, trocas internas, sistemas dependentes de calendário, reprodução e efeitos históricos de habilidades. A lista exata da amostra do protótipo depende dessa auditoria.
3. **Direitos de propriedade intelectual:** o repositório de sprites da PokéAPI declara que as imagens pertencem à The Pokémon Company, e o suporte oficial pede que sua propriedade intelectual não seja usada em projetos externos. Avaliar direitos antes de qualquer publicação e antes de depender de capas ou sprites. [Licença dos sprites](https://github.com/PokeAPI/sprites/blob/master/LICENCE.txt); [suporte Pokémon](https://support.pokemon.com/hc/en-us/articles/360000634094-Can-I-use-Pok%C3%A9mon-images-or-materials).
4. **Artefatos de marca:** confirmar fonte dos arquivos tipográficos e obter versões transparentes ou vetoriais caso sejam necessárias em outras superfícies, sem redesenhar a marca.
5. **Persistência e desempenho:** definir formato versionado de backup, mecanismo local de armazenamento, tamanho e carregamento do conjunto auditado, e como manter busca e análise imediatas em celular. A política da PokéAPI pede cache local quando seus recursos forem consultados. [Política de uso](https://pokeapi.co/docs/v2).

As decisões arquiteturais justificadas estão em [docs/adr](./adr/). O vocabulário acordado está em [CONTEXT.md](../CONTEXT.md); a sequência completa de respostas está em [product-discovery.md](./product-discovery.md).
