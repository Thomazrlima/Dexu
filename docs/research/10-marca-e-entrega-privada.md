# 10 — Fontes, assets Dexu e entrega privada

Conferido em 2026-09-26. Este inventário resolve a pesquisa do ticket 10; não autoriza publicação pública nem uso de arte Pokémon.

## Tipografia

| Família planejada | Origem verificável | Licença verificada | Estado no Dexu |
| --- | --- | --- | --- |
| Plus Jakarta Sans, títulos e controles | [Projeto dos autores](https://github.com/tokotype/PlusJakartaSans) e [distribuição Google Fonts](https://github.com/google/fonts/tree/main/ofl/plusjakartasans) | [SIL Open Font License 1.1 da família](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/OFL.txt) | Nenhum binário da fonte foi incorporado. O CSS declara a família e recua para `Inter` e fontes do sistema. |
| Inter, texto corrido | [Projeto dos autores](https://github.com/rsms/inter) e [distribuição Google Fonts](https://github.com/google/fonts/tree/main/ofl/inter) | [SIL Open Font License 1.1 da família](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) | Nenhum binário da fonte foi incorporado. O CSS recua para fontes do sistema. |

O repositório não contém `.woff`, `.woff2`, `.ttf` ou `.otf`. Assim, o nome no CSS **não garante** que a família seja exibida: somente uma instalação local do visitante poderia fornecê-la. Para distribuir os arquivos da fonte no futuro, escolher uma revisão concreta, registrar origem e manter o aviso de copyright e a licença junto da cópia. O [texto da OFL](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/OFL.txt) permite incorporação com software sob essas condições. Esta pesquisa documenta a licença e o fallback; não escolhe uma revisão de binários nem altera a interface.

## Assets existentes

Inspeção local dos arquivos PNG originais, sem alterar seus pixels:

| Arquivo | Dimensão | Canto superior esquerdo (ARGB) | Uso seguro |
| --- | ---: | --- | --- |
| `Logo.png` | 1536 × 1024 | `#FFFDFCFA` | Marca em superfície clara compatível; o fundo creme está dentro da imagem. |
| `Logo_Negativo.png` | 1536 × 1024 | `#FF091E3D` | Marca em superfície marinho compatível; o fundo escuro está dentro da imagem. |
| `Icon.png` | 1254 × 1254 | `#FFFEFDFD` | Ícone em superfície clara compatível; o fundo claro está dentro da imagem. |

Os quatro cantos de cada original têm alfa `FF`: não são PNGs transparentes. Também não há SVG de marca no repositório. Existem recortes transparentes derivados de `Logo.png` e `Icon.png` em `assets/visuals/`, usados na interface atual; eles não constituem um arquivo vetorial mestre ou uma versão oficial nova da identidade. Para novos formatos ou fundos, consultar quem mantém a marca antes de redesenhar ou supor que `Logo_Negativo.png` é transparente. Não usar capas, sprites ou artwork Pokémon sem autorização própria; o [aviso de licença dos sprites da PokéAPI](https://github.com/PokeAPI/sprites/blob/master/LICENCE.txt) atribui os direitos à The Pokémon Company.

## Entrega aos avaliadores

**Modo escolhido para este protótipo:** avaliação local no computador do avaliador, com os arquivos entregues por canal restrito e servidor vinculado apenas a `127.0.0.1`. Após instalar dependências com o lockfile, executar `npm run build` e `npx vite preview --host 127.0.0.1`. O [comando oficial `vite preview`](https://vite.dev/guide/cli) serve a saída estática do build; o endereço de loopback impede acesso direto por outras máquinas. O acesso aos arquivos entregues precisa ser controlado no canal de distribuição. A versão do protótipo ainda não tem autenticação e não deve ser hospedada em URL pública aberta.

Antes de cada avaliação, confirmar que o pacote entregue corresponde ao commit/revisão pretendido e que o navegador do avaliador abre somente o endereço local. Este modo não promete sincronização entre máquinas nem funcionamento offline da aplicação após o servidor ser desligado. Uma eventual hospedagem remota restrita exige revisão própria do controle de acesso antes de receber avaliadores.
