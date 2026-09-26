# Fontes e protocolo de evidências — SoulSilver até antes de Red

**Ticket:** 02 — Protocolo de fontes e evidências de SoulSilver  
**Conferência das fontes:** 26/09/2026  
**Estado:** pesquisa de base; não é dataset auditado nem autorização para oferecer qualquer opção na interface.

## Recorte e hierarquia da prova

O objeto de cada decisão é uma **Variante jogável**, habilidade, Caminho de obtenção ou Golpe elegível em **SoulSilver**, até imediatamente antes do primeiro confronto com Red. Johto e Kanto contam, inclusive o período após a primeira passagem dos créditos. HeartGold pode compartilhar regras por **Grupo de versões**, mas um registro só de HeartGold não prova disponibilidade em SoulSilver. A [especificação aprovada](../spec-prototipo-privado-soulsilver.md), o [vocabulário](../../CONTEXT.md), o [ADR 0002](../adr/0002-dados-auditados-para-a-campanha.md) e o [ADR 0005](../adr/0005-separar-catalogo-learnset-e-elegibilidade.md) fixam esta política.

Para decidir o marco, a [retrospectiva oficial de Johto da The Pokémon Company](https://www.pokemon.com/fr/actus-pokemon/celebrons-les-25-ans-de-pokemon-en-nous-replongeant-dans-ces-instants-memorables-passes-dans-la-region-de-johto/) descreve a visita a Kanto após a Liga e Red no Monte Prateado depois das insígnias de Johto e Kanto. É uma descrição geral da aventura, não um calendário de desbloqueio para cada item, rota ou serviço.

Usar a [documentação da PokéAPI](https://pokeapi.co/docs/v2) e as respostas abaixo para **identificadores, catálogo e relações candidatas**. Para um caminho de campanha, cruzar a relação com documentação do próprio jogo, material oficial ou outra fonte verificável que indique versão, método, condição e acesso temporal. O [manual oficial de SoulSilver hospedado pela Nintendo](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver) é fonte primária para mecânicas gerais, mas não enumera todos os Pokémon e golpes. Não converter ausência na PokéAPI, presença na Pokédex ou presença no learnset em veredito de elegibilidade. Respostas da API são mutáveis; as observações abaixo registram data e localizadores, não um snapshot imutável.

## Respostas reais conferidas

Consultas HTTP GET à PokéAPI em 26/09/2026; identificadores e trechos selecionados foram transcritos das respostas. Os links abrem os recursos integrais. O slug da versão individual é `soulsilver`, **sem hífen**.

| Recurso e campo consultado | Resultado observado | O que permite concluir |
| --- | --- | --- |
| [`version/soulsilver/`](https://pokeapi.co/api/v2/version/soulsilver/) → `id`, `name`, `version_group.name` | `16`, `soulsilver`, `heartgold-soulsilver` | Identidade da versão individual e vínculo com o grupo; não informa disponibilidade de espécie. |
| [`version-group/heartgold-soulsilver/`](https://pokeapi.co/api/v2/version-group/heartgold-soulsilver/) → `id`, `generation.name`, `versions`, `pokedexes`, `regions`, `move_learn_methods` | `10`, `generation-iv`, versões `heartgold` e `soulsilver`, Pokédex `updated-johto`, regiões `johto` e `kanto`; métodos `level-up`, `egg`, `tutor`, `machine`, `light-ball-egg`, `form-change` | O grupo organiza relações compartilhadas; a lista de métodos não prova acesso a cada tutor, item ou cadeia. |
| [`pokedex/updated-johto/`](https://pokeapi.co/api/v2/pokedex/updated-johto/) → `id`, `pokemon_entries`, `version_groups` | `7`; 256 entradas; nº 1 `chikorita`, nº 2 `bayleef`, nº 3 `meganium`, nº 255 `mew`, nº 256 `celebi`; grupo `heartgold-soulsilver` | Numeração de catálogo, inclusive entradas cuja obtenção interna não está provada. O catálogo ainda exige revisão própria de nomes e tipos históricos antes de uso no produto. |
| [`pokemon/chikorita/`](https://pokeapi.co/api/v2/pokemon/chikorita/) → `moves[*].version_group_details` para `heartgold-soulsilver` | `tackle`: `level-up`, nível 1; `razor-leaf`: `level-up`, nível 6; `cut`: `machine`, nível 0; `vine-whip`: `egg`, nível 0 | Relações de learnset. O nível 0 identifica método sem nível, não a posse do TM/HM nem uma cadeia de reprodução. |
| [`pokemon/vulpix/`](https://pokeapi.co/api/v2/pokemon/vulpix/) → mesmo filtro | `ember`: `level-up`, nível 1; `flamethrower`: `level-up`, nível 24 **e** `machine`, nível 0; `dig`: `machine`, nível 0 | Um golpe pode ter caminhos diferentes. O caminho por nível não deve ser invalidado por falta de prova do TM; o caminho por TM precisa de prova separada. |
| [`pokemon/hoothoot/encounters`](https://pokeapi.co/api/v2/pokemon/hoothoot/encounters) → `johto-route-29-area`, `version_details[soulsilver]`, `encounter_details` | `walk`, condição `time-night`, níveis 2–4 em registros distintos; há também registros `headbutt` nessa área | Relação de encontro específica de versão e horário. Não misturar condições de registros diferentes. |
| [`pokemon/vulpix/encounters`](https://pokeapi.co/api/v2/pokemon/vulpix/encounters) e [`pokemon/growlithe/encounters`](https://pokeapi.co/api/v2/pokemon/growlithe/encounters) → `johto-route-36-area` | Vulpix: `soulsilver`, `walk`, nível 13 sem condição e nível 15 com `time-day`; Growlithe: os registros correspondentes são de `heartgold` | O mesmo grupo não autoriza copiar um encontro para a outra versão. O registro sem condição não deve ser chamado de exclusivamente diurno. |

O endpoint de encontro agrega entradas por área, com `version_details` e `encounter_details`; a condição pertence a **cada detalhe**. O endpoint de Pokémon agrega golpes de muitos jogos; filtrar `version_group_details` antes de interpretar qualquer método. A [documentação dos modelos da PokéAPI](https://pokeapi.co/docs/v2#pokemon) define esses campos, e o [manual oficial, página PDF 4](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver) confirma que o relógio do DS afeta eventos dependentes do tempo.

Para repetir as conferências sem interpretar uma resposta inteira a olho, consultar os URLs acima e filtrar os campos aninhados. Exemplo em PowerShell:

```powershell
$pokemon = Invoke-RestMethod 'https://pokeapi.co/api/v2/pokemon/chikorita/'
$pokemon.moves | ForEach-Object {
  $move = $_.move.name
  $_.version_group_details |
    Where-Object { $_.version_group.name -eq 'heartgold-soulsilver' } |
    ForEach-Object { [pscustomobject]@{ move = $move; method = $_.move_learn_method.name; level = $_.level_learned_at } }
}
$encounters = Invoke-RestMethod 'https://pokeapi.co/api/v2/pokemon/hoothoot/encounters'
$route29 = $encounters | Where-Object { $_.location_area.name -eq 'johto-route-29-area' }
$route29.version_details |
  Where-Object { $_.version.name -eq 'soulsilver' } |
  ForEach-Object { $_.encounter_details } |
  Select-Object method, condition_values, min_level, max_level
```

## Fontes complementares e lacunas

| Fonte primária | Evidência aproveitável | Limite para a auditoria |
| --- | --- | --- |
| [Manual oficial SoulSilver da Nintendo](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver), páginas PDF 4, 9–11 | Página PDF 4: Professor Elm entrega um Pokémon no começo da jornada. Página PDF 9: Safari Zone tem áreas, testes do Warden e objetos que alteram encontros; TM é de uso único e HM é reutilizável. Página PDF 10: Pal Park migra Pokémon de jogos GBA depois do Champion. Página PDF 11: troca pode causar evolução. | Não enumera encontros específicos de Safari, itens, espécies evoluídas por troca ou acesso exato de cada serviço antes de Red. “Depois do Champion” ainda é antes de Red; a migração é excluída por **origem externa**, não por data. |
| [Página oficial de HeartGold/SoulSilver da The Pokémon Company](https://www.pokemon.com/us/pokemon-video-games/pokemon-heartgold-and-soulsilver-versions) | Identifica Chikorita, Cyndaquil e Totodile como iniciais; explica que o Pokéwalker pode encontrar Pokémon e itens. | Texto de apresentação, sem condições completas de obtenção. Pokéwalker existe, mas está fora da política do protótipo. |
| [Retrospectiva oficial de Johto da The Pokémon Company](https://www.pokemon.com/fr/actus-pokemon/celebrons-les-25-ans-de-pokemon-en-nous-replongeant-dans-ces-instants-memorables-passes-dans-la-region-de-johto/) | Liga → Kanto → insígnias → Red, em linhas gerais. | Não determina se um método concreto é desbloqueado antes ou após o primeiro confronto. Confirmar cronologia do caminho específico. |

Para **presente, troca com personagem, Safari por espécie/área/blocos/dias, tutor, reminder, TM/HM, reprodução e pré-evolução**, localizar uma fonte com a condição exata e conferir sua posição na campanha. A documentação oficial acima sustenta mecânicas gerais, não todas essas afirmações particulares. Se a fonte exata não for obtida, manter a relação `ainda não verificada`. Para egg move, provar a cadeia inteira sob a política de origem SoulSilver; para golpe retido, provar o aprendizado na pré-evolução elegível e a possibilidade de evoluir conservando-o. Para habilidade, provar variante e disponibilidade da habilidade separadamente do efeito defensivo.

## Registro mínimo de cada afirmação

Cada linha de auditoria futura deve registrar:

1. **Sujeito e contexto:** IDs estáveis de espécie e Variante jogável; se aplicável, habilidade ou golpe; `soulsilver`, grupo `heartgold-soulsilver`, geração IV e marco “antes do primeiro Red”.
2. **Afirmação delimitada:** obtenção da variante, relação de learnset, acesso ao método, habilidade, ou exclusão de um caminho. Nunca substituir essas afirmações por um único booleano da Espécie.
3. **Caminho e condições:** origem do precursor, local, método, hora/dia, item, NPC, evolução/troca, reprodução, pré-evolução, tutor ou TM/HM; ponto de desbloqueio em relação a Red. Separar caminhos alternativos.
4. **Evidência reabrível:** organização e tipo de fonte, URL direta, campo JSON ou página/seção, data da conferência, resumo fiel do trecho, conclusão que ele sustenta e eventuais conflitos. Registrar revisor e data de revisão independente quando a relação virar dado de produto.
5. **Decisão por afirmação:** `elegível` somente com ao menos um caminho interno positivo e temporalmente aceito; `comprovadamente indisponível` somente quando a exclusão cobre os caminhos relevantes da variante com prova; `ainda não verificada` quando falta prova, há conflito ou a enumeração é incompleta. A espécie herda elegibilidade se alguma variante é positiva e indisponibilidade somente se todas as variantes relevantes foram descartadas. A decisão de golpe requer **learnset + acesso**. Preservar motivo e condições de cada decisão.

Uma prova negativa exige escopo explícito. “O encontro registrado de Growlithe na Route 36 é de HeartGold” rejeita **aquele caminho em SoulSilver**; não prova que Growlithe seja globalmente impossível por todos os outros caminhos. Não confundir falta de linha de API com prova de ausência. Se uma correção futura invalidar escolha salva, `inválida após revalidação` descreve o estado do Time, não um quarto estado permanente da espécie.

## Exemplos para revisão independente

| Tipo | Afirmação e fontes | Decisão nesta pesquisa |
| --- | --- | --- |
| Positivo | Um dos iniciais, como Chikorita, pode ser escolhido no início de SoulSilver: [manual, página PDF 4](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver) mostra o presente de Elm no início, e a [página oficial do jogo](https://www.pokemon.com/us/pokemon-video-games/pokemon-heartgold-and-soulsilver-versions) identifica Chikorita entre os iniciais. | **Caminho positivo documentado** para a variante comum de Chikorita, sujeito à revisão independente do dataset. A [Pokédex nº 1](https://pokeapi.co/api/v2/pokedex/updated-johto/) é apenas conferência de catálogo. |
| Positivo condicionado | [Hoothoot, encontro da Route 29](https://pokeapi.co/api/v2/pokemon/hoothoot/encounters): SoulSilver, `walk`, `time-night`. O [manual, página PDF 4](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver) situa a saída de New Bark Town no começo e confirma eventos ligados ao relógio. | **Candidato positivo**, mas registrar separadamente confirmação da posição exata da Route 29 na progressão antes de promover ao dataset. A inferência temporal não veio do endpoint de encontro. |
| Negativo delimitado | [Growlithe, encontros](https://pokeapi.co/api/v2/pokemon/growlithe/encounters): Route 36 aparece em `heartgold`; [Vulpix, encontros](https://pokeapi.co/api/v2/pokemon/vulpix/encounters) mostra o correspondente `soulsilver`. | **Rejeitar a alegação “Growlithe por encontro da Route 36 em SoulSilver”**. A espécie Growlithe permanece `ainda não verificada` até examinar todos os demais caminhos, inclusive reprodução e trocas internas, se pertinentes. |
| Negativo por política | [Manual, página PDF 10](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver): Pal Park migra de cartuchos GBA; [página oficial](https://www.pokemon.com/us/pokemon-video-games/pokemon-heartgold-and-soulsilver-versions): Pokéwalker permite novos encontros. | Ambos os **caminhos são excluídos** pela política aprovada mesmo quando cronologicamente acessíveis. A espécie não se torna indisponível se houver outro caminho interno aceito. |
| Incerto | [Chikorita `vine-whip` como `egg` no learnset HGSS](https://pokeapi.co/api/v2/pokemon/chikorita/). | **Golpe ainda não verificado**: falta cadeia de reprodução demonstrada em SoulSilver antes de Red. A relação histórica por si só não permite oferecê-lo. |
| Incerto | [Vulpix `flamethrower`](https://pokeapi.co/api/v2/pokemon/vulpix/) tem `level-up` 24 e `machine` 0 no grupo HGSS. | O caminho por nível é candidato independente; **acesso ao TM ainda não verificado** nesta pesquisa. Não juntar as duas provas em um método fictício. |

Estes exemplos testam o protocolo, não selecionam a amostra do produto. Antes de popular o conjunto real, outra pessoa deve reabrir os URLs, conferir os campos/páginas e condições, procurar caminhos alternativos e registrar o resultado da revisão. Não há, nesta pesquisa curta, prova exaustiva suficiente para classificar uma **espécie inteira** como `comprovadamente indisponível`.

**Revisão independente em 26/09/2026:** uma segunda consulta aos endpoints acima confirmou `soulsilver` no grupo `heartgold-soulsilver`, oito detalhes `walk` + `time-night` de Hoothoot na Route 29, zero detalhes `soulsilver` de Growlithe na Route 36 e uma relação `egg` de `vine-whip` para Chikorita no grupo HGSS. A revisão valida apenas esses exemplos delimitados; não substitui a revisão de todos os caminhos da futura amostra do produto.

## Exclusões e próxima porta de auditoria

- **Outra versão:** registros só de `heartgold`, Diamond/Pearl/Platinum ou outro jogo não servem como obtenção em `soulsilver`. O grupo ajuda a localizar regras e learnsets, não elimina a verificação da versão.
- **Transferência/troca externa:** Pal Park, cartucho GBA, GTS e recebimento de espécie originária de outra versão não são caminhos aceitos. Evoluir por troca um precursor obtido em SoulSilver continua potencialmente aceito; [manual, página PDF 11](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_SoulSilver) confirma a mecânica, e a origem do precursor precisa ser provada.
- **Evento e Pokéwalker:** não aceitar distribuição externa nem encontros do acessório, embora o [site oficial](https://www.pokemon.com/us/pokemon-video-games/pokemon-heartgold-and-soulsilver-versions) confirme que o acessório encontra Pokémon. Não inferir que entrada catalogada como Celebi seja obtível internamente.
- **Pós-Red:** excluir somente caminhos cujo desbloqueio específico seja demonstrado como posterior ao primeiro confronto; “pós-Liga” e Kanto, por si, **não** são pós-Red, conforme o [recorte aprovado](../spec-prototipo-privado-soulsilver.md) e a [cronologia oficial geral](https://www.pokemon.com/fr/actus-pokemon/celebrons-les-25-ans-de-pokemon-en-nous-replongeant-dans-ces-instants-memorables-passes-dans-la-region-de-johto/).

**Porta para o próximo ticket:** escolher a amostra somente após auditar caminhos concretos diversos e registrar uma matriz de cobertura e lacunas. Nenhuma consulta em tempo de uso à PokéAPI e nenhum fallback de elegibilidade por learnset bruto.
