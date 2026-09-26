# 06 — Egg move, tutor e move reminder da amostra

Conferido em 2026-09-26. Métodos especiais só viram **Golpe elegível** quando a relação histórica e o caminho até o método existem na versão e antes de Red. A [matriz básica](05-golpes-basicos.md) mantém learnset e decisão separados.

## Cadeia de reprodução positiva: Hoothoot → Wing Attack

1. Capturar **Pidgey macho** de manhã ou de dia na Route 29 de SoulSilver. O [registro de encontros](https://pokeapi.co/api/v2/pokemon/pidgey/encounters) traz `walk` nessa rota e horários; a [auditoria de Route 29](https://www.serebii.net/pokearth/johto/route29.shtml) confirma a disponibilidade no início da campanha.
2. Treinar Pidgey, mantendo-o sem evoluir, até aprender **Wing Attack no nível 33**. O [learnset de Pidgey](https://pokeapi.co/api/v2/pokemon/pidgey/) associa `wing-attack`, `level-up`, nível 33 ao grupo `heartgold-soulsilver`. O nível alto não impede elegibilidade.
3. Capturar **Hoothoot fêmea** na mesma Route 29 à noite. [Encontros](https://pokeapi.co/api/v2/pokemon/hoothoot/encounters). [Espécie Pidgey](https://pokeapi.co/api/v2/pokemon-species/pidgey/) e [espécie Hoothoot](https://pokeapi.co/api/v2/pokemon-species/hoothoot/) têm grupo de ovos `flying` e ambos permitem machos/fêmeas (`gender_rate = 4`).
4. Deixar os dois no **Day Care da Route 34**, alcançado antes de Red. A [rota e o Day Care](https://bulbapedia.bulbagarden.net/wiki/Johto_Route_34) e o [guia de criação HGSS](https://www.serebii.net/heartgoldsoulsilver/breeding.shtml) dão o local/método. O [learnset de Hoothoot](https://pokeapi.co/api/v2/pokemon/hoothoot/) registra `wing-attack` como `egg` no grupo HGSS; a [lista Gen IV de cadeias](https://www.serebii.net/pokedex-dp/egg/163.shtml) confirma o golpe como egg move do filhote.

**Decisão:** Wing Attack no Hoothoot nascido dessa cadeia é **elegível**; a relação `egg` isolada não era suficiente. Registrar no futuro dataset os dois progenitores, sexos, grupo, origem em SoulSilver, aprendizado do pai, Day Care e data das fontes. Não presumir que um Hoothoot capturado já conhece Wing Attack.

## Tutor e reminder

| Variante → golpe | Relação / serviço | Acesso temporal e condição | Decisão |
| --- | --- | --- | --- |
| Wooper → Headbutt | `tutor` no grupo HGSS em [Wooper](https://pokeapi.co/api/v2/pokemon/wooper/) | Tutor **gratuito em Ilex Forest**, caminho de Johto antes de Red, na [lista de tutores HGSS](https://www.serebii.net/heartgoldsoulsilver/movetutors.shtml). Wooper da Route 32 vem da [amostra](03-amostra-minima.md). | **Elegível** por tutor de Ilex Forest. Não usar a existência de outros tutores para inferir seus custos ou acesso. |
| Vulpix → Ember | `level-up` no nível 1 em [Vulpix](https://pokeapi.co/api/v2/pokemon/vulpix/) | Se o golpe foi substituído, o **Move Reminder de Blackthorn City** reaprende golpes de nível anteriores mediante **Heart Scale**, conforme [Blackthorn HGSS](https://www.serebii.net/pokearth/johto/blackthorncity.shtml) e [guia do item](https://www.serebii.net/itemdex/heartscale.shtml), que lista fontes em Johto antes de Red. | **Elegível também pelo reminder**, para Vulpix já elegível. Registrar Blackthorn e custo; não criar uma relação `reminder` falsa no learnset da API. |

O acesso a Blackthorn e às fontes de Heart Scale de Johto ocorre antes do primeiro confronto com Red. Esta pesquisa prova **um** caminho de recurso individual, sem prometer Heart Scales suficientes para todos os membros do mesmo save.

## Relações que não entram como opções

- [Wooper → Recover](https://pokeapi.co/api/v2/pokemon/wooper/) consta como `egg` no grupo HGSS, mas aqui não há cadeia completa de pais originários de SoulSilver que passe Recover. Situação: **ainda não verificado**, não comprovadamente indisponível.
- Tutores do **Battle Frontier** aparecem na [lista HGSS](https://www.serebii.net/heartgoldsoulsilver/movetutors.shtml), mas nenhum golpe da amostra foi promovido por essa rota sem auditar Battle Points, compatibilidade individual e o período de acesso. A presença de `tutor` na API não identifica por si só qual NPC ensina o golpe.
- O presente de **Togepi com Extrasensory** na [lista de presentes HGSS](https://www.serebii.net/heartgoldsoulsilver/gift.shtml) é um golpe do exemplar de presente. Não o apresentar como prova de cadeia reproduzível de egg move para qualquer Togepi.

O ticket 11 deve codificar só as decisões positivas com todas as condições e proveniência, mantendo lacunas fora das opções selecionáveis. Nenhuma relação usa parceiro transferido, evento, Pokéwalker ou pós-Red.
