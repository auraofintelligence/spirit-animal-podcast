'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Field = { id: string; label: string; prompt: string; long?: boolean };
type Builder = { label: string; file: string; intro: string; fields: Field[] };

const builders: Record<string, Builder> = {
  guest: {
    label: 'Guest',
    file: 'guest-notes',
    intro: 'The person, the animal they chose and the conversation they want to have.',
    fields: [
      { id: 'guestName', label: 'Guest name', prompt: 'Name used for the show' },
      { id: 'animal', label: 'Chosen animal', prompt: 'Their own choice' },
      { id: 'animalName', label: 'Animal nickname', prompt: 'Optional show name' },
      { id: 'values', label: 'Animal values', prompt: 'Three to five qualities, in their words', long: true },
      { id: 'story', label: 'The story calling today', prompt: 'What wants to be talked about?', long: true },
      { id: 'avoid', label: 'Leave outside the recording', prompt: 'Private areas, tired questions or firm boundaries', long: true },
    ],
  },
  episode: {
    label: 'Episode',
    file: 'episode-map',
    intro: 'A clear spine for the episode, with enough room for the unexpected.',
    fields: [
      { id: 'title', label: 'Working title', prompt: 'Short, alive and specific' },
      { id: 'question', label: 'Big question', prompt: 'The question worth following', long: true },
      { id: 'oldTrack', label: 'Old track', prompt: 'The human story or habit under pressure', long: true },
      { id: 'wildTurn', label: 'Wild turn', prompt: 'A surprise, scene, segment or shift', long: true },
      { id: 'landing', label: 'Possible landing', prompt: 'A value, image, action or open question', long: true },
      { id: 'sources', label: 'Source notes', prompt: 'Facts, links and details needing a fresh check', long: true },
    ],
  },
  runsheet: {
    label: 'Run sheet',
    file: 'run-sheet',
    intro: 'A live rhythm for the room, not a cage around the conversation.',
    fields: [
      { id: 'episode', label: 'Episode', prompt: 'Working episode name' },
      { id: 'opening', label: 'Opening beat', prompt: 'Animal arrival, cold open or first question', long: true },
      { id: 'middle', label: 'Main yarn', prompt: 'Key beats in loose order', long: true },
      { id: 'segment', label: 'Show bit', prompt: 'One or two recurring segments', long: true },
      { id: 'reset', label: 'Values reset', prompt: 'Where the animal view returns', long: true },
      { id: 'close', label: 'Leave a track', prompt: 'Closing image, question or invitation', long: true },
    ],
  },
  segment: {
    label: 'Segment',
    file: 'segment-seed',
    intro: 'A repeatable show bit with its own energy and a clean return to the yarn.',
    fields: [
      { id: 'name', label: 'Segment name', prompt: 'A name that belongs on a button' },
      { id: 'job', label: 'What it changes', prompt: 'Energy, clarity, laughter, evidence or pace', long: true },
      { id: 'trigger', label: 'Entry trigger', prompt: 'Sound, line, visual or conversation cue' },
      { id: 'beats', label: 'Three quick beats', prompt: 'Beginning, turn and landing', long: true },
      { id: 'return', label: 'Return to the yarn', prompt: 'The clean handoff back', long: true },
      { id: 'check', label: 'Fresh check', prompt: 'Current facts, rights or details to confirm', long: true },
    ],
  },
  source: {
    label: 'Source trail',
    file: 'source-note',
    intro: 'A small evidence trail for any factual claim that matters on air.',
    fields: [
      { id: 'claim', label: 'Claim or question', prompt: 'What needs grounding?', long: true },
      { id: 'sourceTitle', label: 'Source title', prompt: 'Name of the strongest source' },
      { id: 'link', label: 'Public link', prompt: 'Full web address' },
      { id: 'checked', label: 'Date checked', prompt: 'YYYY-MM-DD' },
      { id: 'finding', label: 'Plain-language finding', prompt: 'What the source actually supports', long: true },
      { id: 'unknown', label: 'Still unknown', prompt: 'What remains open or uncertain', long: true },
    ],
  },
};

function safeSlug(value: string, fallback: string) {
  return (value || fallback).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function StudioWorkbench() {
  const [active, setActive] = useState('guest');
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [status, setStatus] = useState('Drafts stay in this browser until copied or downloaded.');

  useEffect(() => {
    const saved = localStorage.getItem('spirit-animal-studio');
    if (saved) {
      try { setValues(JSON.parse(saved)); } catch { setValues({}); }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(values).length) localStorage.setItem('spirit-animal-studio', JSON.stringify(values));
  }, [values]);

  const builder = builders[active];
  const current = values[active] || {};
  const markdown = useMemo(() => {
    const title = current.title || current.name || current.episode || current.guestName || builder.label;
    const body = builder.fields.map((field) => '## ' + field.label + '\n\n' + (current[field.id] || '')).join('\n\n');
    return '# ' + title + '\n\nBuilder: The Spirit Animal Podcast ' + builder.label + '\n\n' + body + '\n';
  }, [active, builder, current]);

  function update(id: string, value: string) {
    setValues((all) => ({ ...all, [active]: { ...(all[active] || {}), [id]: value } }));
    setStatus('Saved in this browser.');
  }

  async function copy() {
    await navigator.clipboard.writeText(markdown);
    setStatus('Markdown copied.');
  }

  function download() {
    const title = current.title || current.name || current.episode || current.guestName || builder.file;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = safeSlug(title, builder.file) + '.md';
    link.click();
    URL.revokeObjectURL(href);
    setStatus('Markdown downloaded.');
  }

  function clear() {
    setValues((all) => ({ ...all, [active]: {} }));
    setStatus(builder.label + ' draft cleared.');
  }

  return (
    <Tabs value={active} onValueChange={(value) => setActive(String(value))} className="studio-tabs">
      <TabsList className="studio-tab-list" aria-label="Studio builders">
        {Object.entries(builders).map(([key, item]) => <TabsTrigger key={key} value={key}>{item.label}</TabsTrigger>)}
      </TabsList>
      {Object.entries(builders).map(([key, item]) => (
        <TabsContent key={key} value={key}>
          <div className="studio-grid">
            <section className="builder-panel">
              <p className="section-note">{item.label} builder</p>
              <h2>{item.intro}</h2>
              <div className="field-list">
                {item.fields.map((field) => (
                  <label key={field.id}>
                    <span>{field.label}</span>
                    {field.long
                      ? <Textarea className="studio-input" value={current[field.id] || ''} onChange={(event) => update(field.id, event.target.value)} placeholder={field.prompt} />
                      : <Input className="studio-input" value={current[field.id] || ''} onChange={(event) => update(field.id, event.target.value)} placeholder={field.prompt} />
                    }
                  </label>
                ))}
              </div>
            </section>
            <aside className="preview-panel">
              <p className="section-note">Live Markdown</p>
              <pre>{markdown}</pre>
              <div className="builder-actions">
                <Button className="studio-button hot" size="lg" onClick={download}>Download .md</Button>
                <Button className="studio-button" variant="outline" size="lg" onClick={copy}>Copy Markdown</Button>
                <Button className="studio-button quiet" variant="ghost" size="lg" onClick={clear}>Clear draft</Button>
              </div>
              <p className="status-line" role="status" aria-live="polite">{status}</p>
            </aside>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
