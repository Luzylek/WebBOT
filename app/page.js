'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Music, Shield, Coins, MessageSquare, Users, Ticket, 
  Sparkles, Bot, Trophy, Settings, ChevronRight, 
  Heart, Zap, Radio 
} from 'lucide-react'

const INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1522992584732184756&permissions=8&integration_type=0&scope=bot+applications.commands'

export default function Home() {
  const [stats] = useState({
    servers: 100,
    users: 10000,
    commands: 61
  })

  const features = [
    { icon: Music, title: 'Music Player', desc: 'High-quality music from YouTube, Spotify & more', color: 'from-pink-500 to-purple-500' },
    { icon: Shield, title: 'Moderation', desc: 'Ban, kick, mute, warn with audit logs', color: 'from-red-500 to-orange-500' },
    { icon: Coins, title: 'Economy', desc: 'Daily rewards, jobs, gambling & shop', color: 'from-yellow-500 to-orange-500' },
    { icon: Trophy, title: 'Leveling', desc: 'XP system with beautiful rank cards', color: 'from-purple-500 to-blue-500' },
    { icon: MessageSquare, title: 'Auto Moderation', desc: 'Anti-spam, anti-caps, anti-invite', color: 'from-red-500 to-pink-500' },
    { icon: Ticket, title: 'Ticket System', desc: 'Advanced support ticket panel', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, title: 'Welcome/Goodbye', desc: 'Beautiful custom welcome cards', color: 'from-green-500 to-emerald-500' },
    { icon: Radio, title: 'Reaction Roles', desc: 'Self-assign roles with buttons', color: 'from-purple-500 to-pink-500' },
    { icon: Sparkles, title: 'Fun & Images', desc: 'Ship, caption, meme generator', color: 'from-yellow-500 to-pink-500' },
  ]

  return (
    <main className="min-h-screen bg-nyxora-darker overflow-hidden">
      
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-2xl">🌌</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Nyxora</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#stats" className="text-gray-300 hover:text-white transition">Stats</a>
            <a href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</a>
            <a href={INVITE_URL} className="px-6 py-2 gradient-bg rounded-full font-semibold hover:scale-105 transition">
              Add to Discord
            </a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-24 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">The Ultimate Discord Bot</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-6"
          >
            Meet <span className="gradient-text">Nyxora</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            All-in-one Discord bot with music, moderation, economy, leveling, 
            tickets, and <span className="gradient-text font-bold">50+ features</span> to power your community.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href={INVITE_URL} className="px-8 py-4 gradient-bg rounded-full font-bold text-lg hover:scale-105 transition flex items-center gap-2 shadow-2xl shadow-purple-500/50">
              <Bot className="w-5 h-5" />
              Add to Discord
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href="/dashboard" className="px-8 py-4 glass rounded-full font-bold text-lg hover:scale-105 transition flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Dashboard
            </a>
          </motion.div>
        </div>
      </section>

      <section id="stats" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: stats.servers + '+', label: 'Servers', icon: Users },
            { value: stats.users.toLocaleString() + '+', label: 'Users', icon: Heart },
            { value: stats.commands + '+', label: 'Commands', icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 text-center hover:scale-105 transition"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <div className="text-5xl font-black gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">Powerful <span className="gradient-text">Features</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to manage and grow your Discord community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 hover:border-purple-500 transition group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full gradient-bg"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to <span className="gradient-text">get started?</span></h2>
            <p className="text-xl text-gray-300 mb-8">Add Nyxora to your server in seconds. It&apos;s completely free!</p>
            <a href={INVITE_URL} className="inline-flex items-center gap-2 px-10 py-4 gradient-bg rounded-full font-bold text-lg hover:scale-105 transition shadow-2xl shadow-purple-500/50">
              <Bot className="w-5 h-5" />
              Invite Nyxora
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-purple-500/20 py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-2xl">🌌</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Nyxora</span>
            </div>
            <p className="text-gray-400 max-w-md">The ultimate all-in-one Discord bot for your community.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-purple-400 transition">Features</a></li>
              <li><a href="/dashboard" className="hover:text-purple-400 transition">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href={INVITE_URL} className="hover:text-purple-400 transition">Invite Bot</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-purple-500/20 text-center text-gray-500">
          <p>© 2024 Nyxora. Made with 💜</p>
        </div>
      </footer>
    </main>
  )
}