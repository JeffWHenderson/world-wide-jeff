import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Language App",
  description: "World Wide Jeff Language Learning App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div style={{ width: '100%', height: '100vh' }}>
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
