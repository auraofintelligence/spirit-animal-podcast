import { InnerPage, PageStep } from '@/components/inner-page';
import { RecordingCockpit } from '@/components/recording-cockpit';

export const metadata = { title: 'Recording cockpit' };
export const dynamic = 'force-static';

export default function CockpitPage() {
  return (
    <InnerPage
      active="studio"
      note="Recording cockpit"
      title="Keep the room alive. Mark the moments worth finding later."
      intro="A touch-friendly local panel for run sheet beats, timers, keep and cut markers, edit notes and portable session logs."
      image="/assets/hero-studio.webp"
      imageAlt="Generated GenAI concept artwork of a vibrant animal podcast crew operating microphones, headphones and recording controls"
    >
      <section className="section-shell cockpit-intro">
        <p>The cockpit does not record audio. It keeps time and makes a timestamped map for the edit. Draft beats and session marks stay in this browser.</p>
      </section>
      <section className="cockpit-shell"><RecordingCockpit /></section>
      <PageStep previous={['Studio', '/studio']} next={['The network', '/network']} />
    </InnerPage>
  );
}
