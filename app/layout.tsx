// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProgressBar from './ProgressBar'; // Импортируйте ProgressBar

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above.

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressBar /> {/* Используйте ProgressBar */}
        {children}
      </body>
    </html>
  );
}
