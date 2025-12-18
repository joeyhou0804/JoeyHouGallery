import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Websites - Joey Hou\'s Gallery',
  description: 'Browse Joey Hou\'s web development projects, including websites, web applications, and digital experiences. 浏览小猴同学的网站开发项目。',
  keywords: 'Joey Hou, websites, web development, web design, digital projects, 小猴同学, 网站开发',
  openGraph: {
    title: 'Websites - Joey Hou\'s Gallery',
    description: 'Browse Joey Hou\'s web development projects, including websites, web applications, and digital experiences.',
    url: 'https://www.joeyhou.gallery/websites',
    siteName: 'Joey Hou\'s Gallery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Websites - Joey Hou\'s Gallery',
    description: 'Browse Joey Hou\'s web development projects, including websites, web applications, and digital experiences.',
  },
};

export default function WebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
