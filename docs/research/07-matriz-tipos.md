# 07 — Matriz histórica de efetividade de tipos em SoulSilver

**Conferido em:** 2026-09-26

**Contexto:** SoulSilver, geração IV. A relação abaixo vale para um tipo de golpe atacante e um tipo natural defensor, antes de habilidades, itens, condições ou efeitos de golpe. Não é cálculo de dano nem inclui STAB.

## Fontes e método

- [PokéAPI — `types.csv`](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/types.csv): identificadores 1–17 e nomes dos tipos presentes na geração IV; Fairy começa na geração VI. Os IDs 10001/10002 (`unknown`/`shadow`) não são tipos naturais do gráfico de batalha deste recorte.
- [PokéAPI — `type_efficacy.csv`](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/type_efficacy.csv): fator por par `damage_type_id,target_type_id`. A tabela corrente tem 18×18 pares e fator percentual 0, 50, 100 ou 200.
- [PokéAPI — `type_efficacy_past.csv`](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/type_efficacy_past.csv): substituições históricas. As linhas de `generation_id=5` são Ghost (8) → Steel (9) = 50 e Dark (17) → Steel (9) = 50. A documentação da [API de Type](https://pokeapi.co/docs/v2#types) descreve `past_damage_relations` como relações anteriores, com o último período de validade. Para a geração IV, aplicam-se essas duas substituições; as linhas de `generation_id=1` pertencem a um período anterior e não se aplicam.
- [Pokémon Showdown — tabela da geração V](https://github.com/smogon/pokemon-showdown/blob/master/data/mods/gen5/typechart.ts): conferência independente das duas resistências antigas de Steel (`Ghost: 2` e `Dark: 2` no campo `damageTaken`, cuja [codificação](https://github.com/smogon/pokemon-showdown/blob/master/sim/dex-data.ts) `2` significa resistência). O repositório do simulador é uma implementação separada da PokéAPI. Esta conferência não substitui a fonte de SoulSilver.

O procedimento foi tomar os pares de IDs 1–17 da tabela corrente, dividir `damage_factor` por 100, e substituir os dois pares Steel acima pelo valor histórico. Fairy e demais tipos posteriores ficaram fora. Cada linha abaixo é um tipo **atacante**; cada coluna é um tipo **defensor**. O valor 1 indica neutralidade explícita.

## Matriz completa (17 × 17)

| Ataque ↓ / defesa → | Normal | Fighting | Flying | Poison | Ground | Rock | Bug | Ghost | Steel | Fire | Water | Grass | Electric | Psychic | Ice | Dragon | Dark |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Normal | 1 | 1 | 1 | 1 | 1 | 0.5 | 1 | 0 | 0.5 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Fighting | 2 | 1 | 0.5 | 0.5 | 1 | 2 | 0.5 | 0 | 2 | 1 | 1 | 1 | 1 | 0.5 | 2 | 1 | 2 |
| Flying | 1 | 2 | 1 | 1 | 1 | 0.5 | 2 | 1 | 0.5 | 1 | 1 | 2 | 0.5 | 1 | 1 | 1 | 1 |
| Poison | 1 | 1 | 1 | 0.5 | 0.5 | 0.5 | 1 | 0.5 | 0 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 |
| Ground | 1 | 1 | 0 | 2 | 1 | 2 | 0.5 | 1 | 2 | 2 | 1 | 0.5 | 2 | 1 | 1 | 1 | 1 |
| Rock | 1 | 0.5 | 2 | 1 | 0.5 | 1 | 2 | 1 | 0.5 | 2 | 1 | 1 | 1 | 1 | 2 | 1 | 1 |
| Bug | 1 | 0.5 | 0.5 | 0.5 | 1 | 1 | 1 | 0.5 | 0.5 | 0.5 | 1 | 2 | 1 | 2 | 1 | 1 | 2 |
| Ghost | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 0.5 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 0.5 |
| Steel | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 0.5 | 0.5 | 0.5 | 1 | 0.5 | 1 | 2 | 1 | 1 |
| Fire | 1 | 1 | 1 | 1 | 1 | 0.5 | 2 | 1 | 2 | 0.5 | 0.5 | 2 | 1 | 1 | 2 | 0.5 | 1 |
| Water | 1 | 1 | 1 | 1 | 2 | 2 | 1 | 1 | 1 | 2 | 0.5 | 0.5 | 1 | 1 | 1 | 0.5 | 1 |
| Grass | 1 | 1 | 0.5 | 0.5 | 2 | 2 | 0.5 | 1 | 0.5 | 0.5 | 2 | 0.5 | 1 | 1 | 1 | 0.5 | 1 |
| Electric | 1 | 1 | 2 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 2 | 0.5 | 0.5 | 1 | 1 | 0.5 | 1 |
| Psychic | 1 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | 0.5 | 1 | 1 | 1 | 1 | 0.5 | 1 | 1 | 0 |
| Ice | 1 | 1 | 2 | 1 | 2 | 1 | 1 | 1 | 0.5 | 0.5 | 0.5 | 2 | 1 | 1 | 0.5 | 2 | 1 |
| Dragon | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 1 |
| Dark | 1 | 0.5 | 1 | 1 | 1 | 1 | 1 | 2 | 0.5 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 0.5 |

## Uso com dois tipos defensores

Para tipos naturais distintos `A` e `B`, multiplica-se `matriz[ataque,A] × matriz[ataque,B]`. Um defensor de um só tipo usa apenas uma célula; não se multiplica um tipo por ele mesmo. Exemplos conferíveis na matriz:

| Resultado | Ataque → defesa | Conta |
| --- | --- | --- |
| 0 | Electric → Ground/Water | `0 × 2 = 0` |
| 0.25 | Ice → Water/Ice | `0.5 × 0.5 = 0.25` |
| 0.5 | Ghost → Steel | `0.5` (resistência histórica) |
| 1 | Fire → Water/Grass | `0.5 × 2 = 1` |
| 2 | Electric → Water | `2` |
| 4 | Electric → Water/Flying | `2 × 2 = 4` |

Esses valores são **naturais**. Uma habilidade que introduza imunidade ou altere dano exige evidência e apresentação separadas, conforme a spec. O fator 0 sempre prevalece no produto de dois tipos.

## Divergências históricas e conferência

- Da geração VI em diante, Ghost → Steel e Dark → Steel passaram de 0.5 para 1. Copiar a relação atual da PokéAPI sem `type_efficacy_past.csv` erraria precisamente essas duas células para SoulSilver.
- Fairy surge na geração VI e não integra as 17 linhas ou colunas de SoulSilver. Relações modernas com Fairy não foram projetadas retrospectivamente para a geração IV.
- Conferência estrutural: 17 linhas de ataque × 17 colunas de defesa = **289 pares**, todos com valor em `{0, 0.5, 1, 2}`. Contagem: **7** pares com 0, **57** com 0.5, **179** com 1 e **46** com 2; soma 289.
- Conferência independente das imunidades: Normal → Ghost, Fighting → Ghost, Poison → Steel, Ground → Flying, Ghost → Normal, Electric → Ground e Psychic → Dark são as sete células 0. Isso confere a contagem sem depender da soma geral.
- Conferência dirigida das alterações históricas: Ghost → Steel = 0.5 e Dark → Steel = 0.5, coerentes com as linhas da PokéAPI e com a tabela independente da geração V. Como controle, Steel → Ghost = 1 e Steel → Dark = 1: a relação tem direção.

**Limite da auditoria:** esta matriz audita somente efetividade entre tipos naturais em condições normais. Não afirma disponibilidade de Pokémon ou golpes na campanha, nem resolve dano, STAB, habilidades, efeitos de golpe ou exceções de batalha. A incorporação ao dataset e os cálculos de cobertura pertencem a tickets posteriores.
