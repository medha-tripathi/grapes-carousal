import './globals.css';

export const metadata = {
  title: 'GrapesJS with Next.js',
  description: 'GrapesJS integrated into Next.js app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
