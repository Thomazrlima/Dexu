import { expect, test } from '@playwright/test'
import { auditDataset } from '../src/domain/dataset'
import { soulSilverDataset } from '../src/data/soulsilver'

test('a amostra auditada carrega sem depender da rede', () => {
  const dataset = auditDataset(soulSilverDataset)
  expect(dataset.manifest.gameVersion).toBe('soulsilver')
  expect(dataset.variants.some((variant) => variant.id === 'chikorita')).toBe(true)
})

test('referência órfã e prova ausente rejeitam o conjunto inteiro', () => {
  const orphan = structuredClone(soulSilverDataset)
  orphan.variantDecisions[0].acquisitionIds = ['caminho-inexistente']
  expect(() => auditDataset(orphan)).toThrow(/caminho|referência/i)

  const noProof = structuredClone(soulSilverDataset)
  noProof.variantDecisions[0].evidenceIds = []
  expect(() => auditDataset(noProof)).toThrow(/evidência/i)
})

test('marco ou matriz histórica incorretos bloqueiam a carga', () => {
  const wrongCutoff = structuredClone(soulSilverDataset)
  Object.assign(wrongCutoff.manifest, { cutoff: 'after-red' })
  expect(() => auditDataset(wrongCutoff)).toThrow(/marco/i)

  const missingType = structuredClone(soulSilverDataset)
  Reflect.deleteProperty(missingType.typeChart.electric, 'ground')
  expect(() => auditDataset(missingType)).toThrow(/matriz/i)
})
