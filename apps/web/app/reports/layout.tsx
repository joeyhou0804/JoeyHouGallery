import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reports - Joey Hou\'s Gallery',
  description: 'Read Joey Hou\'s reports, research papers, and analytical writings. 阅读小猴同学的报告和研究文章。',
  keywords: 'Joey Hou, reports, research, papers, analysis, writings, 小猴同学, 报告',
  openGraph: {
    title: 'Reports - Joey Hou\'s Gallery',
    description: 'Read Joey Hou\'s reports, research papers, and analytical writings.',
    url: 'https://joeyhougallery.vercel.app/reports',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reports - Joey Hou\'s Gallery',
    description: 'Read Joey Hou\'s reports, research papers, and analytical writings.',
  },
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
