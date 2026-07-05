'use client'

import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Bot, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-nyxora-darker flex items-center justify-center px-6">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-12 max-w-md w-full text-center relative z-10"
      >
        <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🌌</span>
        </div>

        <h1 className="text-4xl font-black mb-2 gradient-text">Nyxora</h1>
        <p className="text-gray-400 mb-8">Dashboard</p>

        <div className="space-y-4">
          <button
            onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
            className="w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl font-bold text-lg transition flex items-center justify-center gap-3"
          >
            <Bot className="w-6 h-6" />
            Continue with Discord
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </motion.div>
    </main>
  )
}