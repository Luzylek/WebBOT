import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nyxora - Nowoczesny bot Discord',
  description: 'Zaawansowany, wielofunkcyjny bot Discord z modułami moderacji, muzyki, poziomów, ekonomii i powitań.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}