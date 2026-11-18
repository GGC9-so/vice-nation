'use client';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLang } from '../lib/i18n';
import { Header, Footer } from '../components/Chrome';
import { Countdown, Info, Top } from '../components/Extras';

const CATS = ['Truco', 'Easter Egg', 'Ubicación', 'Bug', 'Curiosidad'];
const G = '#64748b';
const BTN = {};
[['TRIANGULO', '▲', '#10b981'], ['CIRCULO', '●', '#ef4444'], ['EQUIS', '✕', '#3b82f6'], ['CUADRADO', '■', '#ec4899']].forEach(([k, s, c]) => (BTN['PS_' + k] = [s, c]));
['L1', 'R1', 'L2', 'R2'].forEach((k) => (BTN['PS_' + k] = [k, G]));
[['A', '#10b981'], ['B', '#ef4444'], ['X', '#3b82f6'], ['Y', '#eab308']].forEach(([k, c]) => (BTN['XB_' + k] = [k, c]));
['LB', 'RB', 'LT', 'RT'].forEach((k) => (BTN['XB_' + k] = [k, G]));
[['UP', '⬆'], ['DOWN', '⬇'], ['LEFT', '⬅'], ['RIGHT', '➡']].forEach(([k, s]) => (BTN['DP_' + k] = [s, G]));
const PAD = {
  ps: ['PS_TRIANGULO', 'PS_CIRCULO', 'PS_EQUIS', 'PS_CUADRADO', 'PS_L1', 'PS_R1', 'PS_L2', 'PS_R2'],
  xb: ['XB_A', 'XB_B', 'XB_X', 'XB_Y', 'XB_LB', 'XB_RB', 'XB_LT', 'XB_RT'],
};
const DPAD = ['DP_UP', 'DP_DOWN', 'DP_LEFT', 'DP_RIGHT'];
const inp = 'w-full rounded-lg border border-white/15 bg-[#0b0614] px-3 py-2 text-sm outline-none focus:border-[#00f0ff]';
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

function Pill({ k, small }) {
  const [s, c] = BTN[k];
  return (
    <span className={'mx-0.5 inline-flex items-center justify-center rounded-full align-middle font-bold text-white ' + (small ? 'h-6 min-w-6 px-1.5 text-xs' : 'h-9 min-w-9 px-2 text-sm')} style={{ background: c }}>{s}</span>
  );
}

function Rich({ text }) {
  return text.split(/(\[(?:PS|XB|DP)_[A-Z0-9]+\])/g).map((p, i) =>
    p[0] === '[' && BTN[p.slice(1, -1)] ? <Pill key={i} k={p.slice(1, -1)} small /> : <span key={i}>{p}</span>
  );
}

