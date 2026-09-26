import { useEffect, useRef, useState } from 'react'
import { auditDataset, type AuditDataset, type PokemonType } from './domain/dataset'
import { abilityOptions, analyzeTeam, changeTeam, createTeam, moveOptions, variantOptions, type Team, type TeamIntent } from './domain/team'
import { getTeam, listTeams, saveTeam } from './storage/teams'

const typeNames: Record<PokemonType, string> = {
  normal: 'Normal', fighting: 'Lutador', flying: 'Voador', poison: 'Venenoso', ground: 'Terrestre',
  rock: 'Pedra', bug: 'Inseto', ghost: 'Fantasma', steel: 'Aço', fire: 'Fogo', water: 'Água',
  grass: 'Planta', electric: 'Elétrico', psychic: 'Psíquico', ice: 'Gelo', dragon: 'Dragão', dark: 'Sombrio',
}

function useAuditDataset() {
  const [result, setResult] = useState<{ dataset: AuditDataset | null; error: string | null }>({ dataset: null, error: null })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    fetch('/datasets/soulsilver-sample.json', { cache: 'no-store' }).then(async (response) => {
      if (!response.ok) throw new Error(`carregamento HTTP ${response.status}`)
      return auditDataset(await response.json())
    }).then((dataset) => { if (active) setResult({ dataset, error: null }) }).catch((error: unknown) => {
      if (active) setResult({ dataset: null, error: error instanceof Error ? error.message : 'Falha ao validar dados.' })
    })
    return () => { active = false }
  }, [attempt])
  return { ...result, retry: () => { setResult({ dataset: null, error: null }); setAttempt((value) => value + 1) } }
}

function DataNotice({ error, retry }: { error: string; retry: () => void }) {
  return <div className="data-error" role="alert">
    <h2>Dados da campanha indisponíveis</h2>
    <p>O conjunto auditado não passou na validação: {error}. Seus Times locais continuam visíveis, mas novas escolhas e análises estão bloqueadas.</p>
    <button type="button" onClick={retry}>Tentar carregar novamente</button>
  </div>
}

function SampleNote({ dataset }: { dataset: AuditDataset }) {
  return <details className='sample-note'>
    <summary>Amostra parcial auditada</summary>
    <p>{dataset.manifest.sample} Cada escolha é validada individualmente; itens ou presentes limitados não são garantidos simultaneamente para todo o Time.</p>
  </details>
}

export function SoulSilverArea() {
  const { dataset, error, retry } = useAuditDataset()
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')
  async function startTeam() {
    if (!dataset || creating) return
    setCreating(true)
    try {
      const saved = await saveTeam(createTeam('Meu time', dataset))
      window.location.href = `/soulsilver/times/${saved.id}`
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : 'Não foi possível criar o Time.')
      setCreating(false)
    }
  }
  return <>
    <section className="area-hero" aria-labelledby="game-title">
      <div className="area-hero__copy"><span className="area-hero__eyebrow">Pokémon</span><h1 id="game-title">SoulSilver</h1><p>Planeje com provas da campanha, de Johto a Kanto.</p></div>
      <dl className="area-hero__facts"><div><dt>Regiões</dt><dd>Johto e Kanto</dd></div><div><dt>Marco da campanha</dt><dd>Antes do primeiro confronto com Red</dd></div></dl>
    </section>
    {error && <DataNotice error={error} retry={retry} />}
    {!dataset && !error && <p role="status">Carregando amostra auditada…</p>}
    {dataset && <SampleNote dataset={dataset} />}
    <section className="area-actions" aria-labelledby="actions-title">
      <div className="section-heading"><h2 id="actions-title">Escolha seu próximo passo</h2><p>Times e escolhas ficam neste navegador.</p></div>
      <div className="area-actions__grid">
        <div className="area-action area-action--primary"><span className="area-action__index">01 / Construir</span><h3>Criar time</h3><p>Comece com seis posições vazias e adicione candidatos com caminho comprovado.</p><button type="button" onClick={startTeam} disabled={!dataset || creating}>Criar time <span aria-hidden="true">↗</span></button></div>
        <div className="area-action"><span className="area-action__index">02 / Retomar</span><h3>Times salvos</h3><p>Reabra os planos guardados localmente e continue a edição.</p><a href="/soulsilver/times">Ver times salvos <span aria-hidden="true">↗</span></a></div>
        <div className="area-action area-action--pending"><span className="area-action__index">03 / Explorar</span><h3>Pokédex</h3><p>Catálogo regional em preparação para uma etapa posterior.</p><span className="area-action__unavailable">Ainda não disponível</span></div>
      </div>
      {message && <p role="alert">{message}</p>}
    </section>
  </>
}

