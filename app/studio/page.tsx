import { InnerPage, PageStep } from '@/components/inner-page';
import { SiteLink } from '@/components/site-link';
import { StudioWorkbench } from '@/components/studio-workbench';

export const metadata = { title: 'Studio' };
export const dynamic = 'force-static';

export default function StudioPage() {
  return (
    <InnerPage
      active="studio"
      note="Working studio"
      title="Catch the spark before it disappears into the scrub."
      intro="Five browser-local builders turn a first thought into clear, portable Markdown for people and AI to keep shaping."
      image="/assets/hero-studio.webp"
      imageAlt="Generated GenAI concept artwork of animal podcasters using microphones, notebooks, headphones and a colourful control deck"
    >
      <section className="section-shell studio-intro">
        <p>Nothing here sends a form anywhere. The draft stays on this device until someone copies it, downloads it or clears it.</p>
        <SiteLink className="button button-hot" href="/cockpit">Open the recording cockpit</SiteLink>
      </section>
      <section className="studio-shell"><StudioWorkbench /></section>
      <PageStep previous={['Episode ideas', '/ideas']} next={['Recording cockpit', '/cockpit']} />
    </InnerPage>
  );
}
