import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posters - Joey Hou\'s Gallery',
  description: 'View Joey Hou\'s poster designs, including event posters, promotional materials, and graphic design work. 查看小猴同学的海报设计作品。',
  keywords: 'Joey Hou, posters, graphic design, event posters, promotional materials, 小猴同学, 海报设计',
  openGraph: {
    title: 'Posters - Joey Hou\'s Gallery',
    description: 'View Joey Hou\'s poster designs, including event posters, promotional materials, and graphic design work.',
    url: 'https://joeyhougallery.vercel.app/posters',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posters - Joey Hou\'s Gallery',
    description: 'View Joey Hou\'s poster designs, including event posters, promotional materials, and graphic design work.',
  },
};

export default function PostersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
