'use client';
import { Header, Footer } from './Chrome';
import { useLang, EMAIL } from '../lib/i18n';

export default function Doc({ k }) {
  const { t } = useLang();
  const d = t[k];
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="logo text-3xl font-bold italic">{d.title}</h1>
        <div className="hero-line my-4 w-24" />
        <p className="text-sm text-white/50">{d.upd}</p>
        {d.s.map(([h, p]) => (
          <section key={h} className="mt-6">
            <h2 className="text-lg font-bold text-[#00f0ff]">{h}</h2>
            <p className="mt-1 leading-7 text-white/75">{p.replace('{email}', EMAIL)}</p>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
