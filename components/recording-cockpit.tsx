'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const coreBeats = ['Animal arrival', 'The old track', 'The wild turn', 'Values reset', 'Leave a track'];

const markerPads = [
  { label: 'ON AIR', log: 'On air', colour: 'red', key: 'A' },
  { label: 'MIC', log: 'Mic check', colour: 'blue', key: 'M' },
  { label: 'KEEP', log: 'Keep this', colour: 'green', key: 'K' },
  { label: 'CUT', log: 'Scene cut', colour: 'coral', key: 'C' },
  { label: 'FOLLOW', log: 'Follow up', colour: 'gold', key: 'F' },
  { label: 'CHECK', log: 'Source check', colour: 'cyan', key: 'S' },
];

const showPads = [
  { label: 'ANIMAL', log: 'Animal arrives', cue: 'soft', colour: 'cyan' },
  { label: 'VALUES', log: 'Values reset', cue: 'bell', colour: 'gold' },
  { label: 'WILD TURN', log: 'Wild turn', cue: 'wild', colour: 'violet' },
  { label: 'BIG QUESTION', log: 'Big question', cue: 'rise', colour: 'pink' },
  { label: 'LEAVE A TRACK', log: 'Leave a track', cue: 'spark', colour: 'green' },
];

const soundPads = [
  { label: 'MOON BELL', cue: 'bell', colour: 'gold' },
  { label: 'SOFT CUE', cue: 'soft', colour: 'cyan' },
  { label: 'WILD CALL', cue: 'wild', colour: 'violet' },
  { label: 'HEARTBEAT', cue: 'heart', colour: 'coral' },
  { label: 'OCEAN WASH', cue: 'ocean', colour: 'blue' },
  { label: 'SPARK', cue: 'spark', colour: 'pink' },
];

type LogKind = 'marker' | 'cue' | 'beat' | 'note' | 'session';
type LogItem = { id: string; seconds: number; label: string; note?: string; kind: LogKind };
type MobilePanel = 'live' | 'run' | 'deck' | 'log';

