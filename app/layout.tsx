import { AuthProvider } from "@/context/AuthContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Modern Admin Panel for your application",
};

// This function helps prevent attributes from browser extensions causing hydration errors
function getInitialProps() {
  return {
    __html: `
      (function() {
        try {
          // Remove all attributes with "bis_" prefix that BitDefender adds
          function cleanBitDefenderAttrs() {
            const allElements = document.querySelectorAll('*');
            for (let i = 0; i < allElements.length; i++) {
              const el = allElements[i];
              for (let j = 0; j < el.attributes.length; j++) {
                const attr = el.attributes[j];
                if (attr.name.startsWith('bis_') || 
                    attr.name === 'data-new-gr-c-s-check-loaded' || 
                    attr.name === 'data-gr-ext-installed' ||
                    attr.name === '__processed_8c5d4903-2c27-4a83-9612-f4948ced4c04__' ||
                    attr.name === 'data-arp') {
                  el.removeAttribute(attr.name);
                  j--;
                }
              }
            }
          }
          
          document.addEventListener('DOMContentLoaded', function() {
            cleanBitDefenderAttrs();
          });
        } catch (e) { 
          console.error("Error cleaning extension attributes:", e);
        }
      })();
    `,
  };
}

// Theme initialization script to prevent flash of incorrect theme
function getThemeScript() {
  return {
    __html: `
      (function() {
        function getInitialTheme() {
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme) {
            return savedTheme;
          }
          
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
          }
          
          return 'light';
        }
        
        const theme = getInitialTheme();
        document.documentElement.classList.add(theme);
      })();
    `,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={getInitialProps()} />
        <script dangerouslySetInnerHTML={getThemeScript()} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <NotificationProvider>
            <AuthProvider>
              <CategoriesProvider>{children}</CategoriesProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
