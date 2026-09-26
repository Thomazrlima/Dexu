export const types = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
  'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark',
] as const

export type PokemonType = (typeof types)[number]
export type Availability = 'eligible' | 'unavailable' | 'unverified'
export type MoveMethod = 'level-up' | 'tm' | 'hm' | 'egg' | 'tutor' | 'reminder'

export interface Evidence {
  id: string
  origin: string
  reference: string
  locator: string
  checkedAt: string
  conclusion: string
  conditions: string
}

export interface AuditDataset {
  manifest: {
    datasetVersion: string
    schemaVersion: number
    gameVersion: 'soulsilver'
    versionGroup: 'heartgold-soulsilver'
    generation: 4
    cutoff: 'before-first-red'
    auditedAt: string
    sample: string
    exclusions: string[]
  }
  evidence: Evidence[]
  species: { id: number; name: string }[]
  variants: { id: string; speciesId: number; name: string; types: PokemonType[] }[]
  acquisitions: {
    id: string; variantId: string; method: string; conditions: string
    gameVersion: string; cutoff: string; evidenceIds: string[]
  }[]
  variantDecisions: {
    variantId: string; status: Availability; acquisitionIds: string[]
    evidenceIds: string[]; reason: string
  }[]
  abilities: { id: string; name: string }[]
  abilityDecisions: {
    variantId: string; abilityId: string; status: Availability
    conditions: string; evidenceIds: string[]
  }[]
  abilityEffects: {
    abilityId: string; kind: 'none' | 'immune' | 'reduce' | 'unknown'
    type?: PokemonType; factor?: number; conditions: string; evidenceIds: string[]
  }[]
  moves: {
    id: string; name: string; type: PokemonType | null
    category: 'physical' | 'special' | 'status'
  }[]
  learnset: {
    id: string; variantId: string; retainedForVariantId?: string
    moveId: string; method: MoveMethod; conditions: string
    versionGroup: string; availableBeforeRed: boolean
    evidenceIds: string[]; methodEvidenceIds: string[]
  }[]
  moveDecisions: {
    variantId: string; moveId: string; status: Availability
    learnsetIds: string[]; evidenceIds: string[]; conditions: string
  }[]
  typeChart: Record<PokemonType, Record<PokemonType, number>>
}

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}: objeto obrigatório`)
  return value as Record<string, unknown>
}

function rows(value: unknown, label: string): Record<string, unknown>[] {
  if (!Array.isArray(value)) throw new Error(`${label}: lista obrigatória`)
  return value.map((item, index) => record(item, `${label}[${index}]`))
}

function string(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}: texto obrigatório`)
  return value
}

function ids(value: unknown, label: string, nonempty = false): string[] {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) throw new Error(`${label}: referência obrigatória`)
  return value.map((item) => string(item, label))
}

function unique<T>(items: T[], key: (item: T) => string, label: string): Map<string, T> {
  const result = new Map<string, T>()
  for (const item of items) {
    const id = key(item)
    if (result.has(id)) throw new Error(`${label}: ID repetido ${id}`)
    result.set(id, item)
  }
  return result
}

function references(list: string[], entries: Map<string, unknown>, label: string): void {
  for (const id of list) if (!entries.has(id)) throw new Error(`${label}: referência órfã ${id}`)
}

