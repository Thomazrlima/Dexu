import { defineConfig } from 'vite'
import { auditDataset } from './src/domain/dataset'
import { soulSilverDataset } from './src/data/soulsilver'

const datasetPath = '/datasets/soulsilver-sample.json'

export default defineConfig({
  plugins: [{
    name: 'audited-soulsilver-sample',
    buildStart() {
      auditDataset(soulSilverDataset)
    },
    configureServer(server) {
      server.middlewares.use(datasetPath, (_request, response) => {
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.setHeader('Cache-Control', 'no-store')
        response.end(JSON.stringify(soulSilverDataset))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: datasetPath.slice(1), source: JSON.stringify(soulSilverDataset) })
    },
  }],
})
