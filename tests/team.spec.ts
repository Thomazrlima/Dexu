import { expect, test } from '@playwright/test'
import { soulSilverDataset } from '../src/data/soulsilver'
import { analyzeTeam, changeTeam, createTeam } from '../src/domain/team'

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
