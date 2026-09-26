import { expect, test } from '@playwright/test'
import { auditDataset, type AuditDataset } from '../src/domain/dataset'
import { soulSilverDataset } from '../src/data/soulsilver'

test('a amostra auditada carrega sem depender da rede', () => {
  const dataset = auditDataset(soulSilverDataset)
  expect(dataset.manifest.gameVersion).toBe('soulsilver')
  expect(dataset.variants.some((variant) => variant.id === 'chikorita')).toBe(true)
  const golem = dataset.variantDecisions.find((decision) => decision.variantId === 'golem')!
  const tradePath = dataset.acquisitions.find((path) => golem.acquisitionIds.includes(path.id))!
  expect(tradePath.method).toBe('Evolução por troca')
  expect(tradePath.conditions).toContain('Geodude da Route 46')
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

test('learnset sem acesso até Red não pode integrar uma decisão de golpe elegível', () => {
  const mixedProof: AuditDataset = structuredClone(soulSilverDataset)
  mixedProof.learnset.push({
    id: 'chikorita-razor-leaf-after-red',
    variantId: 'chikorita',
    moveId: 'razor-leaf',
    method: 'tutor',
    conditions: 'Tutor disponível somente depois de Red.',
    versionGroup: 'heartgold-soulsilver',
    availableBeforeRed: false,
    evidenceIds: ['chikorita-moves'],
    methodEvidenceIds: [],
  })
  mixedProof.moveDecisions[0].learnsetIds.push('chikorita-razor-leaf-after-red')

  expect(() => auditDataset(mixedProof)).toThrow(/acesso|learnset|Red/i)
})