export function SavedTeamsPage() {
  const [teams, setTeams] = useState<Team[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => { listTeams().then(setTeams).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Falha ao abrir Times.')) }, [])
  return <section className="workspace" aria-labelledby="saved-title">
    <div className="workspace__heading"><span className="eyebrow">SoulSilver / Seus planos</span><h1 id="saved-title">Times salvos</h1><p>Os Times ficam armazenados neste navegador.</p></div>
    {error && <p role="alert">{error}</p>}
    {teams === null && !error && <p role="status">Carregando Times…</p>}
    {teams?.length === 0 && <div className="empty-state"><h2>Nenhum Time salvo</h2><p>Volte à área SoulSilver para criar seu primeiro plano.</p><a href="/soulsilver">Ir para SoulSilver</a></div>}
    {teams && teams.length > 0 && <ul className="saved-list">{teams.map((team) => <li key={team.id}><a href={`/soulsilver/times/${team.id}`}><span className="saved-list__name">{team.name}</span><span>{team.members.length} de 6 membros · Editado em {new Date(team.updatedAt).toLocaleDateString('pt-BR')}</span><span aria-hidden="true">↗</span></a></li>)}</ul>}
  </section>
}

function AcquisitionSummary({ dataset, variantId }: { dataset: AuditDataset; variantId: string }) {
  const option = variantOptions(dataset).find(({ variant }) => variant.id === variantId)
  return option && <div className="acquisition"><strong>{option.paths[0]?.method}.</strong> {option.paths.map((path) => path.conditions).join(' ')} <a href={dataset.evidence.find((item) => item.id === option.paths[0]?.evidenceIds[0])?.reference} target="_blank" rel="noreferrer">Ver fonte</a></div>
}

function TeamStrip({ team, dataset }: { team: Team; dataset: AuditDataset }) {
  return <section className='team-strip' aria-label='Seu time'>
    <div className='team-strip__heading'>
      <div><span className='eyebrow'>Seu time</span><h2 id='team-strip-title'>Seis posições para a jornada</h2></div>
      <span className='team-strip__count'>{team.members.length}/6</span>
    </div>
    <ul className='team-strip__slots'>
      {Array.from({ length: 6 }, (_, index) => {
        const member = team.members[index]
        if (!member) return <li className='team-slot team-slot--empty' key={index}>
          <span className='team-slot__number'>{String(index + 1).padStart(2, '0')}</span>
          <span className='team-slot__empty-icon' aria-hidden='true'>+</span>
          <strong>Slot vazio</strong>
          <span>Adicionar Pokémon</span>
        </li>
        const variant = dataset.variants.find((item) => item.id === member.variantId)
        return <li className='team-slot' key={member.id}>
          <span className='team-slot__number'>{String(index + 1).padStart(2, '0')}</span>
          {variant
            ? <img className='team-slot__sprite' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${variant.speciesId}.png`} alt={`Sprite de ${variant.name}`} referrerPolicy='no-referrer' />
            : <span className='team-slot__empty-icon' aria-hidden='true'>?</span>}
          <strong>{variant?.name ?? member.variantId}</strong>
          <span>{variant?.types.map((type) => typeNames[type]).join(' / ') ?? 'Em revisão'}</span>
        </li>
      })}
    </ul>
  </section>
}

function MemberCard({ member, index, dataset, onEdit }: { member: Team['members'][number]; index: number; dataset: AuditDataset; onEdit: (intent: TeamIntent) => void }) {
  const analysis = analyzeTeam({ id: '', name: '', gameVersion: 'soulsilver', createdAt: '', updatedAt: '', revision: 0, datasetVersion: '', members: [member] }, dataset).members[0]
  const availableMoves = moveOptions(dataset, member.variantId)
  const availableAbilities = abilityOptions(dataset, member.variantId)
  const invalidMoves = analysis.moves.filter((move) => move.status === 'invalid')
  return <article className="member-card" aria-labelledby={`member-${member.id}`}>
    <div className="member-card__header"><span className="member-card__number">{String(index + 1).padStart(2, '0')}</span><div><span className="eyebrow">Membro do Time</span><h3 id={`member-${member.id}`}>{analysis.variantName}</h3></div><button type="button" className="text-button" onClick={() => onEdit({ type: 'remove-member', memberId: member.id })} aria-label={`Remover ${analysis.variantName} da posição ${index + 1}`}>Remover</button></div>
    {!analysis.variantValid && <p role="alert">Variante inválida após revalidação: {analysis.variantReason}</p>}
    <div className="type-tags" aria-label="Tipos">{dataset.variants.find((variant) => variant.id === member.variantId)?.types.map((type) => <span key={type}>{typeNames[type]}</span>)}</div>
    <label className="field-label" htmlFor={`variant-${member.id}`}>Variante da posição {index + 1}</label>
    <select id={`variant-${member.id}`} value={member.variantId} onChange={(event) => onEdit({ type: 'change-variant', memberId: member.id, variantId: event.target.value })}>
      {!analysis.variantValid && <option value={member.variantId}>{analysis.variantName} — inválida após revalidação</option>}
      {variantOptions(dataset).map(({ variant }) => <option key={variant.id} value={variant.id}>{variant.name}</option>)}
    </select>
    <AcquisitionSummary dataset={dataset} variantId={member.variantId} />
    <label className="field-label" htmlFor={`ability-${member.id}`}>Habilidade da posição {index + 1}</label>
    <select id={`ability-${member.id}`} value={member.abilityId ?? ''} onChange={(event) => onEdit({ type: 'choose-ability', memberId: member.id, abilityId: event.target.value || null })}>
      <option value="">Ainda não escolhida</option>
      {analysis.ability.status === 'invalid' && member.abilityId && <option value={member.abilityId}>{member.abilityId} — inválida após revalidação</option>}
      {availableAbilities.map(({ ability }) => <option key={ability.id} value={ability.id}>{ability.name}</option>)}
    </select>
    {availableAbilities.length === 0 && <p className="field-help">Nenhuma habilidade desta variante foi auditada para oferta nesta amostra.</p>}
    {analysis.ability.status === 'invalid' && <p className="validation-note" role="alert">{analysis.ability.reason}</p>}
    {analysis.ability.status === 'valid' && <div className="ability-explanation">
      <p><strong>Elegibilidade.</strong> {analysis.ability.reason}</p>
      <p><strong>Efeito defensivo.</strong> {analysis.ability.effect}</p>
    </div>}
    <fieldset className="moves-fieldset"><legend>Golpes da posição {index + 1} <span>({member.moveIds.length}/4)</span></legend>
      {availableMoves.length === 0 && <p className="field-help">Nenhum golpe auditado para esta variante nesta amostra.</p>}
      {availableMoves.map(({ move, relations }) => <label className="move-choice" key={move.id}><input type="checkbox" checked={member.moveIds.includes(move.id)} disabled={!member.moveIds.includes(move.id) && member.moveIds.length >= 4} onChange={() => onEdit({ type: 'toggle-move', memberId: member.id, moveId: move.id })} /><span><strong>{move.name}</strong> · {move.type ? typeNames[move.type] : 'Tipo variável'} · {move.category === 'status' ? 'Status' : 'Dano'}<small>{relations.map((relation) => `${relation.method}: ${relation.conditions}`).join(' / ')}</small></span></label>)}
      {invalidMoves.map((move) => <label className="move-choice move-choice--invalid" key={move.id}><input type="checkbox" checked onChange={() => onEdit({ type: 'toggle-move', memberId: member.id, moveId: move.id })} /><span><strong>{move.name}</strong> — inválido após revalidação<small>{move.reason} Desmarque para remover.</small></span></label>)}
    </fieldset>
  </article>
}

function AnalysisPanel({ team, dataset }: { team: Team; dataset: AuditDataset }) {
  const analysis = analyzeTeam(team, dataset)
  const covered = analysis.offense.filter((row) => row.members.length > 0).length
  return <section className="analysis-panel" aria-labelledby="analysis-title">
    <div className="analysis-panel__header"><span className="eyebrow">Leitura do Time</span><h2 id="analysis-title">Cobertura</h2><p role="status" aria-live="polite">{team.members.length} de 6 membros; {covered} de 17 tipos com cobertura ofensiva. {analysis.partial ? 'Análise parcial.' : 'Análise das escolhas atuais.'}</p></div>
    {team.members.length === 0 ? <div className="empty-state"><h3>O plano começa vazio</h3><p>Adicione um Membro para ver a análise. As seis posições livres ainda não contam como Membros.</p></div> : <>
      <p className="analysis-explainer">A cobertura ofensiva considera golpes de dano válidos contra tipos isolados. A defesa natural usa os tipos do Membro; efeitos de habilidade aparecem separadamente. Não é previsão de dano ou qualidade do Time.</p>
      <div className="analysis-columns"><section aria-labelledby="offense-title"><h3 id="offense-title">Ofensiva por tipo defensor</h3><ul className="analysis-list">{analysis.offense.map((row) => <li key={row.type}><div><strong>{typeNames[row.type]}</strong><span>{row.members.length ? `${row.members.length} membro${row.members.length > 1 ? 's' : ''}` : 'Sem cobertura'}</span></div>{row.members.length > 0 && <small>{row.members.map((member) => `${member.variantName}: ${member.moves.join(', ')}`).join(' · ')}</small>}</li>)}</ul></section>
      <section aria-labelledby="defense-title"><h3 id="defense-title">Defesa por tipo atacante</h3><ul className="analysis-list">{analysis.defense.map((row) => <li key={row.type}><div><strong>{typeNames[row.type]}</strong><span>{row.naturalWeak} fracos · {row.naturalResistant} resistentes · {row.naturalImmune} imunes naturais{row.abilityImmune ? ` · ${row.abilityImmune} imunes por habilidade` : ''}{row.partial ? ' · parcial' : ''}</span></div><details><summary>Ver Membros e fatores</summary><ul>{row.members.map((member) => <li key={member.memberId}>{member.variantName}: natural {member.natural}×; habilidade: {member.effect}; {member.combined === null ? 'contribuição não determinada' : `resultado em condição normal ${member.combined}×`}{member.immunityOrigin ? `; imunidade de origem ${member.immunityOrigin === 'natural' ? 'natural' : 'habilidade'}` : ''}</li>)}</ul></details></li>)}</ul></section></div>
    </>}
  </section>
}

export function TeamBuilderPage({ id }: { id: string }) {
  const { dataset, error: datasetError, retry } = useAuditDataset()
  const [team, setTeam] = useState<Team | null>(null)
  const [nameDraft, setNameDraft] = useState('')
  const [storageError, setStorageError] = useState('')
  const [saveStatus, setSaveStatus] = useState('')
  const [selectedVariant, setSelectedVariant] = useState('chikorita')
  const teamRef = useRef<Team | null>(null)
  const savedRevision = useRef(0)
  const pending = useRef(Promise.resolve())
  const changeNumber = useRef(0)
  useEffect(() => { getTeam(id).then((loaded) => { if (loaded) { teamRef.current = loaded; savedRevision.current = loaded.revision; setTeam(loaded); setNameDraft(loaded.name) } else setStorageError('Time não encontrado neste navegador.') }).catch((cause: unknown) => setStorageError(cause instanceof Error ? cause.message : 'Falha ao abrir Time.')) }, [id])
  function edit(intent: TeamIntent) {
    if (!dataset || !teamRef.current) return
    try {
      const next = changeTeam(teamRef.current, dataset, intent)
      teamRef.current = next
      setTeam(next)
      setStorageError('')
      setSaveStatus('Salvando…')
      const currentChange = ++changeNumber.current
      pending.current = pending.current.catch(() => undefined).then(async () => {
        const saved = await saveTeam({ ...next, revision: savedRevision.current })
        savedRevision.current = saved.revision
        if (changeNumber.current === currentChange) { teamRef.current = saved; setTeam(saved); setSaveStatus('Salvo neste navegador') }
      }).catch((cause: unknown) => {
        if (changeNumber.current === currentChange) { setSaveStatus('Não salvo'); setStorageError(cause instanceof Error ? cause.message : 'Falha ao salvar.') }
      })
    } catch (cause) { setStorageError(cause instanceof Error ? cause.message : 'Escolha inválida.') }
  }
  if (storageError && !team) return <p role="alert">{storageError} <a href="/soulsilver/times">Voltar aos Times salvos</a></p>
  if (!team) return <p role="status">Abrindo Time…</p>
  return <div className="workspace">
    <div className="workspace__heading"><span className="eyebrow">SoulSilver / Team Builder</span><h1>{team.name}</h1><p>{team.members.length} de 6 membros · Johto e Kanto até antes do primeiro confronto com Red</p></div>
    {datasetError && <DataNotice error={datasetError} retry={retry} />}
    {dataset && <SampleNote dataset={dataset} />}
    {dataset && <TeamStrip team={team} dataset={dataset} />}
    <div className="builder-layout"><div className="builder-edit">
      <section className="builder-toolbar" aria-labelledby="edit-title"><div><span className="eyebrow">01 / Composição</span><h2 id="edit-title">Monte seu Time</h2></div><p role="status" aria-live="polite">{saveStatus || 'Pronto para editar'}</p>
        <label className="field-label" htmlFor="team-name">Nome do time</label><input id="team-name" type="text" maxLength={60} value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} onBlur={() => { if (nameDraft.trim() && nameDraft.trim() !== team.name) edit({ type: 'rename', name: nameDraft }) }} onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur() }} />
        {storageError && <p role="alert">{storageError} <button type="button" onClick={() => { if (teamRef.current) edit({ type: 'rename', name: teamRef.current.name }) }}>Tentar salvar novamente</button></p>}
      </section>
      {dataset ? <>
        <section className="add-member" aria-labelledby="add-title"><div><h3 id="add-title">Adicionar Membro</h3><p>Candidatos auditados da amostra. Espécies repetidas são permitidas.</p></div><label className="field-label" htmlFor="candidate">Candidato auditado</label><select id="candidate" value={selectedVariant} onChange={(event) => setSelectedVariant(event.target.value)}>{variantOptions(dataset).map(({ variant }) => <option key={variant.id} value={variant.id}>{variant.name} · {variant.types.map((type) => typeNames[type]).join(' / ')}</option>)}</select><AcquisitionSummary dataset={dataset} variantId={selectedVariant} /><button type="button" onClick={() => edit({ type: 'add-member', variantId: selectedVariant })} disabled={team.members.length >= 6}>Adicionar ao time</button>{team.members.length >= 6 && <p>Seis posições ocupadas. Remova um Membro antes de adicionar outro.</p>}</section>
        <section aria-labelledby="members-title"><h2 className="sr-only" id="members-title">Membros e posições</h2><div className="member-grid">{team.members.map((member, index) => <MemberCard key={member.id} member={member} index={index} dataset={dataset} onEdit={edit} />)}{Array.from({ length: 6 - team.members.length }, (_, index) => <div className="empty-slot" key={`empty-${index}`}><span>{String(team.members.length + index + 1).padStart(2, '0')}</span><p>Posição livre</p></div>)}</div></section>
      </> : <div className="empty-state"><p>Novas escolhas indisponíveis enquanto o dataset não for validado.</p><ul>{team.members.map((member, index) => <li key={member.id}>Posição {index + 1}: variante {member.variantId}; habilidade {member.abilityId ?? 'não escolhida'}; golpes {member.moveIds.join(', ') || 'nenhum'}.</li>)}</ul></div>}
    </div>{dataset && <AnalysisPanel team={team} dataset={dataset} />}</div>
  </div>
}
