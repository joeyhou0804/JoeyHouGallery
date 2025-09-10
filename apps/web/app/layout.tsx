import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'Joey Hou Gallery',
  description: 'Photography, art prints, and projects by Joey Hou',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
