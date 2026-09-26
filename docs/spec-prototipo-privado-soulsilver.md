# Dexu — especificação do protótipo privado de SoulSilver

**Estado:** contrato para planejamento da implementação, sujeito aos pré-requisitos de auditoria indicados abaixo. **Alvo:** somente o primeiro protótipo privado. Esta especificação não autoriza publicação pública nem substitui a pesquisa dos dados reais do jogo.

**Fontes de decisão:** entendimento aprovado em `product-brief.md`, histórico em `product-discovery.md`, linguagem de `CONTEXT.md` e ADRs 0001–0006. Em caso de diferença de redação, prevalecem o recorte até antes de Red e a amostra declarada para o protótipo. Não há código de produto ou dependências existentes a preservar.

## Problem Statement

Quem já conhece o básico de Pokémon e volta a SoulSilver precisa planejar um time para a campanha, mas normalmente consulta fontes diferentes para descobrir quais Pokémon, habilidades e golpes são possíveis na versão e naquele período. Um catálogo da franquia ou um learnset histórico pode sugerir escolhas que exigem outro jogo, evento, acessório ou progresso posterior. Uma análise feita só pelos tipos naturais também não responde ao efeito dos golpes efetivamente escolhidos.

## Solution

Oferecer um espaço privado para explorar uma **amostra explicitamente delimitada e auditada** da campanha de SoulSilver, montar até seis membros com opções comprovadas até imediatamente antes do primeiro confronto com Red, explicar os respectivos caminhos de obtenção e aprendizado e observar a cobertura ofensiva, defensiva e as capacidades de campo conforme o time muda. A Pokédex regional permanece navegável mesmo quando a elegibilidade de parte de suas entradas ainda não foi auditada. Times persistem no navegador e podem ser exportados e importados.

O critério de sucesso do protótipo é que uma pessoa do público definido consiga montar e revisar um time, compreender por que as opções oferecidas foram aceitas e perceber o efeito de trocar um golpe na análise, sem precisar verificar a legalidade da **amostra** em outro site. A interface sempre informa que a amostra não representa todos os candidatos da campanha.

## User Stories

