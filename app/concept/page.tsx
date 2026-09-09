import { FeatureCard, InnerPage, PageStep } from '@/components/inner-page';
import { SiteLink } from '@/components/site-link';

export const metadata = { title: 'The big idea' };
export const dynamic = 'force-static';

export default function ConceptPage() {
  return (
    <InnerPage
      active="concept"
      note="The premise"
      title="Choose an animal. Reset the values. Start again."
      intro="A guest arrives as themselves and as the animal they choose. That small shift opens a bigger, freer conversation."
      image="/assets/hero-animal-compass.webp"
      imageAlt="Generated GenAI concept artwork of luminous animal tracks circling a starlit coastal pool"
    >
      <section className="section-shell prose-grid">
        <div>
          <p className="section-note">The shift</p>
          <h2>Human stories arrive with old luggage.</h2>
        </div>
        <div className="big-copy">
          <p>Jobs, reputations, roles, arguments, successes and failures all try to enter the room first.</p>
          <p>The animal interrupts that pattern. A turtle might bring patience. A crow might bring wit. A whale might bring depth. A scrappy little crab might bring sideways courage.</p>
          <p>The guest decides what the animal means. The show follows their answer, not a fixed personality quiz.</p>
        </div>
      </section>

      <section className="colour-section">
        <div className="section-shell">
          <p className="section-note">The values reset</p>
          <h2 className="section-heading">Not a mask. More like a tuning fork.</h2>
          <div className="feature-grid" style={{ marginTop: '2.5rem' }}>
            <FeatureCard colour="#16e4f4" title="Instinct"><p>What feels true before the polished answer arrives?</p></FeatureCard>
            <FeatureCard colour="#ffcb45" title="Values"><p>Which qualities deserve the front seat for this conversation?</p></FeatureCard>
            <FeatureCard colour="#ff6b57" title="Movement"><p>Where does this creature lead when the familiar track runs out?</p></FeatureCard>
            <FeatureCard colour="#aa7cff" title="Play"><p>Humour loosens the knots without making the story smaller.</p></FeatureCard>
            <FeatureCard colour="#78ffca" title="Memory"><p>The animal notices old tracks, missing pieces and stories worth carrying.</p></FeatureCard>
            <FeatureCard colour="#ff7edb" title="Possibility"><p>The conversation leaves room for a different ending.</p></FeatureCard>
          </div>
        </div>
      </section>

      <section className="section-shell prose-grid">
        <blockquote className="quote-burst">What would your animal refuse to pretend about?</blockquote>
        <div className="big-copy">
          <p>Some episodes stay funny and light. Some go deep. Some become animated scenes, local field recordings, live gatherings, short films, songs or strange little public experiments.</p>
          <p>The format holds locals, visitors, artists, podcasters, older voices, young voices and people who have never touched a microphone. Nobody needs a grand title to bring a worthwhile story.</p>
          <SiteLink className="text-link" href="/compass">Meet the Animal Compass <span aria-hidden="true">&rarr;</span></SiteLink>
        </div>
      </section>

      <section className="section-shell">
        <p className="section-note">A loose episode shape</p>
        <div className="number-rail">
          <article className="number-step"><div><h3>The arrival</h3><p>The guest names the animal, its energy and the qualities they brought into the room.</p></div></article>
          <article className="number-step"><div><h3>The old track</h3><p>The human story, habit or pressure that has been running the show.</p></div></article>
          <article className="number-step"><div><h3>The wild turn</h3><p>A recurring bit, hard question, memory, joke or surprising side trail shifts the energy.</p></div></article>
          <article className="number-step"><div><h3>The values reset</h3><p>The animal names what matters now and what no longer belongs at the wheel.</p></div></article>
          <article className="number-step"><div><h3>The track left behind</h3><p>A question, action, laugh, image or invitation travels home with the listener.</p></div></article>
        </div>
      </section>
      <PageStep previous={['Home', '/']} next={['Animal compass', '/compass']} />
    </InnerPage>
  );
}
