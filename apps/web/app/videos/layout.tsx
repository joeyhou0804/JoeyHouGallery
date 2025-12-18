import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos - Joey Hou\'s Gallery',
  description: 'Watch Joey Hou\'s video collection, including creative projects, documentaries, and multimedia works. 观看小猴同学的视频作品集。',
  keywords: 'Joey Hou, videos, multimedia, documentaries, creative projects, 小猴同学, 视频作品',
  openGraph: {
    title: 'Videos - Joey Hou\'s Gallery',
    description: 'Watch Joey Hou\'s video collection, including creative projects, documentaries, and multimedia works.',
    url: 'https://www.joeyhou.gallery/videos',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos - Joey Hou\'s Gallery',
    description: 'Watch Joey Hou\'s video collection, including creative projects, documentaries, and multimedia works.',
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
