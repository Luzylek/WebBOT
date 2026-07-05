'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, ChevronRight, Server } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [guilds, setGuilds] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      setLoading(true)
      fetch('https://discord.com/api/users/@me/guilds', {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          const adminGuilds = data.filter(g => (g.permissions & 0x8) === 0x8)
          setGuilds(adminGuilds)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [status, session])

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-nyxora-darker flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-nyxora-darker flex items-center justify-center px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-12 max-w-md w-full text-center relative z-10"
        >
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌌</span>
          </div>

          <h1 className="text-4xl font-black mb-2 gradient-text">Nyxora</h1>
          <p className="text-gray-400 mb-8">Sign in to access your dashboard</p>

          <button
            onClick={() => signIn('discord')}
            className="w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl font-bold text-lg transition flex items-center justify-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 71 55" fill="white">
              <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.7 40.7 0 00-1.8 3.7 54 54 0 00-16.2 0A26.4 26.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 5 59.1 59.1 0 00.4 44.8a.2.2 0 000 .2 58.8 58.8 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.6.2.2 0 01 0-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .3 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.2 47.2 0 003.6 5.9.2.2 0 00.3.1A58.6 58.6 0 0070.2 45a.2.2 0 000-.2A58.6 58.6 0 0060.1 5zM23.7 36.7c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.2 6.4-7.2 6.5 3.2 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1zm23.6 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.2 6.4-7.2 6.5 3.2 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1z"/>
            </svg>
            Continue with Discord
          </button>

          <p className="text-gray-600 text-xs mt-6">
            We only request access to your server list
          </p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-nyxora-darker">
      
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-2xl">🌌</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Nyxora</span>
          </a>
          
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              <img src={session.user.image} alt="" className="w-10 h-10 rounded-full" />
            )}
            <span className="text-gray-300 hidden md:block">{session?.user?.name || 'User'}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-black mb-4">
              Your <span className="gradient-text">Servers</span>
            </h1>
            <p className="text-xl text-gray-400">Select a server to configure</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Fetching servers...</p>
            </div>
          ) : guilds.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl p-12 text-center">
              <Server className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h2 className="text-2xl font-bold mb-2">No servers found</h2>
              <p className="text-gray-400 mb-6">You need admin permissions on a server with Nyxora</p>
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1522992584732184756&permissions=8&scope=bot"
                className="px-6 py-3 gradient-bg rounded-full font-semibold hover:scale-105 transition inline-block"
              >
                Invite Nyxora
              </a>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guilds.map((guild, i) => (
                <motion.a
                  key={guild.id}
                  href={`/dashboard/${guild.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 hover:border-purple-500 transition group block"
                >
                  <div className="flex items-center gap-4">
                    {guild.icon ? (
                      <img 
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        alt=""
                        className="w-16 h-16 rounded-xl"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                        <span className="text-2xl font-bold">{guild.name?.charAt(0) || '?'}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-purple-400 transition">{guild.name}</h3>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-purple-400 transition" />
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}