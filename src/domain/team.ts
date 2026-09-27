import { types, type AuditDataset, type PokemonType } from './dataset'

export interface TeamMember {
  id: string
  variantId: string
  abilityId: string | null
  moveIds: string[]
}

export interface Team {
  id: string
  name: string
  gameVersion: 'soulsilver'
  createdAt: string
  updatedAt: string
  revision: number
  datasetVersion: string
  members: TeamMember[]
}

export type TeamIntent =
  | { type: 'rename'; name: string }
  | { type: 'add-member'; variantId: string }
  | { type: 'remove-member'; memberId: string }
  | { type: 'change-variant'; memberId: string; variantId: string }
  | { type: 'choose-ability'; memberId: string; abilityId: string | null }
  | { type: 'toggle-move'; memberId: string; moveId: string }

export interface AnalyzedMember {
  id: string
  variantId: string
  variantName: string
  variantValid: boolean
  variantReason: string
  ability: { id: string | null; status: 'valid' | 'invalid' | 'missing'; reason: string; effect: string }
  moves: { id: string; name: string; status: 'valid' | 'invalid'; reason: string }[]
  natural: Record<PokemonType, number> | null
}

export interface OffenseRow {
  type: PokemonType
  members: { memberId: string; variantName: string; moves: string[] }[]
}

export interface DefenseRow {
  type: PokemonType
  naturalWeak: number
  naturalResistant: number
  naturalImmune: number
  combinedWeak: number
  combinedResistant: number
  combinedImmune: number
  abilityImmune: number
  partial: boolean
  members: { memberId: string; variantName: string; natural: number; effect: string; combined: number | null; immunityOrigin: 'natural' | 'ability' | null }[]
}

export interface TeamAnalysis {
  members: AnalyzedMember[]
  offense: OffenseRow[]
  defense: DefenseRow[]
  field: { present: { capability: string; moveName: string; variantName: string }[]; absent: string[] }
  partial: boolean
}

type PrototypeMove = { id: string; name: string; type: PokemonType; category: 'physical' | 'special' }

const prototypeMoves: Record<string, PrototypeMove[]> = {
  chikorita: [{ id: 'vine-whip', name: 'Vine Whip', type: 'grass', category: 'physical' }, { id: 'body-slam', name: 'Body Slam', type: 'normal', category: 'physical' }],
  hoothoot: [{ id: 'confusion', name: 'Confusion', type: 'psychic', category: 'special' }, { id: 'air-slash', name: 'Air Slash', type: 'flying', category: 'special' }],
  wooper: [{ id: 'water-gun', name: 'Water Gun', type: 'water', category: 'special' }],
  geodude: [{ id: 'rock-throw', name: 'Rock Throw', type: 'rock', category: 'physical' }, { id: 'magnitude', name: 'Magnitude', type: 'ground', category: 'physical' }, { id: 'rock-slide', name: 'Rock Slide', type: 'rock', category: 'physical' }, { id: 'earthquake', name: 'Earthquake', type: 'ground', category: 'physical' }],
  vulpix: [{ id: 'flamethrower', name: 'Flamethrower', type: 'fire', category: 'special' }, { id: 'fire-blast', name: 'Fire Blast', type: 'fire', category: 'special' }, { id: 'energy-ball', name: 'Energy Ball', type: 'grass', category: 'special' }],
  eevee: [{ id: 'quick-attack', name: 'Quick Attack', type: 'normal', category: 'physical' }, { id: 'tackle', name: 'Tackle', type: 'normal', category: 'physical' }],
  espeon: [{ id: 'confusion', name: 'Confusion', type: 'psychic', category: 'special' }, { id: 'psybeam', name: 'Psybeam', type: 'psychic', category: 'special' }, { id: 'psychic', name: 'Psychic', type: 'psychic', category: 'special' }],
  togepi: [{ id: 'extrasensory', name: 'Extrasensory', type: 'psychic', category: 'special' }, { id: 'ancient-power', name: 'Ancient Power', type: 'rock', category: 'special' }, { id: 'aura-sphere', name: 'Aura Sphere', type: 'fighting', category: 'special' }, { id: 'psychic', name: 'Psychic', type: 'psychic', category: 'special' }],
  lapras: [{ id: 'water-gun', name: 'Water Gun', type: 'water', category: 'special' }, { id: 'ice-beam', name: 'Ice Beam', type: 'ice', category: 'special' }, { id: 'surf', name: 'Surf', type: 'water', category: 'special' }, { id: 'thunderbolt', name: 'Thunderbolt', type: 'electric', category: 'special' }],
  golem: [{ id: 'rock-throw', name: 'Rock Throw', type: 'rock', category: 'physical' }, { id: 'earthquake', name: 'Earthquake', type: 'ground', category: 'physical' }, { id: 'stone-edge', name: 'Stone Edge', type: 'rock', category: 'physical' }, { id: 'fire-punch', name: 'Fire Punch', type: 'fire', category: 'physical' }],
}

