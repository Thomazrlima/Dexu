import React from 'react'
import { createRoot } from 'react-dom/client'
import logoUrl from '../assets/visuals/dexu-logo-cutout.png'
import iconUrl from '../assets/visuals/dexu-icon-cutout.png'
import './styles.css'

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
if (favicon) favicon.href = iconUrl
document.title = window.location.pathname === '/soulsilver' ? 'SoulSilver | Dexu' : 'Jogos | Dexu'

const upcomingGames = ['HeartGold', 'Emerald', 'Platinum'] as const

type PlannedArea = {
  title: string
  detail: string
}

const plannedAreas: readonly PlannedArea[] = [
  { title: 'Criar time', detail: 'Comece um plano para a campanha de SoulSilver.' },
  { title: 'Times salvos', detail: 'Volte aos planos que você criou.' },
  { title: 'Pokédex', detail: 'Explore o catálogo regional no contexto do jogo.' },
]

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="brand">
        <img className="brand__logo" src={logoUrl} alt="Dexu. Monte, explore, conecte." />
      </div>
      <span className="header-context">Protótipo privado</span>
    </header>
  )
}

function EntryPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="page-shell">
        <section className="entry-heading" aria-labelledby="entry-title">
          <h1 id="entry-title">Escolha seu jogo</h1>
          <p>Planeje seu time Pokémon com o contexto da campanha. SoulSilver é o primeiro jogo disponível.</p>
        </section>

        <a className="featured-game" href="/soulsilver" aria-label="Entrar em SoulSilver">
          <div className="featured-game__content">
            <span className="availability">Único jogo disponível</span>
            <h2>SoulSilver</h2>
            <p>Uma jornada por Johto e Kanto até antes do primeiro confronto com Red.</p>
            <span className="primary-action">Entrar em SoulSilver <span aria-hidden="true">→</span></span>
          </div>
          <div className="featured-game__art" aria-hidden="true">
            <img src={iconUrl} alt="" />
          </div>
        </a>

        <section className="other-games" aria-labelledby="other-games-title">
          <div className="section-heading">
            <h2 id="other-games-title">Outros jogos</h2>
            <p>Ainda não há suporte para estas versões.</p>
          </div>
          <ul className="other-games__list">
            {upcomingGames.map((game) => (
              <li key={game}>
                <span className="other-games__name">{game}</span>
                <span className="other-games__status">Em estudo, sem previsão</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

function SoulSilverPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="page-shell page-shell--game">
        <a className="back-link" href="/">← Voltar aos jogos</a>
        <section className="area-hero" aria-labelledby="game-title">
          <div className="area-hero__copy">
            <span className="area-hero__eyebrow">Pokémon</span>
            <h1 id="game-title">SoulSilver</h1>
            <p>Seu espaço para planejar um time Pokémon e consultar a campanha.</p>
          </div>
          <dl className="area-hero__facts">
            <div><dt>Regiões</dt><dd>Johto e Kanto</dd></div>
            <div><dt>Marco da campanha</dt><dd>Antes do primeiro confronto com Red</dd></div>
          </dl>
        </section>

        <section className="planned-section" aria-labelledby="planned-title">
          <div className="section-heading">
            <h2 id="planned-title">O que vem nesta área</h2>
            <p>Estas entradas serão habilitadas nas próximas etapas do protótipo.</p>
          </div>
          <ul className="planned-list">
            {plannedAreas.map((area) => (
              <li key={area.title}>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.detail}</p>
                </div>
                <span>Ainda não disponível</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      {window.location.pathname === '/soulsilver' ? <SoulSilverPage /> : <EntryPage />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
