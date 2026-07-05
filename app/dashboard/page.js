'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ChevronRight, Server, X } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [guilds, setGuilds] = useState([])
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      setShowLogin(true)
    } else if (status === 'authenticated') {
      setShowLogin(false)
      if (session?.accessToken) {
        fetchGuilds()
      }
    }
  }, [status, session])

  const fetchGuilds = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })

      if (res.ok) {
        const data = await res.json()
        const adminGuilds = data.filter(g => (g.permissions & 0x8) === 0x8)
        setGuilds(adminGuilds)
      } else {
        console.error('Discord API error:', res.status)
      }
    } catch (error) {
      console.error('Failed to fetch guilds:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-nyxora-darker flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-nyxora-darker">

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="glass rounded-3xl p-10 max-w-md w-full text-center relative"
            >
              <a
                href="/"
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </a>

              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌌</span>
              </div>

              <h1 className="text-4xl font-black mb-2 gradient-text">Nyxora</h1>
              <p className="text-gray-400 mb-2">Dashboard</p>
              <p className="text-gray-500 text-sm mb-8">
                Sign in with Discord to manage your servers
              </p>

              <button
                onClick={() => signIn('discord')}
                className="w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl font-bold text-lg transition flex items-center justify-center gap-3"
              >
                <svg width="24" height="24" viewBox="0 0 71 55" fill="white">
                  <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.7 40.7 0 00-1.8 3.7 54 54 0 00-16.2 0A26.4 26.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 5 59.1 59.1 0 00.4 44.8a.2.2 0 000 .2 58.8 58.8 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.6.2.2 0 01 0-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .3 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.2 47.2 0 003.6 5.9.2.2 0 00.3.1A58.6 58.6 0 0070.2 45a.2.2 0 000-.2A58.6 58.6 0 0060.1 5zM23.7 36.7c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.2 6.4-7.2 6.5 3.2 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1zm23.6 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.2 6.4-7.2 6.5 3.2 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1z"/>
                </svg>
                Continue with Discord
              </button>

              <div className="mt-6 flex items-center gap-2 justify-center text-gray-500 text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                We only request access to your server list
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-2xl">🌌</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Nyxora</span>
          </a>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                {session.user.image && (
                  <img src={session.user.image} alt="" className="w-10 h-10 rounded-full" />
                )}
                <span className="text-gray-300 hidden md:block">{session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <LogOut className="w-5 h-5 text-gray-400" />
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn('discord')}
                className="px-6 py-2 gradient-bg rounded-full font-semibold hover:scale-105 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
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
            <p className="text-xl text-gray-400">Select a server to configure Nyxora</p>
          </motion.div>

          {!session ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl p-12 text-center">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Sign in required</h2>
              <p className="text-gray-400 mb-6">You need to sign in with Discord to view your servers</p>
              <button
                onClick={() => signIn('discord')}
                className="px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl font-bold text-lg transition inline-flex items-center gap-3"
              >
                <svg width="24" height="24" viewBox="0 0 71 55" fill="white">
                  <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.7 40.7 0 00-1.8 3.7 54 54 0 00-16.2 0A26.4 26.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 5 59.1 59.1 0 00.4 44.8a.2.2 0 000 .2 58.8 58.8 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.6.2.2 0 01 0-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .3 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.2 47.2 0 003.6 5.9.2.2 0 00.3.1A58.6 58.6 0 0070.2 45a.2.2 0 000-.2A58.6 58.6 0 0060.1 5zM23.7 36.7c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.2 6.4-7.2 6.5 3.2 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1zm23.6 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.2 6.4-7.2 6.5 3.2 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1z"/>
                </svg>
                Continue with Discord
              </button>
            </motion.div>
          ) : loading ? (
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