import React from 'react'
import { createRoot } from 'react-dom/client'
import logoUrl from '../assets/visuals/dexu-logo-cutout-to-dark.png'
import iconUrl from '../assets/visuals/dexu-icon-cutout.png'
import { CampaignPokedexPage, SavedTeamsPage, SoulSilverArea, TeamBuilderPage } from './SoulSilver'
import './styles.css'

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
if (favicon) favicon.href = iconUrl
document.title = window.location.pathname.startsWith('/soulsilver') ? 'SoulSilver | Dexu' : 'Jogos | Dexu'

const upcomingGames = ['HeartGold', 'Emerald', 'Platinum'] as const

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

function SoulSilverPage({ path }: { path: string }) {
  const builderId = path.match(/^\/soulsilver\/times\/([a-f0-9-]+)$/)?.[1]
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="page-shell page-shell--game">
        <nav className='breadcrumbs' aria-label='Navegação contextual'><a className='back-link' aria-label={path === '/soulsilver' ? 'Voltar aos jogos' : 'Voltar a SoulSilver'} href={path === '/soulsilver' ? '/' : '/soulsilver'}><span aria-hidden='true'>←</span><span>{path === '/soulsilver' ? 'Jogos' : 'SoulSilver'}</span></a></nav>
        {path === '/soulsilver' ? <SoulSilverArea /> : path === '/soulsilver/pokedex' ? <CampaignPokedexPage /> : path === '/soulsilver/times' ? <SavedTeamsPage /> : builderId ? <TeamBuilderPage id={builderId} /> : <p>Área não encontrada.</p>}
      </main>
    </>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      {window.location.pathname.startsWith('/soulsilver') ? <SoulSilverPage path={window.location.pathname} /> : <EntryPage />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
