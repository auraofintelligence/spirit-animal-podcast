import { InnerPage, PageStep } from '@/components/inner-page';

export const metadata = { title: 'About' };
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <InnerPage
      active="about"
      note="About the project"
      title="A bold, public home for the original Spirit Animal Podcast idea."
      intro="Created by Luke Nathan Hayes on Minjerribah / North Stradbroke Island as a joyful conversation format, creative workbench and open invitation to make something real."
      image="/assets/hero-gathering.webp"
      imageAlt="Generated GenAI concept artwork of many animal characters sharing stories beside the ocean at night"
    >
      <section className="section-shell prose-grid">
        <div>
          <p className="section-note">The public home</p>
          <h2>The show and the tools live in the same world.</h2>
        </div>
        <div className="big-copy">
          <p>The public page is <a className="inline-link" href="https://auraofintelligence.github.io/spirit-animal-podcast/">auraofintelligence.github.io/spirit-animal-podcast</a>.</p>
          <p>The public source is <a className="inline-link" href="https://github.com/auraofintelligence/spirit-animal-podcast">github.com/auraofintelligence/spirit-animal-podcast</a>.</p>
          <p>All hero artwork and the paw-and-microphone mark were generated for this project with GenAI. The living identity will keep growing through voices, recordings, drawings, photographs, animation and music made around the show.</p>
        </div>
      </section>
      <section className="colour-section">
        <div className="section-shell prose-grid">
          <blockquote className="quote-burst">This is not the website for a finished podcast. It is part of the instrument that helps the podcast become real.</blockquote>
          <div className="big-copy">
            <p>The site holds the premise, the Animal Compass, episode sparks, recurring show bits, practical planning builders and the recording cockpit.</p>
            <p>The Strange But True Public Source Licence keeps personal and non-commercial exploration open with attribution while commercial and corporate rights remain reserved.</p>
            <a className="text-link" href="https://github.com/auraofintelligence/spirit-animal-podcast/blob/main/LICENCE.md">Read the licence <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </section>
      <PageStep previous={['The network', '/network']} next={['Home', '/']} />
    </InnerPage>
  );
}
