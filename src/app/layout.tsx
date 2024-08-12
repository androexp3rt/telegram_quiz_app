import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Uncommon S2 Quiz App",
  description: "Created by Sy",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;   
    // Set script to load asynchronously
    document.head.appendChild(script);
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
