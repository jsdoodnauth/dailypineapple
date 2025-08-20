import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Navigation from '@/components/ui/navigation';

const inter = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Daily Pine - Your Source for Humorous News',
  description: 'Bringing you a daily dose of laughter with fictional humorous news stories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-purple-50 via-pink-25 to-blue-50 min-h-screen`}>
        <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              The Daily <span className="text-purple-600">Pine</span>
            </h1>
            <p className="text-gray-600 text-lg">A dose of humor</p>
            <p className="text-purple-600 font-medium mt-2 text-sm">{currentDate}</p>
          </div>
        </header>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600">
              © 2025 The Daily Pine. All stories are fictional and created for entertainment purposes.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Bringing laughter to your day, one ridiculous story at a time.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}