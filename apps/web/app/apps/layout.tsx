import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apps - Joey Hou\'s Gallery',
  description: 'Discover Joey Hou\'s application projects, including mobile apps, web apps, and software tools. 发现小猴同学的应用程序项目。',
  keywords: 'Joey Hou, apps, applications, mobile apps, web apps, software, 小猴同学, 应用程序',
  openGraph: {
    title: 'Apps - Joey Hou\'s Gallery',
    description: 'Discover Joey Hou\'s application projects, including mobile apps, web apps, and software tools.',
    url: 'https://joeyhougallery.vercel.app/apps',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apps - Joey Hou\'s Gallery',
    description: 'Discover Joey Hou\'s application projects, including mobile apps, web apps, and software tools.',
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
