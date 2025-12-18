import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arts - Joey Hou\'s Gallery',
  description: 'Explore Joey Hou\'s art collection, featuring paintings, drawings, and other artistic creations. 探索小猴同学的艺术作品集。',
  keywords: 'Joey Hou, arts, paintings, drawings, artwork, gallery, 小猴同学, 艺术作品',
  openGraph: {
    title: 'Arts - Joey Hou\'s Gallery',
    description: 'Explore Joey Hou\'s art collection, featuring paintings, drawings, and other artistic creations.',
    url: 'https://www.joeyhou.gallery/arts',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arts - Joey Hou\'s Gallery',
    description: 'Explore Joey Hou\'s art collection, featuring paintings, drawings, and other artistic creations.',
  },
};

export default function ArtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
