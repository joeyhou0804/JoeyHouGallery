import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Providers from './providers';

export const metadata = {
  title: 'Joey Hou Gallery',
  description: 'Photography, art prints, and projects by Joey Hou',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
