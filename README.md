# Dexu

Primeira fatia do protótipo privado: seleção visual de jogos e entrada na área SoulSilver. Somente SoulSilver abre uma área; criar time, times salvos e Pokédex estão sinalizados como etapas futuras.

## Executar localmente

Requer Node.js 20. Execute `npm ci` e depois `npm run dev`. Abra o endereço local mostrado pelo Vite. A rota `/soulsilver` também pode ser aberta diretamente no servidor de desenvolvimento.

## Verificar

- `npm run typecheck`: verifica TypeScript.
- `npm test`: executa o smoke de navegador em Chrome nas larguras de celular e desktop. Requer Chrome instalado.
- `npm run build`: verifica TypeScript e gera os arquivos estáticos em `dist/`.

Os assets de marca são os arquivos já presentes na raiz. Plus Jakarta Sans e Inter permanecem em fallback local porque os arquivos e suas licenças ainda não foram confirmados. A distribuição do protótipo deve continuar restrita; esta fatia não inclui autenticação.
