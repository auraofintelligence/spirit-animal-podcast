import { FeatureCard, InnerPage, PageStep } from '@/components/inner-page';

export const metadata = { title: 'Episode ideas' };
export const dynamic = 'force-static';

const sparks = [
  ['#16e4f4', 'The animal I needed at seventeen', 'A conversation across time about the values that might have changed an early crossroads.'],
  ['#ffcb45', 'Island time is not empty time', 'What becomes visible when hurry stops being the measure of a worthwhile day?'],
  ['#ff6b57', 'Who gets to tell the local story?', 'Artists, organisers, visitors and residents meet the difference between taking a story and growing one together.'],
  ['#aa7cff', 'The weather is a character', 'Wind, water, ferry rhythm and sudden change as forces that shape work, humour and memory.'],
  ['#78ffca', 'Make a living without losing the life', 'Work, art, care, tourism and enoughness through the values of the guest animal.'],
  ['#ff7edb', 'What young people are already building', 'A future-facing yarn led by what matters now, not by adult guesses about youth.'],
  ['#16e4f4', 'The story behind the artwork', 'One local work becomes a doorway into process, place, failure, persistence and surprise.'],
  ['#ffcb45', 'A visitor leaves a better track', 'Tourism viewed through curiosity, reciprocity, good manners and genuine local exchange.'],
  ['#ff6b57', 'The invention hiding in the shed', 'Makers, fixers, gardeners and tinkerers share the quiet intelligence inside ordinary practice.'],
  ['#aa7cff', 'Older than the algorithm', 'Long memory, changing tools and the human patterns that keep returning in new clothes.'],
  ['#78ffca', 'Joyful responsible abundance', 'What plenty feels like when joy, responsibility and shared life grow together.'],
  ['#ff7edb', 'The project that refused to die', 'A creator follows the long, strange track from first spark to the version that finally found daylight.'],
  ['#16e4f4', 'Small island, giant question', 'A local detail opens into science, art, technology, ecology, spirit or the future of community.'],
  ['#ffcb45', 'A song knows before words do', 'Music, memory and the feeling that arrives before an explanation.'],
  ['#ff6b57', 'The art of changing your mind', 'What the guest animal notices when pride, fear or habit grips the old answer.'],
];

export default function IdeasPage() {
  return (
    <InnerPage
      active="ideas"
      note="Story sparks"
      title="Start local. Go anywhere. Bring something alive back."
      intro="These are open doors, not assigned episodes. A guest, host, listener or passing moment might bend each one into a completely different creature."
      image="/assets/hero-network.webp"
      imageAlt="Generated GenAI concept artwork of animal storytellers, musicians and makers connected across a bright coastal world"
    >
      <section className="section-shell">
        <p className="section-note">Open doors</p>
        <div className="feature-grid">
          {sparks.map(([colour, title, copy]) => <FeatureCard key={title} colour={colour} title={title}><p>{copy}</p></FeatureCard>)}
        </div>
      </section>
      <section className="colour-section">
        <div className="section-shell prose-grid">
          <blockquote className="quote-burst">The topic is not the episode. The living turn inside the conversation is the episode.</blockquote>
          <div className="big-copy">
            <p>A useful seed leaves space for the guest to surprise the plan. It offers an image, a tension, a question and a possible landing without deciding the answer in advance.</p>
            <p>The studio builder turns any spark into a guest note, episode map, segment or run sheet while keeping the first draft on the device.</p>
          </div>
        </div>
      </section>
      <PageStep previous={['Show bits', '/segments']} next={['Studio', '/studio']} />
    </InnerPage>
  );
}