1. Como visitante, quero reconhecer a marca Dexu e a proposta do produto ao entrar, para saber o que vou fazer ali.
2. Como visitante, quero ver SoulSilver como jogo disponível, para entrar no contexto correto.
3. Como visitante, quero distinguir HeartGold, Emerald e Platinum como “em estudo, sem previsão”, para não esperar funções que ainda não existem.
4. Como jogador de SoulSilver, quero ver criar time, times salvos e Pokédex na área do jogo, para escolher meu próximo passo.
5. Como jogador, quero saber que o recorte inclui Johto e Kanto até antes do primeiro confronto com Red, para interpretar corretamente a disponibilidade.
6. Como jogador, quero distinguir catálogo regional de candidatos disponíveis na campanha, para não tomar presença na Pokédex como prova de obtenção.
7. Como jogador, quero pesquisar por nome e número e filtrar por tipo, para encontrar uma entrada rapidamente.
8. Como jogador, quero identificar uma entrada ainda não verificada, para não confundi-la com uma indisponibilidade comprovada.
9. Como jogador, quero ver por que um candidato auditado é elegível ou indisponível, para confiar na seleção.
10. Como jogador, quero encontrar candidatos elegíveis sem número regional na visão da campanha, para não depender apenas da Pokédex regional.
11. Como jogador, quero criar e nomear um time vinculado a SoulSilver, para organizar um plano específico da versão.
12. Como jogador, quero começar com um time vazio e adicionar até seis membros, para construir o plano gradualmente.
13. Como jogador, quero repetir uma espécie em posições diferentes, para experimentar composições sem restrição artificial.
14. Como jogador, quero selecionar apenas variantes jogáveis comprovadas, para não montar uma forma impossível no recorte.
15. Como jogador, quero escolher apenas habilidades comprovadas para a variante, para evitar uma configuração inválida.
16. Como jogador, quero escolher até quatro golpes comprovados, para montar um moveset coerente com a campanha.
17. Como jogador, quero ver o método e condições de obtenção de um Pokémon e de aprendizado de um golpe, para distinguir validade de conveniência.
18. Como jogador, quero que golpes retidos de pré-evolução e egg moves apareçam somente quando o caminho estiver comprovado, para não depender de uma compatibilidade teórica.
19. Como jogador, quero saber quando uma forma exige um item ou condição, mesmo sem configurar equipamento, para compreender sua elegibilidade.
20. Como jogador, quero entender que cada escolha é validada individualmente, para não presumir que recursos limitados bastam para todo o time em um único save.
21. Como jogador, quero ver quais tipos defensores meus golpes selecionados atingem super efetivamente, para entender a cobertura ofensiva real.
22. Como jogador, quero ver quais membros e golpes oferecem cada cobertura e quando ela desaparece, para avaliar uma troca de move.
23. Como jogador, quero ver os multiplicadores defensivos naturais de cada membro e a contribuição separada da habilidade, para entender fraquezas, resistências e imunidades.
24. Como jogador, quero ver contagens factuais do time e a origem de cada imunidade, para interpretar padrões sem um score arbitrário.
25. Como jogador, quero ver HMs presentes e ausentes nos movesets e as capacidades correspondentes, para enxergar utilidade de campo sem receber uma previsão falsa de progresso.
26. Como jogador, quero receber análise assim que houver um membro e sempre que eu alterar escolhas, para explorar iterativamente.
27. Como jogador, quero ver quando a análise está parcial, para não interpretar lacunas como cobertura completa.
28. Como jogador, quero navegar entre Pokédex e Team Builder sem perder edições, para consultar informações durante a montagem.
29. Como jogador, quero encontrar meus times após fechar e reabrir o navegador, para continuar o planejamento.
30. Como jogador, quero duplicar e excluir times com clareza, para experimentar e manter minha lista organizada.
31. Como jogador, quero exportar e importar um backup, para conservar uma cópia fora do armazenamento local.
32. Como jogador, quero manter visíveis escolhas salvas que uma correção de dados invalidou, com motivo, para repará-las sem perder meu trabalho.
33. Como jogador, quero entender falhas de dados, backup e salvamento sem receber uma análise indevida, para não confiar em resultados incompletos.
34. Como jogador em celular ou usando teclado ou leitor de tela, quero executar o fluxo principal com a mesma informação, para usar o protótipo sem depender de apontador, cor ou largura de tela.

## Implementation Decisions

### Recorte e política de validade

- **Versão do jogo:** SoulSilver é a única jogável; a identidade do Time registra uma versão individual fixa. Grupo de versões e geração podem fornecer regras compartilhadas, mas não substituem a versão na verificação de disponibilidade.
- **Marco da campanha:** imediatamente antes do primeiro confronto com Red, com Johto e Kanto incluídos. Métodos e recompensas desbloqueados somente depois desse confronto não contam. A passagem inicial dos créditos não encerra o recorte.
- **Caminho de obtenção aceito:** método normal interno à versão acessível até o marco, inclusive encontros condicionados por horário/dia, Safari Zone, presente, troca com personagem, reprodução e evolução por troca de precursor originário de SoulSilver. Excluir dependência exclusiva de outra versão, transferência externa, evento e Pokéwalker. O caminho deve registrar condição e evidência; dificuldade ou demora não anulam validade.
- **Granularidade:** a validação é por variante, habilidade e golpe de cada membro. Ela não promete disponibilidade simultânea de todos os recursos consumíveis para seis membros no mesmo save. Uma explicação persistente junto às opções elegíveis deve declarar esse limite.
- **Estados:** `elegível`, `comprovadamente indisponível` e `ainda não verificado` são distintos. A ausência de relação auditada nunca implica indisponibilidade. Uma escolha salva que falha após nova versão do conjunto é `inválida após revalidação`, estado do Time, não uma nova classificação permanente da espécie.
- **Derivação por espécie:** uma espécie só é elegível para o construtor se ao menos uma variante tiver prova positiva. Ela é comprovadamente indisponível apenas se as variantes relevantes foram avaliadas e descartadas com evidência; nos demais casos permanece ainda não verificada.

### Dataset auditado e evidências

