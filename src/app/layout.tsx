import type { Metadata } from 'next';
import { Merriweather, Uncial_Antiqua } from 'next/font/google';
import { CSSProperties } from 'react';
import './globals.css';

const merriWeather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const uncialAntiqua = Uncial_Antiqua({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Event poll',
  description: 'Create polls for your events',
};

type HomPageProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: HomPageProps) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={merriWeather.className}
        style={
          {
            '--font-merriWeather': merriWeather.style.fontFamily,
            '--font-uncialAntiqua': uncialAntiqua.style.fontFamily,
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
