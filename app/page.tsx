'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'identify email guilds',
      },
    })
  }

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded font-bold">
            N
          </div>
          <span className="font-semibold">Nyxora</span>
        </div>

        <div className="flex items-center gap-8 text-sm">
          <a href="#funkcje" className="hover:text-gray-600">Funkcje</a>
          <a href="#mozliwosci" className="hover:text-gray-600">Możliwości</a>
          {user ? (
            <Link href="/dashboard" className="hover:text-gray-600">Panel</Link>
          ) : (
            <button onClick={handleLogin} className="hover:text-gray-600">
              Zaloguj się
            </button>
          )}
        </div>

        <button
          onClick={user ? () => (window.location.href = '/dashboard') : handleLogin}
          className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          Rozpocznij
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-32 pb-24">
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-sm mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Online · 142 serwery
        </div>

        <h1 className="text-6xl md:text-7xl font-serif font-normal leading-tight max-w-4xl">
          Nowoczesny bot
          <br />
          <span className="italic">dla Twojego Discorda</span>
        </h1>

        <p className="mt-8 text-gray-600 max-w-xl text-lg">
          Nyxora to zaawansowany, wielofunkcyjny bot Discord z modułami
          moderacji, muzyki, poziomów, ekonomii i powitań. W pełni
          konfigurowalny i gotowy do działania.
        </p>

        <div className="mt-10 flex gap-4">
          <button
            onClick={handleLogin}
            className="bg-black text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-gray-800"
          >
            Logowanie przez Discord →
          </button>
          <a
            href="#funkcje"
            className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50"
          >
            Poznaj funkcje
          </a>
        </div>

        {/* Statystyki */}
        <div className="mt-20 grid grid-cols-4 gap-16">
          {[
            { val: '142', label: 'Serwery' },
            { val: '48.2k', label: 'Użytkowników' },
            { val: '99.9%', label: 'Uptime' },
            { val: '<20ms', label: 'Ping' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-serif">{s.val}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Funkcje */}
      <section id="funkcje" className="px-8 py-24 border-t border-gray-200">
        <h2 className="text-4xl font-serif text-center mb-16">Funkcje</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { t: 'Moderacja', d: 'Zaawansowane narzędzia moderacji, auto-mod, logi.' },
            { t: 'Muzyka', d: 'Wysokiej jakości odtwarzanie z YouTube, Spotify.' },
            { t: 'Poziomy', d: 'System XP i rankingów dla aktywnych użytkowników.' },
            { t: 'Ekonomia', d: 'Wirtualna waluta, sklep i mini-gry.' },
            { t: 'Powitania', d: 'Personalizowane wiadomości powitalne.' },
            { t: 'Konfiguracja', d: 'Pełna kontrola z panelu webowego.' },
          ].map((f) => (
            <div key={f.t} className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
              <h3 className="font-semibold text-lg mb-2">{f.t}</h3>
              <p className="text-gray-600 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}