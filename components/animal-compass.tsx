'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const valueWords = [
  'Courage', 'Patience', 'Play', 'Curiosity', 'Loyalty', 'Freedom', 'Care', 'Rest',
  'Mischief', 'Focus', 'Grace', 'Adaptability', 'Strength', 'Wonder', 'Honesty',
  'Community', 'Movement', 'Stillness', 'Protection', 'Joy',
];

type Compass = {
  name: string;
  animal: string;
  nickname: string;
  pull: string;
  values: string[];
  oldStory: string;
  animalMove: string;
  track: string;
};

const blank: Compass = { name: '', animal: '', nickname: '', pull: '', values: [], oldStory: '', animalMove: '', track: '' };

export function AnimalCompass() {
  const [form, setForm] = useState<Compass>(blank);
  const [status, setStatus] = useState('Nothing leaves this browser.');

  useEffect(() => {
    const saved = localStorage.getItem('spirit-animal-compass');
    if (saved) {
      try { setForm({ ...blank, ...JSON.parse(saved) }); } catch { setForm(blank); }
    }
  }, []);

  useEffect(() => {
    if (form.animal || form.name || form.values.length) localStorage.setItem('spirit-animal-compass', JSON.stringify(form));
  }, [form]);

  const title = form.nickname || form.animal || 'Your animal';
  const markdown = useMemo(() => [
    '# ' + title + ' - Animal Compass',
    '',
    '**Name:** ' + form.name,
    '**Animal:** ' + form.animal,
    '**Animal nickname:** ' + form.nickname,
    '',
    '## The pull',
    '',
    form.pull,
    '',
    '## Values leading today',
    '',
    form.values.map((value) => '- ' + value).join('\n'),
    '',
    '## The old story losing the wheel',
    '',
    form.oldStory,
    '',
    '## The animal move',
    '',
    form.animalMove,
    '',
    '## The track I am leaving',
    '',
    form.track,
    '',
  ].join('\n'), [form, title]);

  function update<K extends keyof Compass>(key: K, value: Compass[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setStatus('Saved in this browser.');
  }

  function toggleValue(word: string) {
    const values = form.values.includes(word) ? form.values.filter((item) => item !== word) : [...form.values, word];
    update('values', values);
  }

  async function copy() {
    await navigator.clipboard.writeText(markdown);
    setStatus('Compass copied as Markdown.');
  }

  function download() {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = (form.animal || 'animal-compass').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
    link.click();
    URL.revokeObjectURL(href);
    setStatus('Compass downloaded.');
  }

  function clear() {
    setForm(blank);
    localStorage.removeItem('spirit-animal-compass');
    setStatus('Compass cleared.');
  }

  return (
    <div className="compass-grid">
      <section className="compass-form">
        <div className="field-pair">
          <label><span>Your name</span><Input className="studio-input" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="The name that belongs here" /></label>
          <label><span>Your chosen animal</span><Input className="studio-input" value={form.animal} onChange={(event) => update('animal', event.target.value)} placeholder="Any real, mythical or gloriously uncertain creature" /></label>
        </div>
        <label><span>Animal nickname</span><Input className="studio-input" value={form.nickname} onChange={(event) => update('nickname', event.target.value)} placeholder="Optional show name" /></label>
        <label><span>What pulls you towards this animal?</span><Textarea className="studio-input" value={form.pull} onChange={(event) => update('pull', event.target.value)} placeholder="A memory, movement, instinct, quality, joke or mystery" /></label>
        <fieldset className="value-fieldset">
          <legend>Which values feel alive today?</legend>
          <p>These words are sparks. Your own words belong here too.</p>
          <div className="value-buttons">
            {valueWords.map((word) => <Button key={word} type="button" className="value-button" variant="outline" aria-pressed={form.values.includes(word)} onClick={() => toggleValue(word)}>{word}</Button>)}
          </div>
          <Input className="studio-input" aria-label="Add your own value" placeholder="Add another value, then press Enter" onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              const value = event.currentTarget.value.trim();
              if (value && !form.values.includes(value)) update('values', [...form.values, value]);
              event.currentTarget.value = '';
            }
          }} />
        </fieldset>
        <label><span>Which old story is losing the wheel?</span><Textarea className="studio-input" value={form.oldStory} onChange={(event) => update('oldStory', event.target.value)} placeholder="A role, habit, fear or expectation ready to move aside" /></label>
        <label><span>What does the animal do next?</span><Textarea className="studio-input" value={form.animalMove} onChange={(event) => update('animalMove', event.target.value)} placeholder="The instinctive move, described in your own words" /></label>
        <label><span>What track are you leaving from here?</span><Textarea className="studio-input" value={form.track} onChange={(event) => update('track', event.target.value)} placeholder="A question, action, feeling or experiment" /></label>
      </section>

      <aside className="compass-card">
        <p className="section-note">Your live compass</p>
        <h2>{title}</h2>
        <p className="compass-pull">{form.pull || 'The reason this animal arrived will appear here.'}</p>
        <div className="compass-values">
          {form.values.length ? form.values.map((value) => <span key={value}>{value}</span>) : <em>No values chosen yet.</em>}
        </div>
        <dl>
          <div><dt>Old story</dt><dd>{form.oldStory || 'Still open'}</dd></div>
          <div><dt>Animal move</dt><dd>{form.animalMove || 'Still open'}</dd></div>
          <div><dt>Track ahead</dt><dd>{form.track || 'Still open'}</dd></div>
        </dl>
        <div className="builder-actions">
          <Button className="studio-button hot" size="lg" onClick={download}>Download compass</Button>
          <Button className="studio-button" variant="outline" size="lg" onClick={copy}>Copy Markdown</Button>
          <Button className="studio-button quiet" variant="ghost" size="lg" onClick={clear}>Clear</Button>
        </div>
        <p className="status-line" role="status" aria-live="polite">{status}</p>
      </aside>
    </div>
  );
}
