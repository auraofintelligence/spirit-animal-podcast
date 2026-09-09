import { InnerPage, PageStep } from '@/components/inner-page';

export const metadata = { title: 'The network' };
export const dynamic = 'force-static';

const projects = [
  {
    name: 'Minjerribah Screen & Media Network',
    role: 'The wider screen, sound, training and story network around the podcast.',
    href: 'https://auraofintelligence.github.io/minjerribah-screen-media-network/',
  },
  {
    name: 'Ready S.E.T. Co-op Cultural Intelligence Node',
    role: 'A public project doorway for practical collaboration, trust and community-led work.',
    href: 'https://auraofintelligence.github.io/ready-set-co-op-cultural-intelligence-node/projects.html',
  },
  {
    name: 'Project Atlas',
    role: 'The public memory map connecting media projects with the rest of the wider Aura ecosystem.',
    href: 'https://auraofintelligence.github.io/project-atlas/?query=media&year=&family=&page=&connections=&sort=newest',
  },
  {
    name: 'Stradbroke Grants Lab',
    role: 'The evidence and funding workbench when a podcast idea grows into a real public project.',
    href: 'https://auraofintelligence.github.io/stradbroke-grants-lab/index.html',
  },
  {
    name: 'Strange But True',
    role: 'Luke Nathan Hayes public doorway for local tech, art, ideas and useful experiments.',
    href: 'https://auraofintelligence.github.io/strange-but-true/index.html',
  },
];

export default function NetworkPage() {
  return (
    <InnerPage
      active="network"
      note="Connected work"
      title="The podcast is one bright animal in a much larger habitat."
      intro="Each connected project holds its own job and identity. The podcast carries voices, questions, art and ideas between them without turning the show into a catalogue."
      image="/assets/hero-network.webp"
      imageAlt="Generated GenAI concept artwork of a joyful network of animal artists, storytellers and makers across a luminous coastal landscape"
    >
      <section className="section-shell">
        <p className="section-note">Related public places</p>
        <div className="network-list">
          {projects.map((project, index) => (
            <a key={project.name} href={project.href} className="network-row">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{project.name}</h2><p>{project.role}</p></div>
              <strong aria-hidden="true">&nearr;</strong>
            </a>
          ))}
        </div>
      </section>
      <PageStep previous={['Recording cockpit', '/cockpit']} next={['About', '/about']} />
    </InnerPage>
  );
}
