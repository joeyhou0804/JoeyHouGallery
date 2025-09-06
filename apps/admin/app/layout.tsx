export const metadata = {
  title: 'Joey Hou Admin',
  description: 'Admin dashboard for Joey Hou Gallery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