- Entregar um conjunto próprio, estático para o cliente, **versionado, auditado e complementar**. A PokéAPI pode fornecer insumos catalográficos e relações candidatas; nunca decide sozinha a disponibilidade até Red. Nenhuma consulta à PokéAPI em tempo de uso preenche lacunas ou serve de fallback.
- O manifesto do conjunto registra versão imutável do dataset, revisão do esquema, versão do jogo, grupo de versões, geração, marco, data de auditoria, política de exclusões e escopo da amostra. Identificadores de espécie, variante, habilidade, golpe e tipo são estáveis e independentes de rótulos apresentados na UI.
- Manter separados: entradas e numeração da Pokédex regional; dados catalográficos de Espécie; Variante jogável e seus tipos; Caminho de obtenção; relação de Learnset com método, versão/grupo e condições; decisão comprovada de Golpe elegível para variante e marco; habilidades elegíveis; efeitos defensivos auditados; matriz histórica de Type Effectiveness; mapeamento de HM para Capacidade de campo; evidências e Situação de disponibilidade. Não usar um único `GameRuleset` com tudo isso dentro.
- **Contexto de regras do jogo:** composição explícita de matriz e mecânicas da geração, relações compartilháveis pelo Grupo de versões e restrições da Versão do jogo com Marco da campanha. A implementação real é SoulSilver; não criar adaptadores de jogos fictícios. Regras de outro jogo só entram quando ele for de fato implementado.
- Cada afirmação positiva ou negativa de elegibilidade associa ao menos uma evidência revisável: origem, referência verificável, trecho ou localizador da informação, data da conferência, conclusão e condições. Relações com prova insuficiente permanecem não verificadas. A UI apresenta método e condição em linguagem clara, com referência resumida consultável, sem prometer um guia passo a passo.
- A Pokédex regional exige uma base catalográfica íntegra para todas as suas entradas, com número, nome e tipos históricos exibidos; isso é uma auditoria de catálogo distinta da auditoria de elegibilidade. O filtro por tipo usa apenas tipos catalográficos conferidos. Não atribuir a uma entrada não auditada habilidades, golpes ou caminhos de campanha como válidos.
- A visão **Disponíveis na campanha** é a união dos candidatos positivamente verificados da amostra, inclusive fora da numeração regional. Exibir aviso de que a lista é parcial para SoulSilver até Red. Entradas verificadas como indisponíveis permanecem informativas na Pokédex, mas não aparecem como candidatas adicionáveis.
- Selecionar a amostra **depois** da pesquisa real, priorizando diversidade demonstrável de obtenção, evolução/troca, presente, Safari Zone, horário/dia, reprodução, variantes, habilidades e métodos de aprendizado. Documentar em uma matriz o caso que cada candidato cobre e as lacunas inevitáveis. Nenhum método ou espécie é obrigatório se a auditoria não o comprovar. Para cada opção efetivamente oferecida, prova positiva é obrigatória; o conjunto não precisa esgotar todos os métodos possíveis daquele candidato.
- A importação de dados para o conjunto é trabalho de preparação, fora do navegador do usuário. Validação de esquema e integridade é porta de entrada do build; o carregador também valida manifesto e integridade ao iniciar, rejeitando o conjunto inteiro quando a regra central ou uma referência obrigatória está inconsistente. Nunca converter falha de dados em elegibilidade presumida.

### Team Builder e elegibilidade

- Criar Time com identificador estável, nome sugerido editável, versão SoulSilver, carimbos de criação e última edição e zero a seis Membros do time em ordem. Um slot vazio não é Membro. Duplicação cria novo identificador e carimbos; exclusão pede confirmação.
- Cada Membro guarda identificador próprio, variante escolhida, habilidade opcional enquanto incompleto e lista ordenada de zero a quatro golpes distintos. Não armazenar cópia integral de definições do dataset no time. Guardar a versão do dataset usada na última validação e identificadores originais para explicar mudanças; nunca apagar seleção antiga na revalidação.
- Ao trocar a variante, revalidar habilidade e golpes existentes. Opções que perderam validade ficam identificadas até o usuário corrigir ou remover. Uma escolha nova fora da amostra ou não elegível é impedida com motivo; a UI não oferece opções sem prova.
- Habilidades selecionáveis exigem relação comprovada com a variante em SoulSilver e obtenção possível na campanha. Efeitos defensivos são uma verificação separada da elegibilidade da habilidade.
- Golpes selecionáveis exigem relação conhecida de Learnset **e** prova de acesso ao método até o Marco da campanha. Métodos admitidos: level-up, TM, HM, egg move, tutor e move reminder. A relação registra se o golpe foi aprendido pela variante atual ou por pré-evolução e as condições para retê-lo. Egg move exige cadeia de reprodução comprovada sob a política de origem do protótipo. Nível alto não invalida o golpe. Se existirem múltiplos caminhos, basta um caminho comprovado aceito; mostrar todos os caminhos auditados relevantes, quando disponíveis.
- Golpe selecionável com tipo ofensivo variável ou indeterminável pode ocupar um slot, mas não ganha crédito ofensivo até existir regra verificada para seu tipo efetivo no contexto considerado.
- Forma dependente de item ou outra condição mantém essa condição como prova de elegibilidade e explicação. Não existe campo geral de item, nem avaliação de sinergia ou consumo de itens por time.

