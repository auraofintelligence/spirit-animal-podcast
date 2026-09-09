import { SiteFooter, SiteHeader } from './site-shell';
import { SiteLink } from './site-link';

export function InnerPage({
  active,
  title,
  intro,
  note,
  image,
  imageAlt,
  children,
}: {
  active: string;
  title: string;
  intro: string;
  note: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
}) {
  const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <>
      <SiteHeader active={active} />
      <main id="top">
        <section className="inner-hero">
          <img src={assetBase + image} alt={imageAlt} width="2048" height="1024" />
          <div className="inner-hero-scrim" />
          <div className="inner-hero-copy">
            <p className="section-note">{note}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function PageStep({
  previous,
  next,
}: {
  previous: [string, string];
  next: [string, string];
}) {
  return (
    <nav className="page-step section-shell" aria-label="Previous and next pages">
      <SiteLink href={previous[1]}><span>Previous</span><strong>{previous[0]}</strong></SiteLink>
      <a className="back-top" href="#top">Back to top</a>
      <SiteLink className="next" href={next[1]}><span>Next</span><strong>{next[0]}</strong></SiteLink>
    </nav>
  );
}

export function FeatureCard({ colour, title, children }: { colour: string; title: string; children: React.ReactNode }) {
  return <article className="feature-card" style={{ '--card-colour': colour } as React.CSSProperties}><h3>{title}</h3><div>{children}</div></article>;
}
