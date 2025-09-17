import Providers from './providers';
import './globals.css';

export const metadata = {
  title: "Joey Hou's Gallery",
  description: 'Welcome to my gallery! 欢迎来到小猴同学作品集！',
  keywords: 'Joey Hou, gallery, portfolio, art, design, photography, projects, 小猴同学, 作品集',
  authors: [{ name: 'Joey Hou' }],
  creator: 'Joey Hou',
  publisher: 'Joey Hou',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    url: 'https://joeyhougallery.vercel.app',
    siteName: "Joey Hou's Gallery",
    title: "Joey Hou's Gallery",
    description: 'Welcome to my gallery! 欢迎来到小猴同学作品集！',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: "Joey Hou's Gallery",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@joeyhou',
    creator: '@joeyhou',
    title: "Joey Hou's Gallery",
    description: 'Welcome to my gallery! 欢迎来到小猴同学作品集！',
    images: ['/favicon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
