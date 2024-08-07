import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import { env } from '@/lib/config/env';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

const APP_BASE_URL = new URL(env.NEXT_PUBLIC_APP_BASE_URL);

export const metadata: Metadata = {
  metadataBase: APP_BASE_URL,
  title: {
    template: '%s | Web3 Template',
    default: 'Web3 Template'
  },
  description: 'description',
  applicationName: 'Web3 Template',
  keywords: ['Web3 Template', 'Top trends', 'Twitter', 'Crypto'],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US'
    }
  },
  openGraph: {
    title: 'Web3 Template',
    description: 'description',
    url: APP_BASE_URL,
    siteName: 'Web3 Template',
    type: 'website',
    locale: 'en_US',
    images: ['']
  },
  twitter: {
    title: 'Web3 Template',
    description: 'description',
    site: 'Web3 Template'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} h-dvh`}>
        <Providers>
          <div className='flex flex-col h-full bg-neutral-900'>
            <Navbar />
            <div className='flex-1'>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