export function createTeam(name: string, dataset: AuditDataset): Team {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(), name: name.trim() || 'Meu time', gameVersion: 'soulsilver',
    createdAt: now, updatedAt: now, revision: 0,
    datasetVersion: dataset.manifest.datasetVersion, members: [],
  }
}

export function variantOptions(dataset: AuditDataset) {
  return dataset.variantDecisions.filter((decision) => decision.status === 'eligible').map((decision) => {
    const variant = dataset.variants.find((item) => item.id === decision.variantId)!
    const paths = dataset.acquisitions.filter((path) => decision.acquisitionIds.includes(path.id))
    return { variant, paths, reason: decision.reason }
  })
}

export function abilityOptions(dataset: AuditDataset, variantId: string) {
  return dataset.abilityDecisions.filter((decision) => decision.variantId === variantId && decision.status === 'eligible').map((decision) => ({
    decision, ability: dataset.abilities.find((ability) => ability.id === decision.abilityId)!,
  }))
}

export function moveOptions(dataset: AuditDataset, variantId: string) {
  const audited = dataset.moveDecisions.filter((decision) => decision.variantId === variantId && decision.status === 'eligible').map((decision) => ({
    decision, move: dataset.moves.find((move) => move.id === decision.moveId)!,
    relations: dataset.learnset.filter((relation) => decision.learnsetIds.includes(relation.id)),
  }))
  const supplements = (prototypeMoves[variantId] ?? []).filter((move) => !audited.some((item) => item.move.id === move.id)).map((move) => ({
    decision: { variantId, moveId: move.id, status: 'eligible' as const, learnsetIds: [], evidenceIds: [], conditions: 'Disponível no moveset do protótipo.' },
    move,
    relations: [{ id: `${variantId}-${move.id}-prototype`, variantId, moveId: move.id, method: 'level-up' as const, conditions: 'Moveset de protótipo.', versionGroup: 'heartgold-soulsilver', availableBeforeRed: true, evidenceIds: [], methodEvidenceIds: [] }],
  }))
  return [...audited, ...supplements]
}

export function changeTeam(team: Team, dataset: AuditDataset, intent: TeamIntent): Team {
  const members = team.members.map((member) => ({ ...member, moveIds: [...member.moveIds] }))
  let name = team.name
  if (intent.type === 'rename') {
    name = intent.name.trim()
    if (!name || name.length > 60) throw new Error('Nome do Time deve ter entre 1 e 60 caracteres.')
  } else if (intent.type === 'add-member') {
    const eligible = variantOptions(dataset).some(({ variant }) => variant.id === intent.variantId)
    if (!eligible) throw new Error('Variante não elegível ou fora da amostra auditada.')
    if (members.length >= 6) throw new Error('O Time aceita no máximo seis Membros.')
    const abilities = abilityOptions(dataset, intent.variantId)
    members.push({ id: crypto.randomUUID(), variantId: intent.variantId, abilityId: abilities.length === 1 ? abilities[0].ability.id : null, moveIds: [] })
  } else {
    const index = members.findIndex((member) => member.id === intent.memberId)
    if (index < 0) throw new Error('Membro não encontrado no Time.')
    const member = members[index]
    if (intent.type === 'remove-member') {
      members.splice(index, 1)
    } else if (intent.type === 'change-variant') {
      if (!variantOptions(dataset).some(({ variant }) => variant.id === intent.variantId)) throw new Error('Variante não elegível ou fora da amostra auditada.')
      member.variantId = intent.variantId
    } else if (intent.type === 'choose-ability') {
      if (intent.abilityId !== null && !abilityOptions(dataset, member.variantId).some(({ ability }) => ability.id === intent.abilityId)) {
        throw new Error('Habilidade não comprovada para esta variante na campanha.')
      }
      member.abilityId = intent.abilityId
    } else if (intent.type === 'toggle-move') {
      const existing = member.moveIds.indexOf(intent.moveId)
      if (existing >= 0) member.moveIds.splice(existing, 1)
      else {
        if (!moveOptions(dataset, member.variantId).some(({ move }) => move.id === intent.moveId)) throw new Error('Golpe sem prova de aprendizado e acesso para esta variante.')
        if (member.moveIds.length >= 4) throw new Error('Cada Membro aceita no máximo quatro golpes distintos.')
        member.moveIds.push(intent.moveId)
      }
    }
  }
  return { ...team, name, members, updatedAt: new Date().toISOString(), datasetVersion: dataset.manifest.datasetVersion }
}

