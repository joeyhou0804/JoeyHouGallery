import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handbooks - Joey Hou\'s Gallery',
  description: 'Explore Joey Hou\'s handbooks, guides, and educational materials. 探索小猴同学的手册和指南。',
  keywords: 'Joey Hou, handbooks, guides, educational materials, documentation, 小猴同学, 手册',
  openGraph: {
    title: 'Handbooks - Joey Hou\'s Gallery',
    description: 'Explore Joey Hou\'s handbooks, guides, and educational materials.',
    url: 'https://joeyhougallery.vercel.app/handbooks',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handbooks - Joey Hou\'s Gallery',
    description: 'Explore Joey Hou\'s handbooks, guides, and educational materials.',
  },
};

export default function HandbooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
