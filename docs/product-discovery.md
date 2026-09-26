# Descoberta do produto Dexu

Registro das decisões tomadas na entrevista. Este documento ainda não é uma especificação técnica.

## Decisões confirmadas

- O primeiro público é quem já conhece o básico de Pokémon, está voltando a SoulSilver e quer planejar um time para a campanha sem conferir learnsets em vários sites.
- A tarefa principal da primeira versão é montar um time, configurar golpes e habilidades e entender suas coberturas.
- A diferença central em relação a um team builder genérico é oferecer opções comprovadamente obtíveis no jogo e período escolhidos, explicar seus métodos e analisar os golpes realmente selecionados.
- O protótipo terá êxito se jogadores que conhecem Pokémon conseguirem montar e revisar um time de SoulSilver, entender por que as escolhas são válidas e perceber o efeito de trocar um golpe na análise, sem consultar outro site para verificar legalidade.
- SoulSilver é a primeira versão de jogo a ser suportada.
- O marco da campanha é imediatamente antes do primeiro confronto com Red, após a jornada por Johto e Kanto. A antiga restrição aos primeiros créditos foi substituída por esta decisão; recompensas e métodos desbloqueados só depois de Red ficam fora.
- Cada time tem uma versão individual fixa. HeartGold e SoulSilver podem compartilhar regras, mas trocar a versão de um time salvo não faz parte do fluxo definido.
- A seleção inicial de Pokémon considera os obtidos na própria versão até o marco da campanha. Evolução por troca de um Pokémon originário de SoulSilver é permitida; exclusivos recebidos de outras versões, transferências e eventos não entram nesse conjunto.
- Pokémon obtidos apenas por meio do Pokéwalker também ficam fora do conjunto elegível do MVP.
- Métodos normais acessíveis até o marco da campanha dentro de SoulSilver contam, inclusive encontros por horário/dia, Safari Zone, trocas com personagens do jogo, presentes e reprodução. Condições relevantes devem ser informadas, mesmo quando o método é demorado ou opcional.
- Golpes selecionáveis devem ser aprendíveis até o marco da campanha por level-up, TM/HM, egg move, tutor ou move reminder disponíveis em SoulSilver. Golpes que exigem treinamento até nível alto continuam válidos.
- A validação é individual por membro e golpe. O Dexu não garante que todas as configurações do time sejam reproduzíveis juntas em um único save com seus recursos limitados.
- Golpes aprendidos por uma pré-evolução são válidos quando a sequência até o Pokémon escolhido é possível até o marco da campanha.
- Egg moves só aparecem como válidos quando a cadeia de reprodução necessária for comprovadamente acessível até o marco da campanha. Na ausência dessa prova, ficam ocultos do conjunto de golpes válidos.
- O Team Builder oferece inicialmente apenas formas e variantes alcançáveis até o marco da campanha de SoulSilver que alterem tipos, habilidades, golpes ou outra regra relevante ao time.
- Cada membro do time configura Pokémon ou forma elegível, habilidade comprovadamente possível na campanha de SoulSilver e até quatro golpes. Item, natureza, nível, gender, EVs, IVs, shiny e nickname ficam fora do MVP.
- Times podem ter de zero a seis membros e repetir espécies. Requisitos de formas dependentes de item precisam ser validados e explicados mesmo sem um campo geral de item.
- A cobertura ofensiva considera golpes selecionados que causam dano e têm tipo efetivo conhecido, contra cada tipo defensor isolado. Indica membros e golpes responsáveis; um golpe de tipo variável continua selecionável, mas não recebe crédito quando seu tipo efetivo é desconhecido.
- A cobertura defensiva distingue relações naturais de tipo dos efeitos comprovados da habilidade escolhida em condições normais. A análise não afirma o resultado de cada confronto real com um Pokémon de dois tipos.
- Todo golpe de dano super efetivo com tipo conhecido conta como cobertura ofensiva, sem limite de poder, precisão ou STAB e sem estimativa de dano.
- A cobertura defensiva preserva o multiplicador natural de tipos, incluindo diferenças como 2× e 4×. Efeitos da habilidade permanecem identificados à parte.
- Os alertas do MVP descrevem fatos verificáveis de cobertura, sem nota geral, limiares qualitativos ou recomendações automáticas de substituição.
- O Team Builder mostra quais HMs foram escolhidos e as capacidades de campo correspondentes, sem simular obstáculos, insígnias ou progressão completa da história.
- O resumo de campo mostra HMs escolhidos e ausentes, sem afirmar que uma etapa da campanha está bloqueada.
- A Pokédex do MVP usa o catálogo regional de SoulSilver e mostra a disponibilidade de cada entrada para a campanha; presença na Pokédex não implica elegibilidade para o time.
- A Pokédex permite busca e filtros por nome, número e tipo, mostra tipos, formas relevantes, habilidades, golpes e condição de obtenção, e permite adicionar um Pokémon ao time quando elegível.
- Marcar Pokémon possuídos ou registrados, incluindo uma Dex pessoal, fica para depois do MVP.
- O MVP salva vários times no mesmo navegador, sem conta e sem sincronização entre dispositivos. A forma técnica de armazenamento ainda não foi escolhida.
- Compartilhamento por link, publicação de times, perfis e exploração social ficam para depois do MVP.
- A organização inicial dos times é uma lista com nome editável, data da última edição e ações de abrir, duplicar e excluir; pastas, tags e histórico ficam para depois.
- Quando contas forem adicionadas, a importação dos times locais será explícita, com revisão de conflitos; não haverá envio automático.
- Times associados a perfis futuros serão privados por padrão e só ficarão públicos por ação explícita em cada time.
- O protótipo privado não terá backend de aplicação nem banco de dados próprios. Dados auditados serão entregues como conjunto versionado; times ficarão no navegador com backup exportável/importável. O formato interno permanece uma decisão da especificação.
- Antes do lançamento, todos os Pokémon elegíveis e seus golpes por level-up/TM/HM devem ser verificados. Egg moves, tutors e move reminder entram somente nas relações comprovadas; a cobertura parcial desses métodos deve ser declarada.
- A meta de verificação acima já vale para o primeiro protótipo privado; ele não usará um subconjunto de Pokémon nem dados fictícios para validar o fluxo.
- O produto mostra o método de obtenção ou aprendizado e condições relevantes conhecidas para explicar por que uma escolha é válida; não precisa fornecer um guia passo a passo.
- A PokéAPI é fonte inicial, não autoridade suficiente para a validade até o marco da campanha. O Dexu usará um conjunto próprio, auditado, complementar e versionado de dados de SoulSilver. Arquivos ou banco ainda não foram escolhidos.
- A interface e as explicações iniciais serão em português do Brasil; nomes de Pokémon, golpes e habilidades seguirão o inglês usado no jogo.
- A Pokédex cataloga espécies; variantes jogáveis representam diferenças que afetam tipos, habilidades, golpes ou outras regras relevantes ao time. Diferenças puramente visuais não criam uma nova espécie nem uma variante jogável.
- O contexto de regras do jogo reúne regras da geração, do grupo de versões e da versão/campanha para responder o que vale para um time. Pokédex, espécies e golpes permanecem conceitos próprios, sem formar um `GameRuleset` monolítico.
- Disponibilidade até o marco da campanha é comprovada por caminhos de obtenção ligados à variante, à versão, ao período da campanha e ao método; não é um booleano da espécie ou da entrada da Pokédex.
- Learnset registra relações de aprendizado conhecidas e seus métodos; golpes elegíveis são o subconjunto comprovado aceito pela política da campanha. As duas listas não são sinônimas.
- O primeiro marco é um protótipo privado para validar produto e dados. Não há autorização confirmada para imagens, capas ou outros materiais da franquia; eventual publicação pública dependerá de avaliação específica dos direitos.
- A seleção visual inicial mostrará SoulSilver e cards de HeartGold, Emerald e Platinum marcados como “em estudo, sem previsão”. Apenas SoulSilver será jogável no MVP; os demais cards não implicam cronograma.
- Os cards de Pokémon do protótipo usarão nome, número, tipos e elementos visuais próprios do Dexu, sem depender de sprites da franquia.
- Montagem, edição, análise do time e consulta à Pokédex devem funcionar por completo tanto em celular quanto em desktop.
- Não há garantia de uso offline no primeiro marco, embora os times sejam armazenados no navegador.
- Os fluxos principais serão projetados e verificados para WCAG 2.2 AA, incluindo teclado, leitor de tela, contraste e comunicação acessível das mudanças da análise. Fonte: https://www.w3.org/TR/WCAG22/
- O card de SoulSilver leva a uma área do jogo com acesso a criar time, abrir times salvos e explorar a Pokédex.
- A configuração dos membros ocorre no fluxo do Team Builder; a análise reage imediatamente às mudanças e aparece desde o primeiro membro, identificando quando o time ainda está incompleto.
- Edições são salvas automaticamente. Cada time começa com nome sugerido e editável; vários times ficam no mesmo navegador.
- O MVP permite exportar e importar arquivo de backup dos times locais, sem criar um fluxo de publicação ou compartilhamento público.
- Correções nos dados auditados revalidam times salvos. Escolhas que se tornarem inválidas são preservadas e sinalizadas com motivo, sem remoção automática.
- Escolhas salvas que se tornaram inválidas não contribuem para os cálculos afetados; a análise indica que está parcial.
- Uma habilidade elegível pode ser escolhida mesmo quando seu efeito defensivo não foi modelado com confiança. A defesa natural continua visível e a omissão do efeito da habilidade é indicada.
- Se o conjunto de dados auditados falhar ao carregar, o Dexu informa o erro e preserva os times locais, mas não produz novas afirmações de validade ou cobertura nem substitui a base por consulta ao vivo à PokéAPI.
- Antes do MVP, todas as habilidades elegíveis em SoulSilver que alterem imunidade ou dano recebido conforme o tipo do ataque, em condições normais, devem ser modeladas e verificadas. Outros efeitos de sobrevivência ficam fora da cobertura de tipos; a regra de análise parcial cobre lacunas descobertas após a auditoria.
- Contagens agregadas de imunidade incluem tanto tipos naturais quanto habilidades, mas devem explicar a origem de cada caso.

