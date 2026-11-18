'use client';
import Link from 'next/link';
import { useLang } from '../lib/i18n';

export function Header({ onSubmit }) {
  const { lang, setLang, t } = useLang();
  const lb = (l, label) => (
    <button onClick={() => setLang(l)} aria-pressed={lang === l}
      className={'rounded-full px-2.5 py-1 text-xs font-bold ' + (lang === l ? 'bg-[#00f0ff] text-[#0b0614]' : 'text-white/60')}>{label}</button>
  );
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0614]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="logo text-xl font-bold italic sm:text-2xl">VICE <span>NATION</span></Link>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-[#00f0ff]/40 p-0.5">{lb('es', '🇪🇸 ES')}{lb('en', '🇺🇸 EN')}</div>
          {onSubmit && (
            <button onClick={onSubmit} className="rounded-full btn-neon px-3 py-1.5 text-xs font-bold text-white sm:text-sm">{t.submit}</button>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-white/10 px-4 py-8 text-center text-xs text-white/50">
      <nav className="mb-3 flex justify-center gap-5 text-sm">
        <Link href="/privacidad" className="hover:text-[#00f0ff]">{t.fPriv}</Link>
        <Link href="/contacto" className="hover:text-[#00f0ff]">{t.fCont}</Link>
      </nav>
      <p className="mx-auto max-w-xl">{t.disclaimer}</p>
      <p className="mt-2">© {new Date().getFullYear()} VICE NATION</p>
    </footer>
  );
}
