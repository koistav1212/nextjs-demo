"use client";

import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { DesktopNavbar } from "./components/layout/DekstopNavBar";
import { MobileBottomBar } from "./components/layout/MobileBottomBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
            
            {/* Desktop / Tablet Navbar */}
            <DesktopNavbar />

            {/* Main content */}
            <main className="flex-grow container mx-auto p-4">
              {children}
            </main>

            {/* Mobile Bottom Bar */}
            <MobileBottomBar />

            {/* Spacer for mobile bottom bar */}
            <div className="sm:hidden h-16" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
