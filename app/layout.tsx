// app/(main)/layout.tsx
import './globals.css';
import { DesktopNavbar } from './components/layout/DekstopNavBar';
import { MobileBottomBar } from './components/layout/MobileBottomBar';

// Define the root layout for the main application pages
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
    <div className="min-h-screen flex flex-col">
      {/* Renders Navbar on Desktop/Tablet screens */}
      <DesktopNavbar /> 
      
      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
      {/* Renders Bottom Bar on Mobile screens */}
      <MobileBottomBar /> 
      
      {/* Padding for mobile screens to prevent content from hiding behind the fixed bottom bar */}
      <div className="sm:hidden h-16" /> 
    </div>
    </body>
    </html>
  );
}