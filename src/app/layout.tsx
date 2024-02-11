import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