function Modal({ onClose, onDone }) {
  const { t } = useLang();
  const [f, setF] = useState({ autor: '', categoria: 'Truco', titulo: '', descripcion: '' });
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('btn');
  const [pad, setPad] = useState('ps');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const ta = useRef(null);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function ins(k) {
    const el = ta.current, tag = `[${k}]`;
    const s = el ? el.selectionStart : f.descripcion.length, e = el ? el.selectionEnd : s;
    setF((p) => ({ ...p, descripcion: p.descripcion.slice(0, s) + tag + p.descripcion.slice(e) }));
    requestAnimationFrame(() => { if (el) { el.focus(); el.setSelectionRange(s + tag.length, s + tag.length); } });
  }

  async function send(e) {
    e.preventDefault();
    setMsg('');
    if (!f.autor.trim() || !f.titulo.trim() || !f.descripcion.trim()) return setMsg(t.errReq);
    if (file && (!file.type.startsWith('image/') || file.size > 5e6)) return setMsg(t.errImg);
    setBusy(true);
    try {
      let imagen_url = null;
      if (file) {
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${(file.name.split('.').pop() || 'jpg').toLowerCase()}`;
        const up = await supabase.storage.from('capturas').upload(path, file, { contentType: file.type });
        if (up.error) throw up.error;
        imagen_url = supabase.storage.from('capturas').getPublicUrl(path).data.publicUrl;
      }
      const { data, error } = await supabase.from('aportes')
        .insert({ autor: f.autor.trim(), categoria: f.categoria, titulo: f.titulo.trim(), descripcion: f.descripcion.trim(), imagen_url, votos: 0 })
        .select().single();
      if (error) throw error;
      onDone(data);
    } catch { setMsg(t.errSave); setBusy(false); }
  }

  const tab = (id, label) => (
    <button type="button" onClick={() => setMode(id)} className={'flex-1 rounded-lg px-2 py-2 text-xs font-bold ' + (mode === id ? 'btn-neon text-white' : 'border border-white/15 text-white/60')}>{label}</button>
  );

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 sm:items-center" onClick={onClose}>
      <form onSubmit={send} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-t-2xl border border-[#ff4099]/30 bg-[#160d25] p-5 sm:rounded-2xl">
        <h2 className="logo text-xl font-bold italic">{t.mTitle}</h2>
        <input className={inp} placeholder={t.nick} maxLength={30} value={f.autor} onChange={set('autor')} />
        <select className={inp} value={f.categoria} onChange={set('categoria')} aria-label={t.cat}>
          {CATS.map((c) => <option key={c} value={c}>{t.cats[c]}</option>)}
        </select>
        <input className={inp} placeholder={t.title} maxLength={80} value={f.titulo} onChange={set('titulo')} />
        <label className="block text-xs text-white/60">{t.img}
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} className="mt-1 block w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-[#00f0ff] file:px-3 file:py-1.5 file:font-bold file:text-[#0b0614]" />
        </label>
        <div className="flex gap-2">{tab('btn', t.modeBtn)}{tab('txt', t.modeTxt)}</div>
        {mode === 'btn' && (
          <div className="space-y-2 rounded-lg border border-white/10 p-3">
            <div className="flex gap-2 text-xs font-bold">
              {[['ps', 'PlayStation'], ['xb', 'Xbox']].map(([id, n]) => (
                <button type="button" key={id} onClick={() => setPad(id)} className={'rounded-full px-3 py-1 ' + (pad === id ? 'bg-[#00f0ff] text-[#0b0614]' : 'border border-white/15 text-white/60')}>{n}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">{PAD[pad].map((k) => <button type="button" key={k} onClick={() => ins(k)} aria-label={k}><Pill k={k} /></button>)}</div>
            <div className="flex flex-wrap items-center gap-1.5"><span className="text-xs text-white/50">{t.dpad}</span>{DPAD.map((k) => <button type="button" key={k} onClick={() => ins(k)} aria-label={k}><Pill k={k} /></button>)}</div>
            <p className="text-[11px] text-white/40">{t.pad}</p>
          </div>
        )}
        <textarea ref={ta} className={inp + ' min-h-28'} placeholder={t.desc} maxLength={1200} value={f.descripcion} onChange={set('descripcion')} />
        {msg && <p className="text-sm text-[#ff4099]" role="alert">{msg}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-white/20 px-4 py-2 text-sm">{t.cancel}</button>
          <button disabled={busy} className="rounded-full btn-neon px-5 py-2 text-sm font-bold text-white disabled:opacity-50">{busy ? t.sending : t.send}</button>
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [voted, setVoted] = useState([]);
  const [reported, setReported] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      setVoted(JSON.parse(localStorage.getItem('vn_voted') || '[]'));
      setReported(JSON.parse(localStorage.getItem('vn_reported') || '[]'));
    } catch {}
    supabase.from('aportes').select('*').order('created_at', { ascending: false }).limit(120)
      .then(({ data, error }) => { if (error) setErr(true); else setItems(data || []); setLoading(false); });
  }, []);

  async function vote(id) {
    if (voted.includes(id)) return;
    const nv = [...voted, id];
    setVoted(nv); save('vn_voted', nv);
    setItems((l) => l.map((a) => (a.id === id ? { ...a, votos: (a.votos || 0) + 1 } : a)));
    const { error } = await supabase.rpc('incrementar_voto', { aporte_id: id });
    if (error) {
      const rv = nv.filter((x) => x !== id);
      setVoted(rv); save('vn_voted', rv);
      setItems((l) => l.map((a) => (a.id === id ? { ...a, votos: Math.max(0, (a.votos || 1) - 1) } : a)));
    }
  }
  function flash(m) { setToast(m); setTimeout(() => setToast(''), 3500); }
  async function report(id) {
    if (reported.includes(id)) return;
    const { error } = await supabase.from('reportes').insert({ aporte_id: String(id) });
    if (error) return flash(t.errReport);
    const nr = [...reported, id];
    setReported(nr); save('vn_reported', nr); flash(t.reportOk);
  }

  const list = items.filter((a) => filter === 'all' || a.categoria === filter);
  const votes = items.reduce((n, a) => n + (a.votos || 0), 0);
  const chip = (id, label) => (
    <button key={id} onClick={() => setFilter(id)} className={'shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ' + (filter === id ? 'bg-[#00f0ff] text-[#0b0614]' : 'border border-white/15 text-white/70')}>{label}</button>
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-10 sm:py-14">
          <h1 className="logo text-5xl font-bold italic sm:text-7xl">VICE <span>NATION</span></h1>
          <div className="hero-line my-4 w-32" />
          <p className="text-lg text-white/75 sm:text-xl">{t.tag}</p>
          <button onClick={() => setOpen(true)} className="btn-neon mt-6 rounded-full px-7 py-3 text-base font-bold text-white">{t.submit}</button>
          {items.length > 0 && <p className="mt-4 flex gap-4 text-sm text-white/50"><span>{items.length} {t.stPosts}</span><span>{votes} {t.stVotes}</span></p>}
        </section>
        <Countdown />
        {!loading && <Top items={items} />}
        <div id="muro" className="-mx-4 mt-10 flex scroll-mt-20 gap-2 overflow-x-auto px-4 pb-4">
          {chip('all', t.all)}{CATS.map((c) => chip(c, t.cats[c]))}
        </div>
        {loading && <p className="py-10 text-white/60">{t.loading}</p>}
        {err && <p className="py-10 text-[#ff4099]">{t.errLoad}</p>}
        {!loading && !err && list.length === 0 && <p className="py-10 text-white/60">{t.empty}</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <article key={a.id} className="card flex flex-col overflow-hidden rounded-2xl border border-[#ff4099]/30 bg-[#160d25]/80 backdrop-blur-sm">
              {a.imagen_url && <img src={a.imagen_url} alt={a.titulo} loading="lazy" className="aspect-video w-full object-cover" />}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full border border-[#00f0ff]/40 px-2 py-0.5 text-[#00f0ff]">{t.cats[a.categoria] || a.categoria}</span>
                  <span className="text-white/50">{t.by} {a.autor}</span>
                </div>
                <h2 className="text-lg font-bold leading-snug">{a.titulo}</h2>
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-white/75"><Rich text={a.descripcion || ''} /></p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <button onClick={() => vote(a.id)} disabled={voted.includes(a.id)} className={'rounded-full px-4 py-1.5 text-sm font-bold ' + (voted.includes(a.id) ? 'btn-neon text-white' : 'border border-[#00f0ff]/50 text-[#00f0ff]')}>{t.works} · {a.votos || 0}</button>
                  <button onClick={() => report(a.id)} disabled={reported.includes(a.id)} className={'text-xs ' + (reported.includes(a.id) ? 'text-[#ff4099]' : 'text-white/40 hover:text-white/70')}>🚩 {reported.includes(a.id) ? t.reported : t.report}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Info items={items} onPick={(c) => { setFilter(c); document.getElementById('muro')?.scrollIntoView({ behavior: 'smooth' }); }} />
      </main>
      <Footer />
      <button onClick={() => setOpen(true)} className="btn-neon fixed bottom-5 right-4 z-30 rounded-full px-5 py-3 text-sm font-bold text-white">{t.submit}</button>
      {toast && <div role="status" className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-sm rounded-xl border border-[#ff4099]/40 bg-[#160d25] px-4 py-3 text-center text-sm shadow-[0_0_25px_rgba(255,51,153,0.4)]">{toast}</div>}
      {open && <Modal onClose={() => setOpen(false)} onDone={(row) => { setItems((l) => [row, ...l]); setOpen(false); }} />}
    </>
  );
}