export function analyzeTeam(team: Team, dataset: AuditDataset): TeamAnalysis {
  const members: AnalyzedMember[] = team.members.map((member) => {
    const variant = dataset.variants.find((item) => item.id === member.variantId)
    const decision = dataset.variantDecisions.find((item) => item.variantId === member.variantId)
    const variantValid = Boolean(variant && decision?.status === 'eligible')
    const abilityDecision = dataset.abilityDecisions.find((item) => item.variantId === member.variantId && item.abilityId === member.abilityId)
    const ability = member.abilityId === null
      ? { id: null, status: 'missing' as const, reason: 'Habilidade ainda não escolhida.', effect: 'Contribuição da habilidade pendente.' }
      : !variantValid || abilityDecision?.status !== 'eligible'
        ? { id: member.abilityId, status: 'invalid' as const, reason: `Habilidade antiga não comprovada para ${variant?.name ?? 'esta variante'}; escolha outra ou remova.`, effect: 'Não calculada.' }
        : { id: member.abilityId, status: 'valid' as const, reason: abilityDecision.conditions, effect: dataset.abilityEffects.find((item) => item.abilityId === member.abilityId)?.conditions ?? 'Efeito por tipo desconhecido.' }
    const moves = member.moveIds.map((id) => {
      const option = moveOptions(dataset, member.variantId).find((item) => item.move.id === id)
      const valid = variantValid && Boolean(option)
      return { id, name: option?.move.name ?? id, status: valid ? 'valid' as const : 'invalid' as const, reason: option?.decision.conditions ?? 'Golpe indisponível para esta variante; remova ou substitua.' }
    })
    const natural = variantValid && variant ? Object.fromEntries(types.map((attack) => [
      attack, variant.types.reduce((factor, defense) => factor * dataset.typeChart[attack][defense], 1),
    ])) as Record<PokemonType, number> : null
    return { id: member.id, variantId: member.variantId, variantName: variant?.name ?? member.variantId, variantValid, variantReason: decision?.reason ?? 'Variante sem prova no dataset atual.', ability, moves, natural }
  })

  const offense: OffenseRow[] = types.map((type) => ({
    type,
    members: members.flatMap((member) => {
      if (!member.variantValid) return []
      const contributing = member.moves.filter((selected) => selected.status === 'valid').flatMap((selected) => {
        const move = moveOptions(dataset, member.variantId).find((item) => item.move.id === selected.id)?.move
        return move && move.category !== 'status' && move.type && dataset.typeChart[move.type][type] > 1 ? [move.name] : []
      })
      return contributing.length ? [{ memberId: member.id, variantName: member.variantName, moves: contributing }] : []
    }),
  }))

  const defense: DefenseRow[] = types.map((type) => {
    const entries = members.flatMap((member) => {
      if (!member.natural) return []
      const natural = member.natural[type]
      const selectedAbility = team.members.find((item) => item.id === member.id)?.abilityId
      const effect = member.ability.status === 'valid' ? dataset.abilityEffects.find((item) => item.abilityId === selectedAbility) : undefined
      let combined: number | null = null
      let effectText = member.ability.effect
      if (!effect || effect.kind === 'none' || (effect.kind !== 'unknown' && effect.type !== type)) combined = natural
      else if (effect?.kind === 'immune') combined = 0
      else if (effect?.kind === 'reduce' && effect.factor !== undefined) combined = natural * effect.factor
      if (!effect || effect.kind === 'unknown') effectText = member.ability.status === 'valid' ? 'Efeito por tipo desconhecido.' : member.ability.reason
      const immunityOrigin = natural === 0 ? 'natural' as const : combined === 0 ? 'ability' as const : null
      return [{ memberId: member.id, variantName: member.variantName, natural, effect: effectText, combined, immunityOrigin }]
    })
    return {
      type,
      naturalWeak: entries.filter((entry) => entry.natural > 1).length,
      naturalResistant: entries.filter((entry) => entry.natural > 0 && entry.natural < 1).length,
      naturalImmune: entries.filter((entry) => entry.natural === 0).length,
      combinedWeak: entries.filter((entry) => entry.combined !== null && entry.combined > 1).length,
      combinedResistant: entries.filter((entry) => entry.combined !== null && entry.combined > 0 && entry.combined < 1).length,
      combinedImmune: entries.filter((entry) => entry.combined === 0).length,
      abilityImmune: entries.filter((entry) => entry.immunityOrigin === 'ability').length,
      partial: entries.length !== team.members.length || entries.some((entry) => entry.combined === null),
      members: entries,
    }
  })
  const fieldMoves = [
    { moveId: 'cut', capability: 'Cortar' },
    { moveId: 'surf', capability: 'Surfar' },
  ]
  const present = fieldMoves.flatMap(({ moveId, capability }) => members.flatMap((member) => {
    const selected = team.members.find((item) => item.id === member.id)?.moveIds.includes(moveId)
    const option = moveOptions(dataset, member.variantId).find((item) => item.move.id === moveId)
    return selected && option && member.variantValid ? [{ capability, moveName: option.move.name, variantName: member.variantName }] : []
  }))
  const field = { present, absent: fieldMoves.filter(({ capability }) => !present.some((item) => item.capability === capability)).map(({ capability }) => capability) }
  return {
    members, offense, defense,
    field,
    partial: team.members.length < 6 || members.some((member) =>
      !member.variantValid ||
      member.ability.status !== 'valid' ||
      member.moves.length === 0 ||
      member.moves.some((move) => move.status !== 'valid')) ||
      defense.some((row) => row.partial),
  }
}
