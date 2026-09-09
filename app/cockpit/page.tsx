import { RecordingCockpit } from '@/components/recording-cockpit';
import { SiteHeader } from '@/components/site-shell';

export const metadata = { title: 'Spirit Studio recording cockpit' };
export const dynamic = 'force-static';

export default function CockpitPage() {
  return (
    <>
      <SiteHeader active="studio" />
      <main className="recording-page"><RecordingCockpit /></main>
    </>
  );
}
