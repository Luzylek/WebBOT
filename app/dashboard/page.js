'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LogOut, Settings, Shield, Music, Coins, Ticket, 
  MessageSquare, Users, Zap, ChevronRight, Server 
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [guilds, setGuilds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchGuilds()
    }
  }, [status, router])

  const fetchGuilds = async () => {
    try {
      const res = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        // Filter only servers where user has admin permissions
        const adminGuilds = data.filter(g => (g.permissions & 0x8) === 0x8)
        setGuilds(adminGuilds)
      }
    } catch (error) {
      console.error('Failed to fetch guilds:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-nyxora-darker flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-nyxora-darker">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-2xl">🌌</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Nyxora</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user.image && (
                <img 
                  src={session.user.image} 
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="text-gray-300 hidden md:block">{session.user.name}</span>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>
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
              Select a <span className="gradient-text">Server</span>
            </h1>
            <p className="text-xl text-gray-400">
              Choose a server to configure Nyxora
            </p>
          </motion.div>

          {guilds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <Server className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h2 className="text-2xl font-bold mb-2">No servers found</h2>
              <p className="text-gray-400 mb-6">
                You don&apos;t have admin permissions on any servers with Nyxora
              </p>
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1522992584732184756&permissions=8&scope=bot"
                className="px-6 py-3 gradient-bg rounded-full font-semibold hover:scale-105 transition"
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
                  className="glass rounded-2xl p-6 hover:border-purple-500 transition group"
                >
                  <div className="flex items-center gap-4">
                    {guild.icon ? (
                      <img 
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        alt={guild.name}
                        className="w-16 h-16 rounded-xl"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {guild.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition">
                        {guild.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {guild.member_count?.toLocaleString()} members
                      </p>
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