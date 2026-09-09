import { AnimalCompass } from '@/components/animal-compass';
import { InnerPage, PageStep } from '@/components/inner-page';

export const metadata = { title: 'Animal compass' };
export const dynamic = 'force-static';

export default function CompassPage() {
  return (
    <InnerPage
      active="compass"
      note="Animal compass"
      title="The animal is yours. The meaning is yours. Follow the pull."
      intro="A private, browser-local values reset for guests, listeners and anyone who feels a different creature knocking at the door."
      image="/assets/hero-animal-compass.webp"
      imageAlt="Generated GenAI concept artwork of many luminous animal tracks meeting around a reflective coastal pool"
    >
      <section className="section-shell compass-intro">
        <p className="section-note">No quiz. No assigned answer.</p>
        <h2 className="section-heading">Notice the animal that already has your attention.</h2>
        <div className="chip-cloud" aria-label="Animal inspiration">
          {['Kangaroo', 'Turtle', 'Owl', 'Dolphin', 'Fruit bat', 'Goanna', 'Cockatoo', 'Whale', 'Crow', 'Fox', 'Crab', 'Dragon', 'Something unnamed'].map((animal) => <span key={animal} className="chip">{animal}</span>)}
        </div>
      </section>
      <section className="compass-shell"><AnimalCompass /></section>
      <PageStep previous={['The idea', '/concept']} next={['Show bits', '/segments']} />
    </InnerPage>
  );
}
