import Link from 'next/link';

const navItems = [
  ['concept', 'The idea', '/concept'],
  ['compass', 'Animal compass', '/compass'],
  ['segments', 'Show bits', '/segments'],
  ['ideas', 'Episode ideas', '/ideas'],
  ['studio', 'Studio', '/studio'],
  ['network', 'The network', '/network'],
  ['about', 'About', '/about'],
] as const;

export function SiteHeader({ active }: { active: string }) {
  const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="The Spirit Animal Podcast home">
        <img src={assetBase + '/assets/spirit-animal-mark.webp'} alt="" width="72" height="72" />
        <span><strong>The Spirit Animal</strong><small>Podcast</small></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map(([key, label, href]) => <Link key={key} className={active === key ? 'active' : ''} href={href}>{label}</Link>)}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <footer className="site-footer">
      <div className="footer-mark">
        <img src={assetBase + '/assets/spirit-animal-mark.webp'} alt="" width="88" height="88" />
        <div><strong>The Spirit Animal Podcast</strong><p>Bold conversations. Guest-chosen animals. Values with a pulse.</p></div>
      </div>
      <div className="footer-links">
        <Link href="/about">About this project</Link>
        <Link href="/network">Connected projects</Link>
        <a href="https://github.com/auraofintelligence/spirit-animal-podcast">Public source</a>
        <a href="https://auraofintelligence.github.io/spirit-animal-podcast/">Public site</a>
      </div>
      <p className="footer-note">Built on Minjerribah / North Stradbroke Island. GenAI concept artwork is labelled in its alt text.</p>
    </footer>
  );
}
