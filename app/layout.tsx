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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={getInitialProps()} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
