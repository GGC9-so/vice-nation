import './globals.css';
import { LangProvider } from '../lib/i18n';

export const metadata = {
  title: 'VICE NATION — GTA VI',
  description: 'La red comunitaria de GTA VI & Leonida · The GTA VI & Leonida Community Hub',
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }], shortcut: '/icon.svg' },
};
export const viewport = { themeColor: '#0b0614', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,700&display=swap" rel="stylesheet" />
      </head>
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
