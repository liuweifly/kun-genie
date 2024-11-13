'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingState() {
  const [loadingText, setLoadingText] = useState('🎐 正在翻阅八字...')

  useEffect(() => {
    const texts = [
      '🎐 正在翻阅八字...',
      '🎋 正在推算五行...',
      '🎯 马上为您揭晓...'
    ]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length
      setLoadingText(texts[currentIndex])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="my-8 flex flex-col items-center justify-center"
    >
      <div className="flex items-center space-x-3 bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-700">{loadingText}</span>
      </div>
    </motion.div>
  )
} 