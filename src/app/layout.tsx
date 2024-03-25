import type { Metadata } from 'next';
import { Merriweather, Uncial_Antiqua } from 'next/font/google';
import { CSSProperties } from 'react';
import './globals.css';
import { Navigation } from './components/Navigation';

const merriWeather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const uncialAntiqua = Uncial_Antiqua({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Cast Thy Voice!',
  description: 'Craft Mirthful Decrees for Thy Gatherings!',
};

type HomPageProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: HomPageProps) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${merriWeather.className}`}
        style={
          {
            '--font-merriWeather': merriWeather.style.fontFamily,
            '--font-uncialAntiqua': uncialAntiqua.style.fontFamily,
          } as CSSProperties
        }
      >
        <div className=" flex min-h-screen flex-col items-center justify-center p-8 dragon-bg relative">
          <Navigation />
          <div className="mt-8 sm:mt-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
