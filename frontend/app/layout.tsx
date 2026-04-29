// app/layout.tsx — Root layout with global styles
import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from './context/AppContext';

export const metadata: Metadata = {
  title: 'Iskonek — Find Your Future',
  description: 'A Web-based Centralized Scholarship Listing Platform for Filipino Students',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}