'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';

const LAUNCH = new Date(2026, 10, 19).getTime(); // 19 nov 2026, hora local
const CATS = [['Truco', '🎮'], ['Easter Egg', '🥚'], ['Ubicación', '📍'], ['Bug', '🐛'], ['Curiosidad', '💡']];
const box = 'rounded-2xl border border-[#ff4099]/30 bg-[#160d25]/80 p-4';

export function Countdown() {
  const { t } = useLang();
  const [ms, setMs] = useState(null);
  useEffect(() => {
    const tick = () => setMs(LAUNCH - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (ms === null) return <div className="h-44" />;
  const s = Math.max(0, Math.floor(ms / 1000));
  const cells = [[Math.floor(s / 86400), t.cdDays], [Math.floor((s % 86400) / 3600), t.cdHours], [Math.floor((s % 3600) / 60), t.cdMin], [s % 60, t.cdSec]];
  return (
    <section className={box + ' text-center sm:p-8'}>
      <h2 className="text-sm text-white/70 sm:text-base">{t.cdTitle}</h2>
      {ms > 0 ? (
        <div className="mt-4 flex justify-center gap-3 sm:gap-6">
          {cells.map(([n, l]) => (
            <div key={l} className="min-w-16 sm:min-w-24">
              <div className="logo text-4xl font-bold tabular-nums sm:text-6xl">{String(n).padStart(2, '0')}</div>
              <div className="text-xs text-white/50">{l}</div>
            </div>
          ))}
        </div>
      ) : <p className="logo mt-4 text-3xl font-bold italic">{t.cdOut}</p>}
      <p className="mt-4 text-xs text-white/50">{t.cdDate}</p>
    </section>
  );
}

export function Info({ items = [], onPick }) {
  const { t } = useLang();
  return (
    <div className="mt-14 space-y-12">
      <section>
        <h2 className="logo text-2xl font-bold italic">{t.catTitle}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CATS.map(([c, e]) => {
            const n = items.filter((a) => a.categoria === c).length;
            return (
              <button key={c} onClick={() => onPick(c)} className={box + ' card text-left'}>
                <span className="text-2xl">{e}</span>
                <h3 className="mt-2 font-bold text-[#00f0ff]">{t.cats[c]}</h3>
                <p className="mt-1 text-sm leading-6 text-white/75">{t.catDesc[c]}</p>
                {n > 0 && <p className="mt-2 text-xs text-white/50">{n} {t.stPosts}</p>}
              </button>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="logo text-2xl font-bold italic">{t.howTitle}</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {t.steps.map(([h, p], i) => (
            <li key={h} className={box}>
              <span className="btn-neon inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-2 font-bold">{h}</h3><p className="mt-1 text-sm leading-6 text-white/75">{p}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="logo text-2xl font-bold italic">{t.faqTitle}</h2>
        <div className="mt-4 space-y-2">
          {t.faq.map(([q, a]) => (
            <details key={q} className={box}><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-2 text-sm leading-6 text-white/75">{a}</p></details>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Top({ items }) {
  const { t } = useLang();
  const top = items.filter((a) => (a.votos || 0) > 0).sort((a, b) => b.votos - a.votos).slice(0, 3);
  return (
    <section className="mt-10">
      <h2 className="logo text-2xl font-bold italic">{t.topTitle}</h2>
      {top.length === 0 ? <p className={box + ' mt-4 text-sm text-white/70'}>{t.topEmpty}</p> : (
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {top.map((a, i) => (
            <li key={a.id} className={box}>
              <span className="btn-neon inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">{i + 1}</span>
              <p className="mt-2 text-xs text-[#00f0ff]">{t.cats[a.categoria] || a.categoria}</p>
              <h3 className="font-bold leading-snug">{a.titulo}</h3>
              <p className="mt-2 flex justify-between text-xs text-white/50"><span>{t.by} {a.autor}</span><span>{t.works} {a.votos}</span></p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
