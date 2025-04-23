import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Redis Benchmark App',
  description: 'A modern web application showcasing Redis caching strategies with Next.js',
  keywords: ['Next.js', 'Redis', 'Caching', 'Performance', 'Benchmark'],
  authors: [{ name: 'Vansh Agarwal' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="redis-theme"
        >
          <div className="min-h-screen flex flex-col items-center antialiased selection:bg-teal-200 selection:text-teal-900 dark:selection:bg-teal-800 dark:selection:text-teal-50">
            <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 [--gradient-stop-1:0px] [--gradient-stop-2:80%] lg:[--gradient-stop-1:100px] lg:[--gradient-stop-2:50%]">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-slate-100/0 via-slate-100/70 to-slate-100/0 dark:from-slate-900/0 dark:via-slate-900/70 dark:to-slate-900/0 opacity-0 data-[loaded=true]:opacity-100 transition-opacity duration-500"
                data-loaded="true"
              />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
