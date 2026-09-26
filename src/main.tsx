import React from 'react'
import { createRoot } from 'react-dom/client'
import logoUrl from '../Logo.png'
import iconUrl from '../Icon.png'
import './styles.css'

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
if (favicon) favicon.href = iconUrl

const upcomingGames = ['HeartGold', 'Emerald', 'Platinum']

function EntryPage() {
  return (
    <>
      <header className="site-header">
        <span className="site-header__label">Dexu</span>
        <span className="site-header__aside">Protótipo privado</span>
      </header>
      <main id="conteudo" className="page-shell">
        <section className="entry-intro" aria-labelledby="entry-title">
          <div className="brand-panel">
            <img src={logoUrl} alt="Dexu. Monte, explore, conecte." />
          </div>
          <div className="entry-intro__copy">
            <p className="eyebrow">Um lugar para pensar seu time</p>
            <h1 id="entry-title">Escolha seu jogo.</h1>
            <p>
              Planeje a campanha com clareza. Explore as possibilidades de cada jogo
              e construa um time com escolhas que façam sentido para sua jornada.
            </p>
          </div>
        </section>

        <section className="game-section" aria-labelledby="games-title">
          <div className="section-heading">
            <h2 id="games-title">Jogos</h2>
            <p>SoulSilver é o único jogo disponível neste protótipo.</p>
          </div>
          <div className="game-grid">
            <article className="game-card game-card--available" aria-labelledby="soulsilver-card-title">
              <div className="game-card__top">
                <span className="game-card__number" aria-hidden="true">01</span>
                <span className="status status--available">Disponível</span>
              </div>
              <div>
                <h3 id="soulsilver-card-title">SoulSilver</h3>
                <p>Johto e Kanto, com o recorte da campanha até antes do primeiro confronto com Red.</p>
              </div>
              <a className="game-card__link" href="/soulsilver">
                Entrar em SoulSilver <span aria-hidden="true">↗</span>
              </a>
            </article>
            {upcomingGames.map((game, index) => (
              <article className="game-card game-card--upcoming" aria-label={game} key={game}>
                <div className="game-card__top">
                  <span className="game-card__number" aria-hidden="true">0{index + 2}</span>
                  <span className="game-card__mark" aria-hidden="true" />
                </div>
                <div>
                  <h3>{game}</h3>
                  <p>Em estudo, sem previsão</p>
                </div>
                <span className="game-card__note">Sem acesso neste protótipo</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

const futureAreas = [
  {
    title: 'Criar time',
    detail: 'Monte um plano para a campanha de SoulSilver.',
    number: '01',
  },
  {
    title: 'Times salvos',
    detail: 'Retome e organize os times que você criar.',
    number: '02',
  },
  {
    title: 'Pokédex',
    detail: 'Consulte o catálogo regional e seu contexto.',
    number: '03',
  },
]

function SoulSilverPage() {
  return (
    <>
      <header className="site-header site-header--game">
        <a className="brand-link" href="/" aria-label="Dexu, voltar para jogos">
          <img src={iconUrl} alt="" />
        </a>
        <span className="site-header__aside">Área SoulSilver</span>
      </header>
      <main id="conteudo" className="page-shell page-shell--game">
        <a className="back-link" href="/">← Voltar aos jogos</a>
        <section className="game-intro" aria-labelledby="game-title">
          <div className="game-intro__content">
            <p className="eyebrow eyebrow--light">Jogo disponível</p>
            <h1 id="game-title">SoulSilver</h1>
            <p>Seu espaço para planejar a campanha.</p>
          </div>
          <div className="game-intro__accent" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
        <p className="scope-note">
          Recorte previsto: Johto e Kanto, até antes do primeiro confronto com Red.
          As áreas abaixo serão habilitadas nas próximas etapas do protótipo.
        </p>
        <section className="future-section" aria-labelledby="future-title">
          <div className="section-heading">
            <h2 id="future-title">A seguir em SoulSilver</h2>
            <p>Entradas planejadas para explorar, montar e retomar seus times.</p>
          </div>
          <div className="future-grid">
            {futureAreas.map((area) => (
              <article className="future-card" key={area.title} aria-labelledby={`area-${area.number}`}>
                <span className="future-card__number" aria-hidden="true">{area.number}</span>
                <div>
                  <h3 id={`area-${area.number}`}>{area.title}</h3>
                  <p>{area.detail}</p>
                </div>
                <span className="future-card__status">Ainda não disponível</span>
              </article>
            ))}
          </div>
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