## Perguntas abertas

- Como comprovar egg moves e outras cadeias de obtenção sem incluir, por engano, Pokémon externos à versão.
- Como comunicar métodos e custos de obtenção dos golpes, além da distinção entre validade e conveniência.
- Como representar regras compartilhadas por versões e disponibilidade específica de SoulSilver sem presumir um único objeto de regras monolítico.
- Como armazenar e revisar evidências de obtenção e aprendizado entre variante, versão, etapa da campanha e método.
- Qual estratégia de direitos viabilizará eventual lançamento público com nomes e imagens da franquia.
- Qual formato de backup e migração futura preservará versões e escolhas inválidas sem corromper times.
- Quais fontes complementares permitem provar disponibilidade até o marco da campanha, cadeias de reprodução e efeitos de habilidades em SoulSilver.
- O trabalho necessário para auditar o conjunto completo de Pokémon elegíveis e os golpes básicos pode ser alto; a viabilidade do marco privado depende de encontrar fontes verificáveis para SoulSilver.

## Fatos a validar

- A documentação da PokéAPI distingue versão individual de grupo de versões e associa detalhes de aprendizado de golpes ao grupo de versões. Isso não comprova, por si só, obtenção antes do primeiro confronto com Red em SoulSilver. Fonte: https://pokeapi.co/docs/v2
- A documentação da PokéAPI fornece relações históricas de efetividade de tipos, mas descreve efeitos de habilidades em texto, não em um campo numérico genérico de imunidade ou redução. A automação das habilidades defensivas precisará de regras verificadas. Fonte: https://pokeapi.co/docs/v2
- A política de uso da PokéAPI pede cache local dos recursos consultados. Fonte: https://pokeapi.co/docs/v2
- As respostas reais dos endpoints específicos de SoulSilver e a completude dos dados de obtenção ainda não foram verificadas.
- O repositório de sprites da PokéAPI declara que o conteúdo das imagens pertence à The Pokémon Company, mesmo distribuindo o repositório sob CC0. O suporte oficial da Pokémon pede que sua propriedade intelectual não seja usada ou associada a projetos externos. Isso exige avaliação antes de escolher capas, sprites ou outras imagens para um lançamento público. Fontes: https://github.com/PokeAPI/sprites/blob/master/LICENCE.txt e https://support.pokemon.com/hc/en-us/articles/360000634094-Can-I-use-Pok%C3%A9mon-images-or-materials

## Assets existentes

- `Logo.png`, `Logo_Negativo.png` e `Icon.png` foram examinados visualmente. Os dois logos incorporam, respectivamente, fundos claro e marinho; o ícone incorpora fundo claro. Os cantos dos três arquivos são opacos, portanto não funcionam como versões transparentes para qualquer superfície.
- Não há capas de jogos, sprites de Pokémon, fontes, protótipos ou código do produto no repositório.