### Cálculos de cobertura e campo

- Todos os cálculos usam somente o dataset carregado e validado. Nenhum componente visual implementa sua própria tabela de tipos, exceção de jogo ou critério de elegibilidade.
- **Cobertura ofensiva:** para cada tipo defensor isolado do contexto, reunir golpes selecionados, válidos, de dano e com tipo ofensivo conhecido. Crédito quando o multiplicador histórico é maior que 1. Mostrar tipos sem cobertura, quantidade de Membros distintos que oferecem cobertura e, por membro, golpes responsáveis. Não contar golpe de status, golpe inválido, tipo desconhecido, poder, precisão ou STAB; não calcular confronto contra espécie ou dupla tipagem concreta. Remover o último golpe que cobre um tipo remove imediatamente esse crédito.
- **Cobertura defensiva:** para cada Membro com variante válida, calcular o produto da matriz histórica para seus tipos naturais contra cada tipo atacante; preservar 0, 0,25, 0,5, 1, 2 e 4 quando ocorrerem. Apresentar esse resultado natural e, separadamente, o efeito verificado da habilidade escolhida sobre imunidade ou dano por tipo em condições normais. Agregações contam Membros, não golpes; imunidades mostram sua origem natural ou por habilidade. Não inferir que uma resistência natural de 0,5 seja equivalente a efeito condicional da habilidade.
- Efeitos defensivos por tipo das habilidades incluídas na amostra precisam ser modelados e auditados antes de tratá-los como fatos. Caso uma lacuna seja encontrada após a auditoria, mostrar a defesa natural e sinalizar explicitamente que a contribuição da habilidade é desconhecida; agregações afetadas ficam parciais. Efeitos que dependam de clima, item, estado ou outra condição não assumida como normal não serão simulados.
- Alertas são frases derivadas de contagens verificáveis, como “3 membros são fracos a Electric” ou “2 são imunes a Ground”. Não atribuir score, qualidade, recomendação de troca ou previsão de batalha. Quando algum Membro relevante estiver incompleto/inválido, indicar o conjunto analisado e que o resultado é parcial.
- **Capacidades de campo:** detectar HMs válidos escolhidos e associá-los às capacidades auditadas, mostrando presentes e ausentes. Golpe inválido não fornece capacidade. A visão não interpreta insígnias, obstáculos ou possibilidade de avançar na campanha.

### Persistência, versionamento e backup

