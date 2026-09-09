import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { SiteLink } from '@/components/site-link';

export default function Home() {
  const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <>
      <SiteHeader active="home" />
      <main>
        <section className="home-hero">
          <img className="home-hero-image" src={assetBase + '/assets/hero-gathering.webp'} alt="Generated GenAI concept artwork of many animal characters sharing microphones around a glowing table beside the ocean" width="2048" height="1024" />
          <div className="hero-scrim" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="home-hero-copy">
            <p className="hero-place">Minjerribah / North Stradbroke Island</p>
            <h1>Step out of the human story.</h1>
            <p className="hero-line">Meet yourself as an animal.</p>
            <p className="hero-intro">Guests choose the creature. The creature reveals the values. The yarn goes somewhere honest, funny and gloriously unexpected.</p>
            <div className="hero-actions">
              <SiteLink className="button button-hot" href="/compass">Find your animal</SiteLink>
              <SiteLink className="button button-glass" href="/studio">Enter the studio</SiteLink>
            </div>
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>JOYFUL</span><strong>WILD</strong><span>TRUE</span></div>
        </section>

        <section className="signal-strip" aria-label="The show in three beats">
          <p><span>01</span> Choose the animal</p>
          <p><span>02</span> Name the values</p>
          <p><span>03</span> Follow the yarn</p>
        </section>

        <section className="home-intro section-shell">
          <div><p className="section-note">The original idea returns</p><h2>A podcast that changes the shape of the conversation.</h2></div>
          <div className="home-intro-copy">
            <p>The Spirit Animal Podcast begins with one bright question: which animal feels most like the version of you that is trying to come through?</p>
            <p>The answer becomes a compass. Instinct, play, patience, courage, mischief, loyalty, movement, rest and wonder all become fresh ways into a real conversation.</p>
          </div>
        </section>

        <section className="portal-grid section-shell" aria-label="Explore the podcast">
          <SiteLink className="portal-card portal-cyan" href="/concept"><span>THE BIG IDEA</span><h2>Why an animal changes everything</h2><p>Meet the premise, the rhythm and the values reset at the heart of the show.</p><strong>Follow the idea</strong></SiteLink>
          <SiteLink className="portal-card portal-coral" href="/segments"><span>SHOW BITS</span><h2>Recurring segments with teeth, wings and fins</h2><p>Fast, memorable beats for news, art, science, local life and beautiful chaos.</p><strong>Open the segment deck</strong></SiteLink>
          <SiteLink className="portal-card portal-gold" href="/ideas"><span>STORY SPARKS</span><h2>A whole island of episode ideas</h2><p>Local voices, visiting minds, artists, young people, older people and wild questions.</p><strong>Browse the sparks</strong></SiteLink>
          <SiteLink className="portal-card portal-violet" href="/studio"><span>WORKING STUDIO</span><h2>Turn a spark into a record-ready show</h2><p>Guest notes, episode maps, run sheets, source trails and a live recording cockpit.</p><strong>Start building</strong></SiteLink>
        </section>

        <section className="closing-call section-shell">
          <p className="section-note">One question before the microphones turn on</p>
          <h2>What becomes possible when your values lead and your old story stops driving?</h2>
          <SiteLink className="text-link" href="/compass">Open the Animal Compass <span aria-hidden="true">&rarr;</span></SiteLink>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
