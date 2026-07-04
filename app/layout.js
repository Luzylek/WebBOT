import './globals.css'

export const metadata = {
  title: 'Nyxora - The Ultimate Discord Bot',
  description: 'Powerful all-in-one Discord bot with music, moderation, economy, and much more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-nyxora-darker text-white antialiased">
        {children}
      </body>
    </html>
  )
}