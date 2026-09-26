# 09 — Catálogo regional de SoulSilver

**Auditoria:** 2026-09-26. **Artefato:** [`09-catalogo-regional.csv`](09-catalogo-regional.csv). **Fonte congelada:** [PokeAPI/pokeapi, commit `a003ae375b69a99907ec273fe100d97e7f36321c`](https://github.com/PokeAPI/pokeapi/tree/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv), publicado em 2026-09-25. **Contexto:** Pokédex `updated-johto` (`id=7`), grupo `heartgold-soulsilver`, geração IV, para a Versão do jogo SoulSilver.

Este arquivo é uma **auditoria catalográfica**: número regional, identificador estável da Espécie, nome em inglês e tipos exibíveis na geração IV. A presença na Pokédex regional **não comprova obtenção antes de Red**. O CSV não contém Situação de disponibilidade, Caminho de obtenção, Variante jogável elegível, habilidade ou golpe. Todas as 256 espécies permanecem **ainda não verificadas quanto à elegibilidade de campanha** até que uma auditoria separada registre evidência para a variante e o marco. `ainda não verificada` não equivale a `comprovadamente indisponível`.

## Fontes e reprodução

| Dado | Fonte da mesma revisão congelada | Uso |
| --- | --- | --- |
| Identidade da Pokédex | [`pokedexes.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/pokedexes.csv) | `id=7`, `updated-johto`, região Johto. |
| Número e Espécie | [`pokemon_dex_numbers.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/pokemon_dex_numbers.csv) | Selecionar `pokedex_id=7` e ordenar por `pokedex_number`. |
| Nome | [`pokemon_species_names.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/pokemon_species_names.csv) | Nome em inglês presente na base para `local_language_id=9`, unido pelo ID da Espécie. |
| Pokémon padrão da Espécie | [`pokemon.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/pokemon.csv) | Uma linha `is_default=1` por Espécie, para consultar os tipos catalográficos. Não estabelece elegibilidade dessa variante. |
| Tipos | [`pokemon_types.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/pokemon_types.csv), [`pokemon_types_past.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/pokemon_types_past.csv), [`types.csv`](https://raw.githubusercontent.com/PokeAPI/pokeapi/a003ae375b69a99907ec273fe100d97e7f36321c/data/v2/csv/types.csv) | Tipos por `slot`; substituir tipos atuais pelo registro histórico cujo último período inclua a geração IV. Rejeitar tipo introduzido após a geração IV. |

A [documentação da PokéAPI](https://pokeapi.co/docs/v2#pokedex) define `pokemon_entries` como espécies e índices de uma Pokédex e [define `past_types.generation`](https://pokeapi.co/docs/v2#pokemon) como **a última geração** que tinha aqueles tipos. Por isso, para a geração IV, entre registros históricos com `generation_id >= 4`, usa-se o de menor geração; caso não exista, usam-se os tipos atuais. Um registro de geração I, como o tipo Electric anterior de Magnemite, não substitui o tipo Electric/Steel que já vigorava na geração IV.

O endpoint real [`/pokedex/updated-johto/`](https://pokeapi.co/api/v2/pokedex/updated-johto/) foi conferido em 2026-09-26: `id=7`, 256 entradas, grupo `heartgold-soulsilver`. A lista completa de pares `(entry_number, pokemon_species.id)` do CSV foi comparada à resposta desse endpoint, sem divergência. A resposta ao vivo pode mudar; os links para CSV acima fixam a revisão reproduzível deste artefato.

## Resultado das verificações

- **Contagem e sequência:** 256 linhas, números inteiros e contíguos de 1 a 256; primeira entrada Chikorita (`species_id=152`), última Celebi (`species_id=251`).
- **Unicidade:** 256 números distintos e 256 IDs de Espécie distintos. Cada ID encontrou exatamente um nome inglês e exatamente um Pokémon padrão na revisão congelada.
- **Tipos:** todas as linhas têm um tipo primário; 112 têm segundo tipo. Os 17 tipos distintos pertencem à geração IV; nenhuma linha contém Fairy. Os `slot`s são 1 e, quando há segundo tipo, 2.
- **Histórico:** 13 entradas usam `past_types` com `generation_id=5`, pois seus tipos atuais foram alterados depois da geração IV. As demais usam `pokemon_types.csv`; alterações restritas à geração I não são aplicadas retroativamente à geração IV.
- **Integridade do artefato:** SHA-256 de `09-catalogo-regional.csv`: `54439C669905788CA95AC6321C8455B18128660C3DE6F4C49CB8508D8F44B280`.

Conferência pontual adicional dos endpoints reais em 2026-09-26:

| Entrada | Tipo atual na PokéAPI | `past_types` até geração V | Tipo registrado para SoulSilver |
| --- | --- | --- | --- |
| [Clefairy](https://pokeapi.co/api/v2/pokemon/clefairy/) `#041` | Fairy | Normal | Normal |
| [Togetic](https://pokeapi.co/api/v2/pokemon/togetic/) `#047` | Fairy/Flying | Normal/Flying | Normal/Flying |
| [Marill](https://pokeapi.co/api/v2/pokemon/marill/) `#132` | Water/Fairy | Water | Water |
| [Mr. Mime](https://pokeapi.co/api/v2/pokemon/mr-mime/) `#158` | Psychic/Fairy | Psychic | Psychic |
| [Magnemite](https://pokeapi.co/api/v2/pokemon/magnemite/) `#119` | Electric/Steel | Nenhum até geração V | Electric/Steel |
| [Chikorita](https://pokeapi.co/api/v2/pokemon/chikorita/) `#001` | Grass | Nenhum até geração V | Grass |

As demais nove entradas com substituição histórica são Cleffa `#040`, Clefable `#042`, Igglybuff `#043`, Jigglypuff `#044`, Wigglytuff `#045`, Togepi `#046`, Snubbull `#125`, Granbull `#126` e Azumarill `#133`; junto às quatro primeiras linhas alteradas da tabela, somam 13. Magnemite e Chikorita são controles sem substituição histórica.

## Limite para integração

`type_1` e `type_2` descrevem o Pokémon padrão associado à Espécie para **navegação catalográfica**. O dataset de produto deve manter separadas as Variantes jogáveis e seus tipos, bem como a Situação de disponibilidade. Um filtro da Pokédex regional pode usar estes tipos catalográficos conferidos; a seleção de Membro do time requer prova própria de obtenção no recorte de SoulSilver e não pode inferir elegibilidade deste CSV. Esta pesquisa também não audita a National Dex completa nem todos os candidatos da campanha.
