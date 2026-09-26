# 03 — Amostra mínima comprovada para o primeiro Time

Conferido em 2026-09-26 para **SoulSilver até imediatamente antes do primeiro confronto com Red**. Esta matriz é uma **pesquisa de candidatos**, não um dataset carregado pelo produto. Ela não representa todos os candidatos da campanha nem todos os caminhos e golpes de cada espécie. Cada linha abaixo tem ao menos um caminho positivo interno à versão e um golpe por level-up; o ticket 11 ainda precisa transformar e validar as evidências para uso na interface.

## Matriz positiva mínima

| Espécie / variante jogável | Tipo na geração IV; habilidade normal verificável | Caminho aceito em SoulSilver | Um golpe básico demonstrado | Por que amplia a amostra |
| --- | --- | --- | --- | --- |
| Chikorita / padrão | Grass; Overgrow | Presente de Professor Elm em New Bark Town no início da campanha. [Encontro da versão](https://pokeapi.co/api/v2/pokemon/chikorita/encounters), [registro da variante](https://pokeapi.co/api/v2/pokemon/chikorita/), [manual oficial, início da aventura](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver#page=4) | Razor Leaf, level-up 6 no grupo `heartgold-soulsilver` ([learnset](https://pokeapi.co/api/v2/pokemon/chikorita/)). | Presente inicial e escolha mutuamente exclusiva de starter; não promete vários starters no mesmo save. |
| Hoothoot / padrão | Normal/Flying; Insomnia | Caminhada na Route 29 **à noite**. [Encontro da versão](https://pokeapi.co/api/v2/pokemon/hoothoot/encounters), [Route 29 HGSS](https://www.serebii.net/pokearth/johto/route29.shtml) | Peck, level-up 9 ([learnset](https://pokeapi.co/api/v2/pokemon/hoothoot/)). | Condição de horário sem acessório ou outra versão. |
| Wooper / padrão | Water/Ground; Water Absorb | Caminhada na Route 32 **à noite**, antes da primeira passagem por Union Cave. [Encontro da versão](https://pokeapi.co/api/v2/pokemon/wooper/encounters), [Route 32 HGSS](https://www.serebii.net/pokearth/johto/route32.shtml) | Mud Shot, level-up 9 ([learnset](https://pokeapi.co/api/v2/pokemon/wooper/)). | Dupla tipagem e habilidade defensiva relevante. |
| Geodude / padrão | Rock/Ground; Rock Head | Caminhada na parte inicial da Route 46, acessível pela Route 29. [Encontro da versão](https://pokeapi.co/api/v2/pokemon/geodude/encounters), [Route 46 HGSS](https://www.serebii.net/pokearth/johto/route46.shtml) | Rock Throw, level-up 11 ([learnset](https://pokeapi.co/api/v2/pokemon/geodude/)). | Precursor originário de SoulSilver para auditoria posterior de evolução por troca. |
| Vulpix / padrão | Fire; Flash Fire | Caminhada nas Routes 36/37 de SoulSilver, antes de Red. [Encontro da versão](https://pokeapi.co/api/v2/pokemon/vulpix/encounters), [Route 36 HGSS](https://www.serebii.net/pokearth/johto/route36.shtml), [Route 37 HGSS](https://www.serebii.net/pokearth/johto/route37.shtml) | Ember, level-up 1 ([learnset](https://pokeapi.co/api/v2/pokemon/vulpix/)). | Disponibilidade específica da versão e imunidade por habilidade a auditar separadamente. |

Os nomes e tipos da tabela vêm dos campos `name`, `types`, `abilities` e `past_types` de cada recurso `/pokemon/{name}/`; os encontros vêm de `/pokemon/{name}/encounters`, filtrando `version_details.version.name = soulsilver` **por detalhe**, sem juntar condições de métodos diferentes. Os cinco golpes listados possuem relação `version_group = heartgold-soulsilver`, `move_learn_method = level-up` e o nível indicado. As habilidades escolhidas ocupam slots normais, não `is_hidden`; o campo `past_abilities` não as remove na geração IV. A fonte catalográfica da PokéAPI por si só não prova o limite temporal: a segunda fonte de rota e o manual do início da aventura dão o contexto de progressão. [Documentação dos campos da PokéAPI](https://pokeapi.co/docs/v2).

## Decisões e limites

- **Elegível nesta amostra:** apenas a variante padrão e o caminho positivo descrito em cada linha. Outros encontros ou métodos no recurso da PokéAPI permanecem relações candidatas; esta matriz não os promove automaticamente.
- **Comprovadamente indisponível exige prova negativa abrangente.** A ausência de uma espécie ou de um método nesta tabela significa **ainda não verificado**, não impossibilidade no jogo.
- **Condição de Vulpix:** o recurso de Route 36 contém detalhes de caminhada com condições diferentes. A tabela afirma o local e a versão, não que toda aparição de Vulpix ali seja exclusivamente diurna.
- **Escolhas individuais:** provas de caminho e golpe não garantem todos os recursos simultaneamente em um único save. Nível alto não é motivo de rejeição por si só.
- **Lacunas da amostra mínima:** ainda não há nesta matriz evolução por troca, presente posterior, Safari Zone, obtenção semanal, reprodução, tutor, reminder ou forma dependente de condição. Os tickets 04–06 estudam esses casos; nenhum será oferecido só para preencher uma categoria.

## Conferência reproduzível

Para cada linha, abrir `pokemon/{name}/encounters` e localizar a área e o detalhe de versão `soulsilver`; abrir `pokemon/{name}/` e localizar o tipo/slot de habilidade e o golpe com `heartgold-soulsilver` e `level-up`. Confrontar acesso temporal com a página específica de rota indicada. Outro revisor deve registrar qualquer divergência antes do ticket 11; o conjunto de produto deve rejeitar evidência conflitante em vez de presumir elegibilidade.
