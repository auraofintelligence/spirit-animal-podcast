'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const coreBeats = ['Animal arrival', 'The old track', 'The wild turn', 'Values reset', 'Leave a track'];
type LogItem = { seconds: number; label: string; note?: string };

function clock(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hours, minutes, secs].map((value) => String(value).padStart(2, '0')).join(':');
}

function srtClock(seconds: number) {
  return clock(seconds) + ',000';
}

export function RecordingCockpit() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [beatSeconds, setBeatSeconds] = useState(0);
  const [duration, setDuration] = useState(300);
  const [beats, setBeats] = useState(coreBeats);
  const [beatIndex, setBeatIndex] = useState(0);
  const [beatDraft, setBeatDraft] = useState(coreBeats.join('\n'));
  const [log, setLog] = useState<LogItem[]>([]);
  const [note, setNote] = useState('');
  const [format, setFormat] = useState('md');
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('spirit-animal-cockpit');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Array.isArray(data.beats) && data.beats.length) {
          setBeats(data.beats);
          setBeatDraft(data.beats.join('\n'));
        }
        if (Array.isArray(data.log)) setLog(data.log);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spirit-animal-cockpit', JSON.stringify({ beats, log }));
  }, [beats, log]);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setElapsed((value) => value + 1);
        setBeatSeconds((value) => value + 1);
      }, 1000);
    } else if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [running]);

  const progress = Math.min(100, duration ? (beatSeconds / duration) * 100 : 0);
  const currentBeat = beats[beatIndex] || 'No beat loaded';
  const nextBeat = beats[beatIndex + 1] || 'Open conversation';

  const exportText = useMemo(() => {
    if (format === 'srt') {
      return log.map((item, index) => {
        const next = log[index + 1]?.seconds ?? item.seconds + 2;
        return [index + 1, srtClock(item.seconds) + ' --> ' + srtClock(next), item.label + (item.note ? ': ' + item.note : '')].join('\n');
      }).join('\n\n');
    }
    if (format === 'txt') return log.map((item) => clock(item.seconds) + '  ' + item.label + (item.note ? ' - ' + item.note : '')).join('\n');
    return ['# Spirit Animal Podcast recording log', '', ...log.map((item) => '- **' + clock(item.seconds) + '** ' + item.label + (item.note ? ' - ' + item.note : ''))].join('\n');
  }, [format, log]);

  function mark(label: string, itemNote?: string) {
    setLog((items) => [...items, { seconds: elapsed, label, note: itemNote }]);
    tone(label === 'Cut' ? 190 : label === 'Keep this' ? 720 : 440);
  }

  function tone(frequency: number) {
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const audio = new AudioCtor();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.08, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .16);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + .16);
  }

  function moveBeat(direction: number) {
    const next = Math.min(Math.max(beatIndex + direction, 0), Math.max(beats.length - 1, 0));
    if (next !== beatIndex) mark('Beat change', beats[next]);
    setBeatIndex(next);
    setBeatSeconds(0);
  }

  function loadBeats() {
    const lines = beatDraft.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length) {
      setBeats(lines);
      setBeatIndex(0);
      setBeatSeconds(0);
      mark('Run sheet loaded', lines.length + ' beats');
    }
  }

  function addNote() {
    if (!note.trim()) return;
    mark('Note', note.trim());
    setNote('');
  }

  function downloadLog() {
    const blob = new Blob([exportText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'spirit-animal-recording-log.' + format;
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="cockpit">
      <section className="cockpit-top">
        <div><p className="section-note">Session clock</p><strong>{clock(elapsed)}</strong></div>
        <div className={running ? 'on-air live' : 'on-air'}><span />{running ? 'Rolling' : 'Standby'}</div>
        <div className="cockpit-top-actions">
          <Button className="studio-button hot" size="lg" onClick={() => { setRunning(!running); if (!running) mark('Recording started'); }}>{running ? 'Pause' : 'Start session'}</Button>
          <Button className="studio-button" variant="outline" size="lg" onClick={() => { setRunning(false); setElapsed(0); setBeatSeconds(0); setLog([]); }}>New session</Button>
        </div>
      </section>

      <div className="cockpit-grid">
        <aside className="run-panel">
          <p className="section-note">Run sheet</p>
          <Textarea className="studio-input beat-input" value={beatDraft} onChange={(event) => setBeatDraft(event.target.value)} aria-label="Run sheet beats, one per line" />
          <Button className="studio-button" variant="outline" size="lg" onClick={loadBeats}>Load these beats</Button>
          <ol className="beat-list">
            {beats.map((beat, index) => <li key={beat + index} className={index === beatIndex ? 'active' : index < beatIndex ? 'done' : ''}><button type="button" onClick={() => { setBeatIndex(index); setBeatSeconds(0); }}>{beat}</button></li>)}
          </ol>
        </aside>

        <section className="live-panel">
          <p className="section-note">Current beat</p>
          <h2>{currentBeat}</h2>
          <strong className="beat-clock">{clock(beatSeconds).slice(3)}</strong>
          <label className="duration-field"><span>Target minutes</span><input type="number" min="1" max="120" value={Math.round(duration / 60)} onChange={(event) => setDuration(Math.max(60, Number(event.target.value) * 60))} /></label>
          <div className="beat-progress"><span style={{ width: progress + '%' }} /></div>
          <p className="next-beat">Next: <strong>{nextBeat}</strong></p>
          <div className="beat-nav">
            <Button className="studio-button" variant="outline" size="lg" onClick={() => moveBeat(-1)}>Previous</Button>
            <Button className="studio-button hot" size="lg" onClick={() => moveBeat(1)}>Next beat</Button>
          </div>
          <div className="marker-deck" aria-label="Live markers">
            <button type="button" className="marker keep" onClick={() => mark('Keep this')}>KEEP</button>
            <button type="button" className="marker cut" onClick={() => mark('Cut')}>CUT</button>
            <button type="button" className="marker follow" onClick={() => mark('Follow up')}>FOLLOW</button>
            <button type="button" className="marker laugh" onClick={() => mark('Big laugh')}>LAUGH</button>
            <button type="button" className="marker fact" onClick={() => mark('Source check')}>CHECK</button>
            <button type="button" className="marker wild" onClick={() => mark('Wild turn')}>WILD</button>
          </div>
        </section>

        <aside className="log-panel">
          <p className="section-note">Live log</p>
          <ol className="session-log">
            {log.length ? log.map((item, index) => <li key={index}><time>{clock(item.seconds)}</time><span><strong>{item.label}</strong>{item.note ? <small>{item.note}</small> : null}</span></li>) : <li className="empty-log">Markers and notes land here.</li>}
          </ol>
          <div className="quick-note">
            <Textarea className="studio-input" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Quick edit note" />
            <Button className="studio-button" variant="outline" size="lg" onClick={addNote}>Add note</Button>
          </div>
          <div className="export-row">
            <select value={format} onChange={(event) => setFormat(event.target.value)} aria-label="Export format"><option value="md">Markdown</option><option value="txt">Text</option><option value="srt">Subtitles</option></select>
            <Button className="studio-button hot" size="lg" onClick={downloadLog}>Export log</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
