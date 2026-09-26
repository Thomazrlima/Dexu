# 05 — Level-up, TM/HM e golpe retido de pré-evolução

Conferido em 2026-09-26. Uma relação de **Learnset** do grupo `heartgold-soulsilver` descreve compatibilidade histórica; a decisão **Golpe elegível** exige também caminho de obtenção do Pokémon e acesso ao método em SoulSilver antes de Red. Esta tabela audita poucos caminhos da [amostra](03-amostra-minima.md) e sua [ampliação](04-obtencao-e-variantes.md); não enumera todos os golpes dessas espécies.

| Variante → golpe | Relação bruta de Learnset | Prova complementar do método no recorte | Decisão desta pesquisa |
| --- | --- | --- | --- |
| Chikorita → Razor Leaf | `level-up`, nível 6 em [Chikorita](https://pokeapi.co/api/v2/pokemon/chikorita/) | Chikorita vem do presente inicial em [New Bark](https://pokeapi.co/api/v2/pokemon/chikorita/encounters); treinamento antes de Red é possível. | **Elegível**, por level-up. |
| Hoothoot → Peck | `level-up`, nível 9 em [Hoothoot](https://pokeapi.co/api/v2/pokemon/hoothoot/) | Hoothoot pode ser capturado à noite na [Route 29](https://www.serebii.net/pokearth/johto/route29.shtml). | **Elegível**, por level-up. |
| Wooper → Mud Shot | `level-up`, nível 9 em [Wooper](https://pokeapi.co/api/v2/pokemon/wooper/) | Wooper pode ser capturado à noite na [Route 32](https://www.serebii.net/pokearth/johto/route32.shtml). | **Elegível**, por level-up. |
| Eevee → Shadow Ball | `machine` em [Eevee](https://pokeapi.co/api/v2/pokemon/eevee/) | Presente de Bill em [Goldenrod](https://www.serebii.net/heartgoldsoulsilver/gift.shtml); **TM30** é recompensa do Ginásio de Ecruteak na [lista HGSS de TMs](https://www.serebii.net/heartgoldsoulsilver/tmhm.shtml), antes de Red. | **Elegível**, por TM30; TM é consumível, sem garantia de exemplares para vários membros. |
| Wooper → Surf | `machine` em [Wooper](https://pokeapi.co/api/v2/pokemon/wooper/) | **HM03** é recebido após ajudar a Kimono Girl no Dance Theater de Ecruteak na [lista HGSS de HMs](https://www.serebii.net/heartgoldsoulsilver/tmhm.shtml). O [manual oficial, p. 17](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver#page=9) distingue ensinar HM de usar sua capacidade no campo. | **Elegível**, por HM03; capacidade de atravessar água depende da Fog Badge para uso em campo. |
| Chikorita → Cut | `machine` em [Chikorita](https://pokeapi.co/api/v2/pokemon/chikorita/) | **HM01** é encontrado em Ilex Forest após recuperar os Farfetch'd na [lista HGSS de HMs](https://www.serebii.net/heartgoldsoulsilver/tmhm.shtml), antes de Red. | **Elegível**, por HM01; capacidade de cortar arbustos é separada do aprendizado do golpe. |
| Espeon → Bite | Espeon **não** traz Bite no learnset `heartgold-soulsilver` em [Espeon](https://pokeapi.co/api/v2/pokemon/espeon/); [Eevee](https://pokeapi.co/api/v2/pokemon/eevee/) traz `level-up` no nível 29. | Eevee de Bill aprende Bite antes da evolução; com amizade ≥220, subir de nível **de dia** para Espeon e reter o golpe. [Origem e evolução](04-obtencao-e-variantes.md), [Eevee Gen IV](https://www.serebii.net/pokedex-dp/133.shtml), [limiar histórico](https://bulbapedia.bulbagarden.net/wiki/Friendship_evolution). | **Elegível pelo precursor comprovado**, condicionado a aprender Bite **antes** da evolução. Não promover Bite como learnset nativo de Espeon. |

**Contraexemplo:** [Wooper](https://pokeapi.co/api/v2/pokemon/wooper/) tem `recover` com método `egg` no grupo HGSS. Isso é uma relação candidata, não um Golpe elegível por level-up/TM/HM. A [pesquisa de métodos especiais](06-golpes-especiais.md) ainda não encontrou uma cadeia de reprodução interna completa para Recover; a relação permanece **ainda não verificada**, sem prova de indisponibilidade.

## HM → Capacidade de campo

O [manual oficial, p. 18](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver#page=10) lista as capacidades no campo e distingue o requisito de insígnia para seu uso; a [lista HGSS de máquinas](https://www.serebii.net/heartgoldsoulsilver/tmhm.shtml) fixa os números e locais. Esta é uma **auditoria do mapeamento**, não uma oferta automática de todos os HMs a todas as variantes.

| HM | Golpe | Capacidade de campo |
| --- | --- | --- |
| HM01 | Cut | Cortar árvore pequena |
| HM02 | Fly | Voltar a uma cidade visitada |
| HM03 | Surf | Atravessar água |
| HM04 | Strength | Empurrar rochas pesadas |
| HM05 | Whirlpool | Atravessar redemoinhos |
| HM06 | Rock Smash | Quebrar rochas |
| HM07 | Waterfall | Subir cachoeiras |
| HM08 | Rock Climb | Escalar paredes rochosas |

`Flash` é uma capacidade de campo descrita no manual, mas em HGSS é **TM70**, não um dos oito HMs. Nesta pesquisa, só as combinações **Chikorita/Cut** e **Wooper/Surf** foram auditadas como golpes oferecíveis e capacidades correspondentes. Compatibilidade individual, obtenção antes de Red e insígnias dos demais pares HM/variante permanecem lacunas até a auditoria respectiva. O Dexu poderá mostrar HM presente ou ausente no moveset sem prever se uma rota está liberada.
