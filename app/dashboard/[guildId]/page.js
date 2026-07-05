'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LogOut, ArrowLeft, Settings, Shield, Music, Coins, 
  Ticket, MessageSquare, Users, Zap, Save, Check 
} from 'lucide-react'

export default function ServerDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const guildId = params.guildId
  
  const [guild, setGuild] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    welcome_enabled: false,
    welcome_channel: '',
    goodbye_enabled: false,
    goodbye_channel: '',
    logs_enabled: false,
    logs_channel: '',
    automod_enabled: false,
    economy_enabled: true,
    tickets_enabled: false,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchGuild()
    }
  }, [status, router])

  const fetchGuild = async () => {
    try {
      const res = await fetch(`https://discord.com/api/guilds/${guildId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        setGuild(data)
      }
    } catch (error) {
      console.error('Failed to fetch guild:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    
    // TODO: Save to Supabase
    // await supabase.from('guild_settings').upsert({...})
    
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setSaving(false)
  }

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-nyxora-darker flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading server...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-nyxora-darker">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="p-2 hover:bg-white/10 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </a>
            
            {guild?.icon ? (
              <img 
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                alt={guild.name}
                className="w-10 h-10 rounded-xl"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-xl font-bold">
                  {guild?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <span className="text-xl font-bold">{guild?.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
                saved 
                  ? 'bg-green-500' 
                  : 'gradient-bg hover:scale-105'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </>
              )}
            </button>
            
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
        <div className="max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-black mb-2">
              Server <span className="gradient-text">Settings</span>
            </h1>
            <p className="text-gray-400">
              Configure Nyxora for {guild?.name}
            </p>
          </motion.div>

          <div className="space-y-6">
            
            {/* Welcome Module */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Welcome & Goodbye</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Enable Welcome Messages</label>
                  <input
                    type="checkbox"
                    checked={settings.welcome_enabled}
                    onChange={(e) => setSettings({...settings, welcome_enabled: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
                
                {settings.welcome_enabled && (
                  <input
                    type="text"
                    placeholder="Welcome Channel ID"
                    value={settings.welcome_channel}
                    onChange={(e) => setSettings({...settings, welcome_channel: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <label className="text-gray-300">Enable Goodbye Messages</label>
                  <input
                    type="checkbox"
                    checked={settings.goodbye_enabled}
                    onChange={(e) => setSettings({...settings, goodbye_enabled: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
                
                {settings.goodbye_enabled && (
                  <input
                    type="text"
                    placeholder="Goodbye Channel ID"
                    value={settings.goodbye_channel}
                    onChange={(e) => setSettings({...settings, goodbye_channel: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                )}
              </div>
            </motion.div>

            {/* Logs Module */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Logs</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Enable Server Logs</label>
                  <input
                    type="checkbox"
                    checked={settings.logs_enabled}
                    onChange={(e) => setSettings({...settings, logs_enabled: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
                
                {settings.logs_enabled && (
                  <input
                    type="text"
                    placeholder="Logs Channel ID"
                    value={settings.logs_channel}
                    onChange={(e) => setSettings({...settings, logs_channel: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                )}
              </div>
            </motion.div>

            {/* AutoMod Module */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Auto Moderation</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Enable AutoMod</label>
                  <input
                    type="checkbox"
                    checked={settings.automod_enabled}
                    onChange={(e) => setSettings({...settings, automod_enabled: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
                
                <p className="text-gray-400 text-sm">
                  AutoMod includes: anti-spam, anti-caps, anti-invite, anti-link
                </p>
              </div>
            </motion.div>

            {/* Economy Module */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Economy</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Enable Economy System</label>
                  <input
                    type="checkbox"
                    checked={settings.economy_enabled}
                    onChange={(e) => setSettings({...settings, economy_enabled: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
                
                <p className="text-gray-400 text-sm">
                  Economy includes: daily, work, shop, gambling, levels
                </p>
              </div>
            </motion.div>

            {/* Tickets Module */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Tickets</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Enable Ticket System</label>
                  <input
                    type="checkbox"
                    checked={settings.tickets_enabled}
                    onChange={(e) => setSettings({...settings, tickets_enabled: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  )
}