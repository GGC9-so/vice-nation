'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export const EMAIL = 'contacto@vice-nation.com'; // <- cámbialo por tu correo real

export const T = {
  es: {
    tag: 'La red comunitaria de GTA VI & Leonida', submit: 'Subir aporte', all: 'Todos',
    cats: { Truco: 'Truco', 'Easter Egg': 'Easter Egg', 'Ubicación': 'Ubicación', Bug: 'Bug', Curiosidad: 'Curiosidad' },
    works: 'Funciona 🔥', report: 'Reportar', reported: 'Reportado', reportOk: 'Reporte enviado. Un administrador lo revisará.', errReport: 'No se pudo enviar el reporte. Inténtalo de nuevo.', by: 'por', empty: 'Aún no hay aportes aquí. ¡Sé el primero en subir uno!',
    loading: 'Cargando aportes…', errLoad: 'No se pudieron cargar los aportes. Recarga la página.',
    mTitle: 'Sube tu secreto', nick: 'Apodo / Gamertag', cat: 'Categoría', title: 'Título corto',
    img: 'Captura (opcional, máx. 5 MB)', desc: 'Descripción', modeBtn: '🎮 Con Botones', modeTxt: '📝 Texto Normal',
    send: 'Publicar', sending: 'Publicando…', cancel: 'Cancelar',
    errReq: 'Completa apodo, título y descripción.', errImg: 'La captura debe ser una imagen de máximo 5 MB.',
    errSave: 'No se pudo publicar. Inténtalo de nuevo.', pad: 'Toca un botón para insertarlo en la descripción', dpad: 'Cruceta',
    stPosts: 'aportes', stVotes: 'votos',
    cdTitle: 'Cuenta regresiva para el lanzamiento de GTA VI', cdDays: 'días', cdHours: 'horas', cdMin: 'min', cdSec: 'seg',
    cdOut: '¡GTA VI ya está disponible!', cdDate: 'Jueves 19 de noviembre de 2026 · PS5 y Xbox Series X|S',
    topTitle: 'Lo más votado', topEmpty: 'Todavía no hay ranking. Sube un aporte y consigue votos «Funciona» para aparecer aquí.',
    catTitle: 'Explora por categoría',
    catDesc: { Truco: 'Combinaciones, atajos y ventajas que sí funcionan.', 'Easter Egg': 'Secretos y guiños escondidos en Leonida.', 'Ubicación': 'Lugares, rincones y puntos de interés del mapa.', Bug: 'Glitches curiosos y fallos que encontraste.', Curiosidad: 'Datos y detalles que casi nadie nota.' },
    howTitle: 'Cómo funciona',
    steps: [['Sube tu aporte', 'Comparte un truco, easter egg, ubicación o bug. No necesitas cuenta.'], ['Añade los botones', 'Usa el teclado de mandos para escribir combinaciones al estilo PlayStation o Xbox.'], ['Vota «Funciona»', 'La comunidad confirma qué aportes sirven de verdad.']],
    faqTitle: 'Preguntas frecuentes',
    faq: [['¿Necesito una cuenta?', 'No. Escribe un apodo y publica.'], ['¿Puedo subir capturas?', 'Sí. Al publicar puedes adjuntar una imagen de hasta 5 MB. Es opcional.'], ['¿Cómo reporto un aporte?', 'Con el botón «Reportar» de cada tarjeta. Un administrador lo revisa.']],
    fPriv: 'Política de Privacidad', fCont: 'Aviso Legal y Contacto',
    disclaimer: 'Sitio de fans no oficial. No está afiliado a Rockstar Games ni a Take-Two Interactive. GTA y Grand Theft Auto son marcas de sus propietarios.',
    pv: { title: 'Política de Privacidad', upd: 'Última actualización: noviembre de 2026', s: [
      ['Qué datos recopilamos', 'No hay registro ni login. Solo guardamos lo que publicas voluntariamente: apodo, categoría, título, descripción y, si la subes, una captura. Todo eso es público en el muro. No publiques datos personales.'],
      ['Almacenamiento en tu navegador', 'Usamos localStorage para recordar tu idioma, los aportes que votaste y los que ocultaste. No se usa para rastrearte.'],
      ['Cookies y publicidad (Google AdSense)', 'Google y otros proveedores externos usan cookies para mostrar anuncios según tus visitas anteriores a este y otros sitios. Con la cookie de publicidad, Google y sus socios pueden mostrarte anuncios basados en tu navegación. Puedes desactivar la publicidad personalizada en google.com/settings/ads o en aboutads.info.'],
      ['Servicios de terceros', 'Los aportes e imágenes se almacenan en Supabase. El sitio se sirve desde Vercel y las tipografías desde Google Fonts. Cada proveedor tiene su propia política de privacidad.'],
      ['Eliminación de contenido', 'Si quieres que borremos un aporte tuyo, escribe a {email} indicando el título y tu apodo.'],
      ['Menores', 'Este sitio no está dirigido a menores de 13 años ni recopila datos de ellos a sabiendas.'],
      ['Cambios', 'Podemos actualizar esta política; la fecha de arriba indica la última revisión.'],
    ] },
    ct: { title: 'Aviso Legal y Contacto', upd: 'Última actualización: noviembre de 2026', s: [
      ['Sitio no oficial', 'VICE NATION es un proyecto de fans. No está afiliado, patrocinado ni respaldado por Rockstar Games ni Take-Two Interactive. GTA VI, Grand Theft Auto y Leonida son marcas de sus respectivos propietarios.'],
      ['Contenido de la comunidad', 'Los aportes son responsabilidad de quienes los publican. Nos reservamos el derecho de retirar contenido ofensivo, engañoso o que infrinja derechos de terceros.'],
      ['Reportes y derechos de autor', 'Usa el botón «Reportar» de cada tarjeta o escríbenos para solicitar la retirada de cualquier contenido.'],
      ['Contacto', 'Para dudas, colaboraciones o solicitudes legales: {email}'],
    ] },
  },
  en: {
    tag: 'The GTA VI & Leonida Community Hub', submit: 'Submit post', all: 'All',
    cats: { Truco: 'Cheats', 'Easter Egg': 'Easter Eggs', 'Ubicación': 'Locations', Bug: 'Bugs', Curiosidad: 'Trivia' },
    works: 'Works 🔥', report: 'Report', reported: 'Reported', reportOk: 'Report sent. An admin will review it.', errReport: 'Could not send the report. Please try again.', by: 'by', empty: 'Nothing here yet. Be the first to post one!',
    loading: 'Loading posts…', errLoad: 'Posts could not be loaded. Reload the page.',
    mTitle: 'Share your secret', nick: 'Nickname / Gamertag', cat: 'Category', title: 'Short title',
    img: 'Screenshot (optional, max 5 MB)', desc: 'Description', modeBtn: '🎮 Controller Icons', modeTxt: '📝 Plain Text',
    send: 'Publish', sending: 'Publishing…', cancel: 'Cancel',
    errReq: 'Fill in nickname, title and description.', errImg: 'The screenshot must be an image up to 5 MB.',
    errSave: 'Could not publish. Please try again.', pad: 'Tap a button to insert it in the description', dpad: 'D-pad',
    stPosts: 'posts', stVotes: 'votes',
    cdTitle: 'Countdown to the GTA VI launch', cdDays: 'days', cdHours: 'hours', cdMin: 'min', cdSec: 'sec',
    cdOut: 'GTA VI is out now!', cdDate: 'Thursday, November 19, 2026 · PS5 and Xbox Series X|S',
    topTitle: 'Most voted', topEmpty: 'No ranking yet. Post something and get Works votes to show up here.',
    catTitle: 'Browse by category',
    catDesc: { Truco: 'Combos, shortcuts and perks that really work.', 'Easter Egg': 'Secrets and hidden nods across Leonida.', 'Ubicación': 'Places, hidden corners and points of interest.', Bug: 'Funny glitches and failures you found.', Curiosidad: 'Facts and details almost nobody notices.' },
    howTitle: 'How it works',
    steps: [['Post your find', 'Share a cheat, easter egg, location or bug. No account needed.'], ['Add the buttons', 'Use the controller keyboard to write PlayStation or Xbox style combos.'], ['Vote Works', 'The community confirms which posts really work.']],
    faqTitle: 'FAQ',
    faq: [['Do I need an account?', 'No. Type a nickname and publish.'], ['Can I upload screenshots?', 'Yes. You can attach an image up to 5 MB when you post. It is optional.'], ['How do I report a post?', 'Use the Report button on each card. An admin will review it.']],
    fPriv: 'Privacy Policy', fCont: 'Legal Notice & Contact',
    disclaimer: 'Unofficial fan site. Not affiliated with Rockstar Games or Take-Two Interactive. GTA and Grand Theft Auto are trademarks of their owners.',
    pv: { title: 'Privacy Policy', upd: 'Last updated: November 2026', s: [
      ['What data we collect', 'There is no sign-up or login. We only store what you choose to post: nickname, category, title, description and, if you upload one, a screenshot. All of it is public on the wall. Do not post personal data.'],
      ['Storage in your browser', 'We use localStorage to remember your language, the posts you voted for and the ones you hid. It is not used to track you.'],
      ['Cookies and advertising (Google AdSense)', 'Google and other third-party vendors use cookies to serve ads based on your prior visits to this and other sites. With the advertising cookie, Google and its partners can show you ads based on your browsing. You can opt out of personalized advertising at google.com/settings/ads or aboutads.info.'],
      ['Third-party services', 'Posts and images are stored in Supabase. The site is served from Vercel and fonts come from Google Fonts. Each provider has its own privacy policy.'],
      ['Content removal', 'To have one of your posts deleted, email {email} with the title and your nickname.'],
      ['Children', 'This site is not directed to children under 13 and does not knowingly collect their data.'],
      ['Changes', 'We may update this policy; the date above shows the latest revision.'],
    ] },
    ct: { title: 'Legal Notice & Contact', upd: 'Last updated: November 2026', s: [
      ['Unofficial site', 'VICE NATION is a fan project. It is not affiliated with, sponsored or endorsed by Rockstar Games or Take-Two Interactive. GTA VI, Grand Theft Auto and Leonida are trademarks of their respective owners.'],
      ['Community content', 'Posts are the responsibility of the people who publish them. We reserve the right to remove offensive, misleading or infringing content.'],
      ['Reports and copyright', 'Use the "Report" button on each card or write to us to request removal of any content.'],
      ['Contact', 'For questions, partnerships or legal requests: {email}'],
    ] },
  },
};

const Ctx = createContext({ lang: 'es', setLang: () => {} });
export const useLang = () => { const c = useContext(Ctx); return { ...c, t: T[c.lang] }; };

export function LangProvider({ children }) {
  const [lang, setL] = useState('es');
  useEffect(() => {
    let s = null;
    try { s = localStorage.getItem('vn_lang'); } catch {}
    setL(s === 'en' || s === 'es' ? s : (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l) => { setL(l); try { localStorage.setItem('vn_lang', l); } catch {} };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