- Escolher **IndexedDB** para times locais: registros estruturados independentes, leitura/escrita assíncrona e transações ajudam com vários times, autosave e importação atômica. `localStorage` tem limite menor e operações síncronas; seu menor custo inicial não compensa regravar uma coleção inteira a cada alteração. Usar uma camada pequena de repositório local, sem espalhar chamadas ao navegador pela UI. [Referência IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API); [cotas e descarte](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
- Um registro por Time, com revisão incremental do registro, carimbos e versão do dataset usada na última validação; esquema do armazenamento local possui versão própria. O repositório oferece operações de criar, listar, obter, salvar, duplicar, excluir e importar em transação. Migrações preservam IDs e escolhas originais e falham sem apagar dados quando encontram versão futura desconhecida.
- Autosave após cada alteração confirmada pelo usuário, com escrita serializada por Time. A UI só mostra “salvo” após confirmação da transação; durante gravação mostra “salvando” e, em falha, “não salvo” com opção de tentar novamente. Não depender de evento de fechamento da aba. Abas concorrentes detectam revisão antiga antes de sobrescrever e pedem recarregamento ou resolução, evitando perda silenciosa.
- Armazenamento do navegador é local à origem e pode ser limpo ou descartado. O produto informa essa limitação e oferece backup; não promete sincronização, permanência absoluta ou funcionamento offline. Falhas de quota, bloqueio ou transação não devem eliminar a cópia em memória da edição atual.
- Backup exportado como arquivo de dados legível e versionado, contendo formato, versão do esquema de backup, data, versão do dataset de origem e todos os Times com IDs e escolhas. Não incluir catálogo auditado nem afirmações de validade como autoridade. Exportação lê um retrato consistente dos times.
- Importação valida estrutura, limites, IDs, versão, tipo dos campos e tamanho antes de gravar; versões antigas conhecidas passam por migração, versões futuras incompatíveis são rejeitadas com explicação. O arquivo não executa conteúdo. Importação é atômica: se qualquer Time for inválido estruturalmente, nenhum é gravado. Colisões de IDs geram novos IDs para os Times importados, preservando os existentes; mostrar resumo de quantos foram importados. Revalidar escolhas com o dataset atual sem apagá-las.
- Versão do **dataset auditado**, versão do **esquema de armazenamento** e versão do **arquivo de backup** são independentes. Atualização do dataset dispara revalidação de todos os Times carregados, sem alterar o histórico da escolha original. Uma seleção que se tornou inválida permanece visível com motivo e ação para reparo.

### Arquitetura do frontend

- Implementar um aplicativo cliente em **React, TypeScript e Vite**, sem servidor de aplicação. Esse conjunto atende a edição reativa do Team Builder e mantém o domínio tipado e isolado da visualização. Vite fornece modelo React/TypeScript mantido oficialmente; versões concretas devem ser fixadas no momento da implementação conforme compatibilidade do ambiente. [Vite](https://vite.dev/guide/); [React](https://react.dev/learn/installation).
- Executar o protótipo em servidor local de desenvolvimento ou distribuição estática com acesso restrito provido fora da aplicação. Não expor uma URL pública sem controle de acesso, já que o Dexu não terá autenticação neste marco. O modo concreto de entrega aos avaliadores deve ser definido antes da avaliação privada; não altera as regras do produto.
- Organizar por responsabilidades, sem abstrações para jogos ainda inexistentes: carregador/validador de dados auditados; domínio puro de elegibilidade, revalidação, cobertura e capacidades; repositório de Times e backup; camada de aplicação que coordena carregamento/edição/salvamento; telas e componentes de apresentação. Contratos tipados atravessam essas fronteiras. O domínio não importa React, IndexedDB nem componentes.
- Manter a identidade da Versão do jogo nos contratos e compor o Contexto de regras do jogo a partir do conjunto auditado. Um futuro jogo acrescentará dados/regras e talvez novas políticas auditadas, sem duplicar a aplicação, mas esta spec não exige plugin system, herança de regras ou implementações vazias para HeartGold, Emerald ou Platinum.
- Rotas navegáveis para entrada/seleção, área SoulSilver, Pokédex regional, Disponíveis na campanha, lista de Times e Team Builder de Time específico. Navegar para explorar e voltar restaura o mesmo Time e posição de edição. Rotas dos jogos “em estudo” não abrem área funcional. O mecanismo de roteamento pode ser escolhido na implementação sem mudar esses contratos de navegação.
- Não introduzir estado global ou biblioteca de componentes genérica sem necessidade concreta. A camada de aplicação fornece uma única avaliação coerente da configuração corrente à UI; componentes apenas apresentam estados e emitem intenções de edição.

### UX, identidade e acessibilidade

- Fluxo: entrada Dexu → cards de jogos → SoulSilver → criar Time, abrir Times salvos ou explorar Pokédex → Team Builder → edição de até seis posições com análise no mesmo fluxo → autosave → retomada posterior. A Pokédex permite voltar ao Time de origem sem perder o contexto. Exibir análise desde o primeiro Membro e estado vazio claro para Time sem Membros.
- Cards de HeartGold, Emerald e Platinum exibem “em estudo, sem previsão”, sem chamada de ação enganosa. Cards de Pokémon do protótipo usam número, nome, texto de tipos e recursos visuais próprios do Dexu, sem sprites/capas da franquia.
- Aplicar paleta aprovada (`#FF5A5F`, `#FFC629`, `#2EC5FF`, `#0F172A`, `#FDF8F3`, `#E5E7EB`), Plus Jakarta Sans ExtraBold para títulos, SemiBold para controles e Inter Regular para corpo, com a assinatura **MONTE • EXPLORE • CONECTE**. Usar logos e ícone existentes em fundos compatíveis com seus fundos opacos; não recriar nem assumir versões transparentes/vetoriais. Obter arquivos/licenças das fontes antes do acabamento visual; fallback legível enquanto indisponíveis.
- Desktop e celular oferecem criação, consulta, edição, análise e backup equivalentes. Em telas estreitas, a análise pode ficar após a edição ou em navegação acessível, mas nunca desaparecer. Estados vazios, carregamento, salvamento, erro, dados parciais e opções bloqueadas recebem texto específico.
- Meta **WCAG 2.2 AA** nos fluxos principais: controles operáveis por teclado; foco visível e devolvido de modo previsível; labels e instruções associados; nomes, funções e estados acessíveis; contraste aferido; tipo indicado também por texto; mensagens de erro e progresso identificáveis ao leitor de tela. Atualizações frequentes de cobertura são comunicadas por resumo conciso em região de status, sem anunciar toda a matriz a cada mudança ou roubar foco. Se houver diálogo de exclusão/importação, gerenciar foco, Escape e retorno ao acionador. Alvos e interações móveis devem manter informação e operação equivalentes. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

### Estados e falhas observáveis

| Situação | Comportamento exigido |
| --- | --- |
| Nenhum Time salvo | Mostrar estado vazio com ação de criar Time e acesso à Pokédex. |
| Time vazio ou com menos de seis Membros | Mostrar posições livres, convite para adicionar e análise identificada como parcial/inicial. |
| Membro sem habilidade ou sem golpes | Preservar edição incompleta; explicar quais parcelas da análise já podem ser calculadas. Sem golpes válidos, ofensiva não tem crédito e campo não tem HM presente. |
| Entrada regional ainda não verificada | Mostrar dados catalográficos e estado explícito; bloquear adição e não afirmar indisponibilidade. |
| Variante ou golpe verificado como indisponível | Explicar motivo auditado; impedir nova seleção. |
| Variante, habilidade ou golpe salvo que ficou inválido | Preservar escolha e motivo; excluir apenas parcelas afetadas da análise; indicar parcialidade e permitir reparo. |
| Habilidade válida com efeito defensivo desconhecido | Mostrar defesa natural; omitir contribuição não comprovada e marcar resultado defensivo afetado como parcial. |
| Dataset ausente, corrompido ou não carregado | Preservar e permitir visualizar Times locais brutos; bloquear novas escolhas e qualquer nova afirmação de validade/cobertura; oferecer tentar carregar novamente. Sem fallback à PokéAPI. |
| Backup malformado ou versão futura incompatível | Rejeitar sem modificar Times existentes e informar o tipo de problema. |
| Persistência negada, cheia ou falha | Manter edição em memória, avisar que não foi salva e oferecer nova tentativa ou exportação do estado recuperável. |
| Conflito entre abas | Não sobrescrever revisão mais recente silenciosamente; oferecer recarregar ou preservar cópia para exportação. |

## Testing Decisions

- **Princípio:** proteger comportamento observável nas fronteiras mais altas que permaneçam rápidas e confiáveis. O repositório ainda não possui testes ou código anterior; não há padrão existente a copiar. Testes não devem apenas repetir detalhes de implementação ou provar que cada helper chama outro helper.
- **Seam principal:** API de aplicação/domínio que recebe dataset validado, Time e intenção de edição e devolve configuração revalidada, explicações, cobertura ofensiva/defensiva e capacidades de campo. Exercitar cenários encadeados representativos: escolha elegível → análise → troca de golpe → cobertura muda; correção de dataset → seleção preservada/inválida → cálculo parcial; variante e habilidade mudam → defesa natural e efeito separado. Usar fixtures pequenas auditáveis e também uma amostra real somente depois de sua revisão.
- **Fronteira do dataset:** testar aceitação de manifesto, referências e evidências consistentes; rejeição de relações órfãs, versões/marcos incompatíveis, matriz de tipos incompleta, prova ausente, status contraditórios e tentativa de promover learnset bruto a golpe elegível. Uma verificação de integridade roda sobre o conjunto real antes de empacotar.
- **Regras de elegibilidade:** cobrir obtenção interna e exclusões, forma relevante e requisito, habilidade válida/inválida, level-up, TM/HM, tutor/reminder, golpe herdado de pré-evolução e egg move com/sem cadeia comprovada. Conferir que nível alto não bloqueia e que recursos limitados não viram restrição global inventada.
- **Cálculos:** tabelas de exemplos controlados para efetividade histórica, dupla tipagem, 0/0,25/0,5/1/2/4, habilidade que cria imunidade ou altera dano, efeito desconhecido, golpe de dano versus status, tipo variável, contagem por Membro distinto, HMs presentes/ausentes e remoção do último golpe que cobria um tipo.
- **Persistência e backup:** testar repositório IndexedDB em navegador ou ambiente que preserve transações reais: autosave confirmado, retomada, duplicação, exclusão, quota/falha, concorrência, migração, arquivo inválido sem escrita parcial, colisão de IDs, importação de versão antiga suportada e revalidação após nova versão do dataset. Não simular toda a semântica transacional com um mock que esconderia falhas reais.
- **Fluxos críticos em navegador:** poucos testes de ponta a ponta para entrada → SoulSilver → Pokédex → criar/editar Time → análise muda → recarregar página → Time persiste; e exportar → importar → revalidar. Rodar pelo menos em largura de celular e desktop, com verificações de teclado, foco, nomes acessíveis e mensagens de status. Ferramentas como Vitest e Playwright são adequadas a esses seams, mas a suíte deve permanecer pequena e voltada ao contrato. [Vitest](https://vitest.dev/guide/); [Playwright](https://playwright.dev/docs/intro).
- **Revisão manual necessária:** conferir evidências do dataset contra fontes reais e observar com pessoas do público-alvo se conseguem explicar validade e efeito da troca de golpe. Automação de UI e acessibilidade não substitui essa leitura humana.

## Critérios de aceitação

1. Só SoulSilver abre fluxo funcional; os outros três cards comunicam “em estudo, sem previsão”.
2. O recorte até antes de Red e o caráter parcial da amostra aparecem antes de o usuário interpretar a lista de candidatos como completa.
3. A Pokédex regional lista todas as entradas catalográficas verificadas; uma entrada não auditada para elegibilidade mostra “ainda não verificado” e não pode ser adicionada. A visão da campanha mostra todos os candidatos positivos da amostra, inclusive sem número regional.
4. Nenhuma variante, habilidade ou golpe é oferecido sem evidência aceita para SoulSilver e o marco. Cada opção oferecida explica método/condições. Relações históricas sem prova de obtenção não se tornam opções.
5. Time de 0 a 6 Membros, inclusive espécies repetidas, pode ser criado, nomeado, editado, duplicado, excluído e retomado depois de reabrir o navegador.
6. Alterar um golpe válido atualiza a cobertura ofensiva no fluxo; retirar o único golpe que cobria um tipo elimina o crédito desse tipo. Golpes de status e tipo ofensivo desconhecido não criam cobertura.
7. Defesa mostra multiplicador natural e efeito verificado da habilidade em campos distintos; contagens de imunidade explicam a origem. Efeito desconhecido produz indicação de análise parcial, não um número presumido.
8. HMs escolhidos e válidos aparecem com suas capacidades, e os ausentes são identificados sem concluir que a campanha está bloqueada.
9. Atualização do dataset que invalida escolha preserva Time e seleção, apresenta motivo, impede contagem afetada e marca análise parcial.
10. Dataset não carregado permite visualizar Times locais, mas impede cálculo e novas afirmações de validade; não aciona consulta à PokéAPI.
11. Backup exportado e reimportado preserva Times e escolhas; arquivo inválido ou incompatível não modifica o armazenamento.
12. Os fluxos centrais funcionam em celular e desktop por teclado e leitor de tela, com contraste, foco, labels e mudanças de análise acessíveis conforme WCAG 2.2 AA.
13. O dataset real da amostra passa validação de integridade e revisão de evidências antes de ser tratado como dado de produto.

## Out of Scope

- Backend de aplicação, banco remoto, contas, autenticação, sincronização, perfis, seguidores, favoritos, times públicos, links de compartilhamento e outros recursos sociais.
- Suporte funcional a HeartGold, Emerald ou Platinum; edição da versão de um Time; National Dex completa; Dex pessoal ou marcação de Pokémon obtidos.
- Auditoria integral de todos os candidatos de SoulSilver até Red no primeiro protótipo. Uma versão posterior que se declare completa exigirá auditoria de todos os candidatos e golpes por level-up/TM/HM; outros métodos apenas nas relações provadas, com parcialidade declarada.
- Campo geral de item, natureza, nível configurável, gênero, EVs, IVs, shiny, nickname, Tera Type e outras mecânicas de jogos posteriores.
- Cálculo de dano, simulação de batalha, confronto real contra espécie de dois tipos, simulação de insígnias/obstáculos/progressão, garantia de recursos simultâneos em um único save e garantia de funcionamento offline.
- Publicação pública, capas e sprites da franquia, ou reformulação da identidade visual Dexu.

## Further Notes

### Pré-requisitos e pesquisas bloqueadas por evidência

1. **Auditoria de SoulSilver — bloqueia povoar o dataset real.** Conferir diretamente numeração e tipos históricos da Pokédex regional, grupo de versões, obtenção até Red, evoluções/trocas, variantes, habilidades e métodos de golpe. Conferir respostas reais da PokéAPI antes de construir o importador; a documentação descreve learnsets por grupo de versões e não prova acesso no marco. [PokéAPI](https://pokeapi.co/docs/v2).
2. **Fontes complementares e matriz da amostra — bloqueia a seleção concreta dos candidatos.** Localizar evidência confiável para horário/dia, Safari Zone, presentes, trocas internas, reprodução/egg chains, pré-evolução, tutor, reminder, TM/HM e limites temporais de acesso. Registrar lacunas e deixar de oferecer opções sem prova.
3. **Efeitos históricos defensivos — bloqueia afirmar efeitos de habilidades da amostra.** Revisar condições reais de cada habilidade relevante e matriz histórica de tipos; textos de habilidade da PokéAPI não são uma tabela universal de multiplicadores. [PokéAPI](https://pokeapi.co/docs/v2).
4. **Fontes tipográficas e assets — bloqueia acabamento fiel em certas superfícies.** Obter arquivos e licença de Plus Jakarta Sans e Inter; confirmar se versões transparentes/vetoriais da marca existem fora do repositório, sem redesenhar os assets fornecidos.
5. **Propriedade intelectual — bloqueia decisão de publicação pública e uso de arte da franquia.** O repositório de sprites da PokéAPI atribui as imagens à The Pokémon Company, e o suporte oficial pede que sua propriedade intelectual não seja usada em projetos externos. O protótipo usa elementos próprios e permanece privado; avaliar direitos antes de lançar publicamente. [Licença dos sprites](https://github.com/PokeAPI/sprites/blob/master/LICENCE.txt); [suporte Pokémon](https://support.pokemon.com/hc/en-us/articles/360000634094-Can-I-use-Pok%C3%A9mon-images-or-materials).

### Riscos e limites

- A amostra pode representar mal a diversidade do domínio se a auditoria não cobrir casos distintos; a matriz da amostra torna a limitação explícita.
- Dados catalográficos completos e auditados para a Pokédex regional exigem trabalho próprio, mesmo com poucos candidatos elegíveis. Se essa base não estiver pronta, o critério de aceitação da Pokédex não está cumprido.
- Armazenamento de navegador pode ser limpo pelo usuário ou descartado pelo navegador; o backup reduz o risco, mas não o elimina. [Cotas e descarte](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
- O mecanismo de distribuição privada aos avaliadores ainda precisa ser escolhido; hospedar os arquivos em endereço aberto transformaria o protótipo em publicação pública, fora deste marco.
- A disponibilidade individual de escolhas não equivale à viabilidade conjunta em um único save. A interface deve repetir esse limite onde a explicação de validade aparece.
- Não há inconsistência de produto impeditiva entre os documentos aprovados. As decisões técnicas desta spec preenchem lacunas deixadas para esta etapa; dados e direitos acima continuam condicionados à pesquisa.