function clock(seconds: number, short = false) {
  const safe = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (short) return `${String(minutes + hours * 60).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  return [hours, minutes, secs].map((value) => String(value).padStart(2, '0')).join(':');
}

function srtClock(seconds: number) {
  return clock(seconds) + ',000';
}

function parseRunSheet(text: string) {
  return text
    .split('\n')
    .map((line) => line.replace(/^#{1,6}\s+|^[-*]\s+|^\d+[.)]\s+/, '').trim())
    .filter((line) => line && !line.startsWith('Builder:') && line.length < 140);
}

export function RecordingCockpit() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [beatSeconds, setBeatSeconds] = useState(0);
  const [duration, setDuration] = useState(300);
  const [beats, setBeats] = useState(coreBeats);
  const [beatIndex, setBeatIndex] = useState(0);
  const [beatDraft, setBeatDraft] = useState(coreBeats.join('\n'));
  const [source, setSource] = useState('Spirit Animal house rhythm');
  const [log, setLog] = useState<LogItem[]>([]);
  const [note, setNote] = useState('');
  const [format, setFormat] = useState('md');
  const [notice, setNotice] = useState('Ready for a new session');
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('live');
  const [editingBeats, setEditingBeats] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('spirit-animal-cockpit');
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      if (Array.isArray(data.beats) && data.beats.length) {
        setBeats(data.beats);
        setBeatDraft(data.beats.join('\n'));
      }
      if (Array.isArray(data.log)) setLog(data.log);
      if (typeof data.source === 'string') setSource(data.source);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('spirit-animal-cockpit', JSON.stringify({ beats, log, source }));
  }, [beats, log, source]);

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

  const currentBeat = beats[beatIndex] || 'Open conversation';
  const nextBeat = beats[beatIndex + 1] || 'Open conversation';
  const remaining = duration === 0
    ? 'No time limit'
    : beatSeconds <= duration
      ? `${clock(duration - beatSeconds, true)} remaining`
      : `${clock(beatSeconds - duration, true)} over`;
  const progress = duration === 0 ? 24 : Math.min(100, (beatSeconds / duration) * 100);

  const exportText = useMemo(() => {
    if (format === 'srt') {
      return log.map((item, index) => {
        const next = Math.max(item.seconds + 2, log[index + 1]?.seconds ?? item.seconds + 4);
        return [index + 1, `${srtClock(item.seconds)} --> ${srtClock(next)}`, `${item.label}${item.note ? ': ' + item.note : ''}`].join('\n');
      }).join('\n\n');
    }
    if (format === 'txt') return log.map((item) => `${clock(item.seconds)}  ${item.label}${item.note ? ' - ' + item.note : ''}`).join('\n');
    return [
      '# Spirit Animal Podcast recording log', '', `Run sheet: ${source}`, `Session length: ${clock(elapsed)}`, '',
      ...log.map((item) => `- **${clock(item.seconds)}** ${item.label}${item.note ? ' - ' + item.note : ''}`),
    ].join('\n');
  }, [elapsed, format, log, source]);

  function addLog(label: string, kind: LogKind, itemNote?: string) {
    setLog((items) => [...items, { id: `${Date.now()}-${items.length}`, seconds: elapsed, label, note: itemNote, kind }]);
    setNotice(`${label} marked at ${clock(elapsed)}`);
  }

  function getAudioContext() {
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioContext.current) audioContext.current = new AudioCtor();
    if (audioContext.current.state === 'suspended') void audioContext.current.resume();
    return audioContext.current;
  }

  function playTone(frequency: number, start: number, durationSeconds: number, wave: OscillatorType, gainValue = 0.11) {
    const context = getAudioContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + start);
    gain.gain.setValueAtTime(0.0001, context.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(gainValue, context.currentTime + start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + start + durationSeconds);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + start);
    oscillator.stop(context.currentTime + start + durationSeconds + 0.03);
  }

  function playNoise(durationSeconds = 0.75) {
    const context = getAudioContext();
    if (!context) return;
    const frameCount = Math.floor(context.sampleRate * durationSeconds);
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < frameCount; index += 1) {
      data[index] = (Math.random() * 2 - 1) * Math.sin((index / frameCount) * Math.PI) * 0.15;
    }
    const sourceNode = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    sourceNode.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = 620;
    gain.gain.value = 0.16;
    sourceNode.connect(filter).connect(gain).connect(context.destination);
    sourceNode.start();
  }

  function playCue(name: string) {
    const plans: Record<string, Array<[number, number, number, OscillatorType, number?]>> = {
      soft: [[420, 0, 0.16, 'sine']],
      bell: [[740, 0, 0.5, 'sine'], [1110, 0.05, 0.65, 'sine', 0.07]],
      wild: [[220, 0, 0.28, 'sawtooth'], [330, 0.12, 0.32, 'triangle'], [495, 0.25, 0.4, 'sine']],
      heart: [[110, 0, 0.12, 'sine', 0.15], [110, 0.2, 0.15, 'sine', 0.13]],
      rise: [[392, 0, 0.18, 'triangle'], [523, 0.12, 0.2, 'triangle'], [659, 0.24, 0.3, 'sine']],
      spark: [[988, 0, 0.1, 'sine'], [1480, 0.08, 0.16, 'sine'], [1976, 0.16, 0.22, 'sine', 0.06]],
      cut: [[1280, 0, 0.1, 'square', 0.13], [620, 0.1, 0.14, 'square', 0.12]],
      keep: [[523, 0, 0.13, 'sine'], [784, 0.12, 0.2, 'sine']],
    };
    if (name === 'ocean') return playNoise();
    (plans[name] || plans.soft).forEach(([frequency, start, length, wave, gain]) => playTone(frequency, start, length, wave, gain));
  }

  function mark(label: string, kind: LogKind = 'marker', cue = 'soft', itemNote?: string) {
    addLog(label, kind, itemNote);
    playCue(cue);
  }

  function toggleSession() {
    if (running) {
      setRunning(false);
      addLog('Session paused', 'session');
    } else {
      setRunning(true);
      addLog(elapsed ? 'Session resumed' : 'Recording started', 'session');
    }
  }

  function moveBeat(direction: number) {
    const next = Math.min(Math.max(beatIndex + direction, 0), Math.max(beats.length - 1, 0));
    if (next === beatIndex) return;
    setBeatIndex(next);
    setBeatSeconds(0);
    mark('Beat change', 'beat', 'soft', beats[next]);
  }

  function jumpToBeat(index: number) {
    if (index !== beatIndex) {
      setBeatIndex(index);
      setBeatSeconds(0);
      mark('Beat change', 'beat', 'soft', beats[index]);
    }
    setMobilePanel('live');
  }

  function loadBeats() {
    const lines = parseRunSheet(beatDraft);
    if (!lines.length) return;
    setBeats(lines);
    setBeatIndex(0);
    setBeatSeconds(0);
    setSource('Edited run sheet');
    setEditingBeats(false);
    addLog('Run sheet loaded', 'session', `${lines.length} beats`);
  }

  async function importRunSheet(file?: File) {
    if (!file) return;
    const lines = parseRunSheet(await file.text());
    if (!lines.length) return setNotice('No clear beats found in that file');
    setBeatDraft(lines.join('\n'));
    setBeats(lines);
    setBeatIndex(0);
    setBeatSeconds(0);
    setSource(file.name);
    addLog('Run sheet imported', 'session', file.name);
  }

  function syncStudioRunSheet() {
    const saved = localStorage.getItem('spirit-animal-studio');
    if (!saved) return setNotice('No studio run sheet found on this device');
    try {
      const values = JSON.parse(saved)?.runsheet || {};
      const lines = [values.opening, values.middle, values.segment, values.reset, values.close]
        .flatMap((value) => String(value || '').split('\n')).map((line) => line.trim()).filter(Boolean);
      if (!lines.length) return setNotice('The saved studio run sheet is still empty');
      setBeatDraft(lines.join('\n'));
      setBeats(lines);
      setBeatIndex(0);
      setBeatSeconds(0);
      setSource('Latest Studio run sheet');
      addLog('Studio run sheet synced', 'session', `${lines.length} beats`);
    } catch { setNotice('The saved studio run sheet could not be read'); }
  }

  function useHouseRhythm() {
    setBeatDraft(coreBeats.join('\n'));
    setBeats(coreBeats);
    setBeatIndex(0);
    setBeatSeconds(0);
    setSource('Spirit Animal house rhythm');
    addLog('House rhythm loaded', 'session', `${coreBeats.length} beats`);
  }

  function addNote() {
    if (!note.trim()) return;
    addLog('Edit note', 'note', note.trim());
    setNote('');
  }

  async function copyLog() {
    await navigator.clipboard.writeText(exportText);
    setNotice('Session log copied');
  }

  function downloadLog() {
    const blob = new Blob([exportText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `spirit-animal-recording-log.${format}`;
    link.click();
    URL.revokeObjectURL(href);
    setNotice(`Session log exported as ${format.toUpperCase()}`);
  }

  function newSession() {
    if ((elapsed || log.length) && !window.confirm('Clear the current timer and session log?')) return;
    setRunning(false);
    setElapsed(0);
    setBeatSeconds(0);
    setBeatIndex(0);
    setLog([]);
    setNotice('Fresh session ready');
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  }

  return (
    <div className="spirit-console">
      <section className="console-topbar" aria-label="Recording session controls">
        <div className="console-identity"><span className="console-signal" aria-hidden="true">SA</span><div><small>Spirit Studio</small><strong>Recording cockpit</strong></div></div>
        <div className={running ? 'console-status live' : 'console-status'}><span aria-hidden="true" />{running ? 'Rolling' : 'Standby'}</div>
        <div className="console-master-clock"><strong>{clock(elapsed)}</strong><small>session</small></div>
        <div className="console-source"><small>Run sheet</small><strong>{source}</strong></div>
        <div className="console-actions">
          <label className="console-tool file-tool" title="Import Markdown run sheet"><span>MD</span><b>Import</b><input type="file" accept=".md,text/markdown,text/plain" onChange={(event) => importRunSheet(event.target.files?.[0])} /></label>
          <button type="button" className="console-tool" onClick={syncStudioRunSheet} title="Sync the latest Studio run sheet"><span>SY</span><b>Sync</b></button>
          <button type="button" className="console-tool" onClick={copyLog} title="Copy the session log"><span>CP</span><b>Copy</b></button>
          <button type="button" className="console-tool" onClick={toggleFullscreen} title="Open full screen"><span>FS</span><b>Full</b></button>
          <button type="button" className="console-tool danger" onClick={newSession} title="Start a fresh session"><span>NEW</span><b>Reset</b></button>
        </div>
      </section>

      <nav className="console-mobile-tabs" aria-label="Recording cockpit panels">
        {(['live', 'run', 'deck', 'log'] as MobilePanel[]).map((panel) => <button key={panel} type="button" className={mobilePanel === panel ? 'active' : ''} onClick={() => setMobilePanel(panel)}>{panel}</button>)}
      </nav>

      <div className={`console-workspace mobile-${mobilePanel}`}>
        <aside className="console-panel run-sheet-panel" data-console-panel="run">
          <div className="console-panel-heading"><div><small>Episode path</small><h2>Run sheet</h2></div><button type="button" className="mini-tool" onClick={() => setEditingBeats((value) => !value)}>{editingBeats ? 'Close' : 'Edit'}</button></div>
          <p className="run-source">{source}</p>
          {editingBeats ? <div className="run-editor"><Textarea className="console-textarea" value={beatDraft} onChange={(event) => setBeatDraft(event.target.value)} aria-label="Run sheet beats, one per line" /><Button className="console-small-button" onClick={loadBeats}>Load beats</Button></div> : null}
          <ol className="console-beat-list">
            {beats.map((beat, index) => <li key={`${beat}-${index}`} className={index === beatIndex ? 'active' : index < beatIndex ? 'done' : ''}><button type="button" onClick={() => jumpToBeat(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{beat}</strong><small>{index < beatIndex ? 'done' : index === beatIndex ? 'live' : 'ready'}</small></button></li>)}
          </ol>
          <div className="run-sheet-bottom"><button type="button" className="mini-tool" onClick={useHouseRhythm}>House rhythm</button><button type="button" className="mini-tool" onClick={() => { setDuration(0); setNotice('Freestyle timing selected'); }}>Freestyle</button></div>
        </aside>

        <section className="console-panel live-stage" data-console-panel="live">
          <div className="live-stage-topline"><span>Current beat</span><strong>{beats.length ? `${beatIndex + 1} / ${beats.length}` : '0 / 0'}</strong></div>
          <h1>{currentBeat}</h1>
          <div className={duration > 0 && beatSeconds > duration ? 'beat-time over' : 'beat-time'}>{clock(beatSeconds, true)}</div>
          <div className="remaining-time">{remaining}</div>
          <div className="console-progress" aria-label={`${Math.round(progress)} percent of beat time`}><span style={{ width: `${progress}%` }} /></div>
          <div className="timing-strip"><label><span>Target</span><output>{duration === 0 ? 'Free' : clock(duration, true)}</output></label><input type="range" min="0" max="3600" step="30" value={duration} onChange={(event) => setDuration(Number(event.target.value))} aria-label="Current beat target length" /><button type="button" className={duration === 0 ? 'mini-tool active' : 'mini-tool'} onClick={() => setDuration(duration === 0 ? 300 : 0)}>No limit</button></div>
          <button type="button" className={running ? 'record-control pause' : 'record-control'} onClick={toggleSession}><span aria-hidden="true">{running ? 'II' : '▶'}</span><strong>{running ? 'Pause' : 'Roll session'}</strong></button>
          <div className="beat-transport"><button type="button" onClick={() => moveBeat(-1)} disabled={beatIndex === 0}><span aria-hidden="true">←</span> Previous</button><div><small>Up next</small><strong>{nextBeat}</strong></div><button type="button" className="next" onClick={() => moveBeat(1)} disabled={beatIndex >= beats.length - 1}>Next <span aria-hidden="true">→</span></button></div>
          <div className="live-marker-grid" aria-label="Live production markers">
            {markerPads.map((pad) => <button key={pad.label} type="button" className={`console-pad pad-${pad.colour}`} onClick={() => mark(pad.log, 'marker', pad.log === 'Scene cut' ? 'cut' : pad.log === 'Keep this' ? 'keep' : 'soft')}><span>{pad.key}</span><strong>{pad.label}</strong><small>mark</small></button>)}
          </div>
        </section>

        <aside className="console-panel session-log-panel" data-console-panel="log">
          <div className="console-panel-heading"><div><small>Edit map</small><h2>Live log</h2></div><span className="log-count">{log.length}</span></div>
          <p className="console-notice" aria-live="polite">{notice}</p>
          <ol className="console-session-log">
            {log.length ? [...log].reverse().map((item) => <li key={item.id} className={`log-${item.kind}`}><time>{clock(item.seconds)}</time><span><strong>{item.label}</strong>{item.note ? <small>{item.note}</small> : null}</span></li>) : <li className="empty-log"><strong>The edit map starts here.</strong><small>Markers, cues and notes appear with their time.</small></li>}
          </ol>
          <div className="console-quick-note"><Textarea className="console-textarea" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Note for the edit" aria-label="Timestamped edit note" /><button type="button" onClick={addNote}>Add note</button></div>
          <div className="console-export-row"><select value={format} onChange={(event) => setFormat(event.target.value)} aria-label="Export format"><option value="md">Markdown</option><option value="txt">Text</option><option value="srt">Subtitles</option></select><button type="button" onClick={downloadLog}>Export log</button></div>
        </aside>

        <section className="console-panel control-deck" data-console-panel="deck">
          <div className="deck-label"><small>Live inserts</small><strong>Show deck</strong></div>
          <div className="deck-scroll">{showPads.map((pad) => <button key={pad.label} type="button" className={`deck-pad pad-${pad.colour}`} onClick={() => mark(pad.log, 'cue', pad.cue)}><strong>{pad.label}</strong><small>segment</small></button>)}</div>
        </section>

        <section className="console-panel sound-deck" data-console-panel="deck">
          <div className="deck-label"><small>Built-in sound</small><strong>Spirit cues</strong></div>
          <div className="deck-scroll">{soundPads.map((pad) => <button key={pad.label} type="button" className={`deck-pad pad-${pad.colour}`} onClick={() => mark(pad.label.toLowerCase(), 'cue', pad.cue)}><strong>{pad.label}</strong><small>play + mark</small></button>)}</div>
        </section>
      </div>
    </div>
  );
}