export function auditDataset(raw: unknown): AuditDataset {
  const data = record(raw, 'dataset')
  const manifest = record(data.manifest, 'manifesto')
  string(manifest.datasetVersion, 'versão do dataset')
  if (manifest.schemaVersion !== 1) throw new Error('revisão do esquema incompatível')
  if (manifest.gameVersion !== 'soulsilver' || manifest.versionGroup !== 'heartgold-soulsilver' || manifest.generation !== 4) {
    throw new Error('versão, grupo ou geração incompatíveis')
  }
  if (manifest.cutoff !== 'before-first-red') throw new Error('marco da campanha incompatível')
  string(manifest.auditedAt, 'data da auditoria')
  string(manifest.sample, 'escopo da amostra')
  ids(manifest.exclusions, 'exclusões', true)

  const evidence = unique(rows(data.evidence, 'evidências'), (row) => string(row.id, 'evidência'), 'evidências')
  for (const row of evidence.values()) {
    for (const field of ['origin', 'reference', 'locator', 'checkedAt', 'conclusion', 'conditions']) string(row[field], `evidência ${field}`)
  }
  const species = unique(rows(data.species, 'espécies'), (row) => String(row.id), 'espécies')
  const variants = unique(rows(data.variants, 'variantes'), (row) => string(row.id, 'variante'), 'variantes')
  const acquisitions = unique(rows(data.acquisitions, 'caminhos'), (row) => string(row.id, 'caminho'), 'caminhos')
  const abilities = unique(rows(data.abilities, 'habilidades'), (row) => string(row.id, 'habilidade'), 'habilidades')
  const moves = unique(rows(data.moves, 'golpes'), (row) => string(row.id, 'golpe'), 'golpes')
  const learnset = unique(rows(data.learnset, 'learnset'), (row) => string(row.id, 'relação'), 'learnset')

  for (const variant of variants.values()) {
    if (!species.has(String(variant.speciesId))) throw new Error(`variante ${variant.id}: espécie órfã`)
    if (!Array.isArray(variant.types) || variant.types.length < 1 || variant.types.length > 2 ||
      new Set(variant.types).size !== variant.types.length || variant.types.some((type) => !types.includes(type))) {
      throw new Error(`variante ${variant.id}: tipos inválidos`)
    }
  }
  for (const path of acquisitions.values()) {
    if (!variants.has(String(path.variantId))) throw new Error(`caminho ${path.id}: variante órfã`)
    if (path.gameVersion !== 'soulsilver' || path.cutoff !== 'before-first-red') throw new Error(`caminho ${path.id}: marco ou versão incompatível`)
    string(path.method, 'método de obtenção')
    string(path.conditions, 'condições de obtenção')
    references(ids(path.evidenceIds, `caminho ${path.id}: evidência`, true), evidence, 'caminho')
  }
  const variantDecisions = unique(rows(data.variantDecisions, 'decisões de variante'), (row) => string(row.variantId, 'decisão'), 'decisões de variante')
  for (const decision of variantDecisions.values()) {
    if (!variants.has(String(decision.variantId))) throw new Error('decisão: variante órfã')
    const paths = ids(decision.acquisitionIds, 'decisão: caminho', decision.status === 'eligible')
    references(paths, acquisitions, 'decisão: caminho')
    if (paths.some((id) => acquisitions.get(id)?.variantId !== decision.variantId)) throw new Error('decisão: caminho de outra variante')
    references(ids(decision.evidenceIds, 'decisão: evidência', true), evidence, 'decisão')
    string(decision.reason, 'motivo da decisão')
    if (!['eligible', 'unavailable', 'unverified'].includes(String(decision.status))) throw new Error('estado de variante inválido')
  }
  for (const variant of variants.values()) if (!variantDecisions.has(String(variant.id))) throw new Error(`variante ${variant.id}: decisão ausente`)

  const abilityDecisions = unique(rows(data.abilityDecisions, 'decisões de habilidade'), (row) => `${row.variantId}:${row.abilityId}`, 'decisões de habilidade')
  for (const decision of abilityDecisions.values()) {
    if (!variants.has(String(decision.variantId)) || !abilities.has(String(decision.abilityId))) throw new Error('habilidade: referência órfã')
    if (!['eligible', 'unavailable', 'unverified'].includes(String(decision.status))) throw new Error('estado de habilidade inválido')
    references(ids(decision.evidenceIds, 'habilidade: evidência', decision.status === 'eligible'), evidence, 'habilidade')
    if (decision.status === 'eligible' && variantDecisions.get(String(decision.variantId))?.status !== 'eligible') throw new Error('habilidade de variante não elegível')
  }
  const abilityEffects = unique(rows(data.abilityEffects, 'efeitos'), (row) => string(row.abilityId, 'efeito'), 'efeitos')
  for (const effect of abilityEffects.values()) {
    if (!abilities.has(String(effect.abilityId))) throw new Error('efeito: habilidade órfã')
    if (!['none', 'immune', 'reduce', 'unknown'].includes(String(effect.kind))) throw new Error('efeito: tipo inválido')
    if ((effect.kind === 'immune' || effect.kind === 'reduce') && !types.some((type) => type === effect.type)) throw new Error('efeito: tipo atacante inválido')
    if (effect.kind === 'reduce' && (typeof effect.factor !== 'number' || effect.factor <= 0 || effect.factor >= 1)) throw new Error('efeito: redução inválida')
    references(ids(effect.evidenceIds, 'efeito: evidência', effect.kind !== 'unknown'), evidence, 'efeito')
  }
  for (const decision of abilityDecisions.values()) if (decision.status === 'eligible' && !abilityEffects.has(String(decision.abilityId))) throw new Error('habilidade positiva sem efeito revisado ou desconhecido')

  for (const move of moves.values()) {
    if (move.type !== null && !types.some((type) => type === move.type)) throw new Error(`golpe ${move.id}: tipo inválido`)
    if (!['physical', 'special', 'status'].includes(String(move.category))) throw new Error(`golpe ${move.id}: categoria inválida`)
  }
  for (const relation of learnset.values()) {
    if (!variants.has(String(relation.variantId)) || !moves.has(String(relation.moveId))) throw new Error('learnset: referência órfã')
    if (relation.retainedForVariantId && !variants.has(String(relation.retainedForVariantId))) throw new Error('learnset: pré-evolução órfã')
    if (relation.versionGroup !== 'heartgold-soulsilver') throw new Error('learnset: grupo incompatível')
    if (!['level-up', 'tm', 'hm', 'egg', 'tutor', 'reminder'].includes(String(relation.method))) throw new Error('learnset: método inválido')
    references(ids(relation.evidenceIds, 'learnset: evidência', true), evidence, 'learnset')
    references(ids(relation.methodEvidenceIds, 'método: evidência', relation.availableBeforeRed === true), evidence, 'método')
    string(relation.conditions, 'condições do golpe')
  }
  const moveDecisions = unique(rows(data.moveDecisions, 'decisões de golpe'), (row) => `${row.variantId}:${row.moveId}`, 'decisões de golpe')
  for (const decision of moveDecisions.values()) {
    if (!variants.has(String(decision.variantId)) || !moves.has(String(decision.moveId))) throw new Error('golpe: referência órfã')
    if (!['eligible', 'unavailable', 'unverified'].includes(String(decision.status))) throw new Error('golpe: estado inválido')
    const relations = ids(decision.learnsetIds, 'golpe: relação', decision.status === 'eligible')
    references(relations, learnset, 'golpe: relação')
    references(ids(decision.evidenceIds, 'golpe: evidência', decision.status === 'eligible'), evidence, 'golpe')
    if (decision.status === 'eligible') {
      if (variantDecisions.get(String(decision.variantId))?.status !== 'eligible') throw new Error('golpe de variante não elegível')
      if (!relations.every((id) => {
        const relation = learnset.get(id)
        return relation?.moveId === decision.moveId && relation?.availableBeforeRed === true &&
          (relation?.variantId === decision.variantId || relation?.retainedForVariantId === decision.variantId)
      })) throw new Error('golpe elegível inclui learnset sem acesso ao método comprovado antes de Red')
    }
  }

  const chart = record(data.typeChart, 'matriz')
  if (Object.keys(chart).length !== types.length) throw new Error('matriz de tipos incompleta')
  for (const attack of types) {
    const row = record(chart[attack], 'matriz')
    if (Object.keys(row).length !== types.length || types.some((defense) => ![0, 0.5, 1, 2].includes(Number(row[defense])))) {
      throw new Error('matriz de tipos incompleta ou inválida')
    }
  }
  return raw as AuditDataset
}
