
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navigation/navbar';

export const metadata: Metadata = {
  title: 'PKH Mateng | Management System',
  description: 'Sistem Pengelolaan Data PKH Kabupaten Mamuju Tengah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <main className="min-h-screen p-6 md:p-8 max-w-[1400px] mx-auto">
          <Navbar />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
