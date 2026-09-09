import { FeatureCard, InnerPage, PageStep } from '@/components/inner-page';

export const metadata = { title: 'Show bits' };
export const dynamic = 'force-static';

const segments = [
  ['#16e4f4', 'Animal Entrance', 'The guest animal enters the show world with a sound, movement, nickname or tiny act of glorious theatre.'],
  ['#ffcb45', 'Instinct Check', 'A fast pause in the human overthinking: what does the animal notice first?'],
  ['#ff6b57', 'Shed the Skin', 'One role, belief or performance that no longer fits gets left on the studio floor.'],
  ['#aa7cff', 'Creature Feature', 'A joyful salute to real effort, art, care, repair or local brilliance.'],
  ['#78ffca', 'Wild Claim Check', 'A strange claim meets dates, sources, evidence and plain language before it runs loose.'],
  ['#ff7edb', 'Weather Has Entered the Chat', 'Wind, rain, heat, surf, ferries and island conditions get their own speaking part.'],
  ['#16e4f4', 'Island Sound', 'A local song, soundscape, voice, rhythm or field recording changes the scene.'],
  ['#ffcb45', 'Art in the Wild', 'A work, image, prop, performance or visual idea opens a new route into the topic.'],
  ['#ff6b57', 'Tiny Big Question', 'One deceptively small question punches a doorway through a very large subject.'],
  ['#aa7cff', 'The Long Memory', 'An older story, archive, hard-earned lesson or recurring local pattern gets time to breathe.'],
  ['#78ffca', 'Future Voice', 'Young people describe the world they expect to inherit, refuse or invent.'],
  ['#ff7edb', 'One Useful Thing', 'The conversation lands one practical idea in words people remember.'],
  ['#16e4f4', 'Three Minute Reset', 'Three minutes to move, breathe, laugh, draw, walk or look at the subject from another creature.'],
  ['#ffcb45', 'The Waterline', 'The yarn travels from one island detail to the wider world, then returns with something useful.'],
  ['#ff6b57', 'Audience Menagerie', 'Listener questions arrive under the animal names they chose for themselves.'],
  ['#aa7cff', 'Leave a Track', 'The closing thought is not a moral. It is a track worth following after the episode ends.'],
];

export default function SegmentsPage() {
  return (
    <InnerPage
      active="segments"
      note="Recurring segments"
      title="A show bit should crackle, turn the air and get out."
      intro="These recurring lanes bring rhythm without locking the podcast into a script. Pick what matches the guest, the day and the living conversation."
      image="/assets/hero-studio.webp"
      imageAlt="Generated GenAI concept artwork of animal podcasters around a vivid island studio desk at dusk"
    >
      <section className="section-shell">
        <p className="section-note">The segment deck</p>
        <div className="feature-grid">
          {segments.map(([colour, title, copy]) => <FeatureCard key={title} colour={colour} title={title}><p>{copy}</p></FeatureCard>)}
        </div>
      </section>
      <section className="colour-section">
        <div className="section-shell prose-grid">
          <div><p className="section-note">Show rhythm</p><h2>Open hot. Wander honestly. Land somewhere real.</h2></div>
          <div className="big-copy">
            <p>A cold open might begin with the weather, a wild claim or the animal entrance. The main yarn earns room to breathe. A playful segment arrives when the energy needs a turn.</p>
            <p>Fresh news, scores, forecasts, public claims and research receive a source check close to recording time. Comedy releases pressure. It never needs a smaller person as its target.</p>
          </div>
        </div>
      </section>
      <PageStep previous={['Animal compass', '/compass']} next={['Episode ideas', '/ideas']} />
    </InnerPage>
  );
}
