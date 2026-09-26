import { expect, test } from '@playwright/test'
import { soulSilverDataset } from '../src/data/soulsilver'
import { auditDataset, type AuditDataset } from '../src/domain/dataset'
import { analyzeTeam, changeTeam, createTeam, moveOptions } from '../src/domain/team'

function createFullChikoritaTeam(dataset: AuditDataset, withMove: boolean) {
  let team = createTeam('Time completo', dataset)
  for (let index = 0; index < 6; index++) {
    team = changeTeam(team, dataset, { type: 'add-member', variantId: 'chikorita' })
    const memberId = team.members[index].id
    team = changeTeam(team, dataset, { type: 'choose-ability', memberId, abilityId: 'overgrow' })
    if (withMove) team = changeTeam(team, dataset, { type: 'toggle-move', memberId, moveId: 'razor-leaf' })
  }
  return team
}

test('Time aceita seis membros, inclusive espécie repetida, e impede o sétimo', () => {
  let team = createTeam('Johto', soulSilverDataset)
  for (let index = 0; index < 6; index++) team = changeTeam(team, soulSilverDataset, { type: 'add-member', variantId: 'hoothoot' })
  expect(team.members).toHaveLength(6)
  expect(new Set(team.members.map((member) => member.id)).size).toBe(6)
  expect(() => changeTeam(team, soulSilverDataset, { type: 'add-member', variantId: 'unknown' })).toThrow(/elegível|amostra/i)
  expect(() => changeTeam(team, soulSilverDataset, { type: 'add-member', variantId: 'hoothoot' })).toThrow(/seis/i)
})

test('troca de variante preserva habilidade e golpe antigos com motivo, sem creditá-los', () => {
  let team = createTeam('Teste', soulSilverDataset)
  team = changeTeam(team, soulSilverDataset, { type: 'add-member', variantId: 'chikorita' })
  const id = team.members[0].id
  team = changeTeam(team, soulSilverDataset, { type: 'choose-ability', memberId: id, abilityId: 'overgrow' })
  team = changeTeam(team, soulSilverDataset, { type: 'toggle-move', memberId: id, moveId: 'razor-leaf' })
  team = changeTeam(team, soulSilverDataset, { type: 'change-variant', memberId: id, variantId: 'vulpix' })
  const member = analyzeTeam(team, soulSilverDataset).members[0]
  expect(team.members[0].abilityId).toBe('overgrow')
  expect(team.members[0].moveIds).toEqual(['razor-leaf'])
  expect(member.ability.status).toBe('invalid')
  expect(member.moves[0].status).toBe('invalid')
  expect(member.ability.reason).toMatch(/Vulpix|variante/i)
  expect(analyzeTeam(team, soulSilverDataset).offense.find((row) => row.type === 'water')?.members).toHaveLength(0)
})

test('Time completo sem golpes continua com análise parcial', () => {
  const team = createFullChikoritaTeam(soulSilverDataset, false)

  expect(analyzeTeam(team, soulSilverDataset).partial).toBe(true)
})

test('efeito defensivo desconhecido preserva defesa natural e torna a análise parcial', () => {
  const uncertainDataset: AuditDataset = structuredClone(soulSilverDataset)
  const overgrow = uncertainDataset.abilityEffects.find((effect) => effect.abilityId === 'overgrow')!
  overgrow.kind = 'unknown'
  overgrow.conditions = 'Efeito defensivo por tipo ainda não determinado.'
  overgrow.evidenceIds = []
  auditDataset(uncertainDataset)

  const team = createFullChikoritaTeam(uncertainDataset, true)

  const analysis = analyzeTeam(team, uncertainDataset)
  const fire = analysis.defense.find((row) => row.type === 'fire')!
  expect(fire.members[0].natural).toBe(2)
  expect(fire.members[0].combined).toBeNull()
  expect(fire.partial).toBe(true)
  expect(analysis.partial).toBe(true)
})

test('métodos especiais só expõem relações auditadas e suas condições', () => {
  const wingAttack = moveOptions(soulSilverDataset, 'hoothoot').find(({ move }) => move.id === 'wing-attack')!
  expect(wingAttack.relations.map((relation) => relation.method)).toEqual(['egg'])
  expect(wingAttack.relations[0].conditions).toContain('Pidgey da Route 29')

  const headbutt = moveOptions(soulSilverDataset, 'wooper').find(({ move }) => move.id === 'headbutt')!
  expect(headbutt.relations.map((relation) => relation.method)).toEqual(['tutor'])
  expect(headbutt.relations[0].conditions).toContain('Ilex Forest')

  const ember = moveOptions(soulSilverDataset, 'vulpix').find(({ move }) => move.id === 'ember')!
  expect(ember.relations.map((relation) => relation.method)).toEqual(['level-up', 'reminder'])
  expect(moveOptions(soulSilverDataset, 'wooper').some(({ move }) => move.id === 'recover')).toBe(false)
})

test('defesa natural preserva todos os multiplicadores históricos de dupla tipagem', () => {
  let team = createTeam('Matriz histórica', soulSilverDataset)
  team = changeTeam(team, soulSilverDataset, { type: 'add-member', variantId: 'golem' })
  team = changeTeam(team, soulSilverDataset, { type: 'add-member', variantId: 'hoothoot' })

  const factors = new Set(analyzeTeam(team, soulSilverDataset).defense.flatMap((row) =>
    row.members.map((member) => member.natural)))
  expect([...factors].sort((left, right) => left - right)).toEqual([0, 0.25, 0.5, 1, 2, 4])
})
