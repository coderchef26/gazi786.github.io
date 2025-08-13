'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu as MenuIcon, Close as CloseIcon, GitHub, LinkedIn, Mail, Power } from '@mui/icons-material'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isHovered, setIsHovered] = useState('')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <motion.div 
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      className="w-80 h-full stark-panel p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.div 
          className="stark-text font-orbitron font-bold text-xl"
          animate={{ textShadow: ['0 0 10px #00d4ff', '0 0 20px #00d4ff', '0 0 10px #00d4ff'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          STARK.OS
        </motion.div>
        <motion.button
          onClick={handleDrawerToggle}
          className="hud-element p-2 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CloseIcon />
        </motion.button>
      </div>
      
      <div className="space-y-2">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href} onClick={handleDrawerToggle}>
              <motion.div 
                className="hud-element p-3 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-all cursor-pointer"
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 space-y-4">
        <motion.div 
          className="hud-element p-3 text-center stark-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          NEURAL LINK: ACTIVE
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <>
      {/* Main Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 stark-panel border-b border-[#00d4ff]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#ff6b6b] energy-core" />
              <div className="stark-text font-orbitron font-bold text-xl">
                ALSHAFARAZ.GAZI
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className="stark-text hover:text-white transition-colors relative"
                    onMouseEnter={() => setIsHovered(item.name)}
                    onMouseLeave={() => setIsHovered('')}
                  >
                    {item.name}
                    {isHovered === item.name && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#00d4ff]"
                        layoutId="navbar-indicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              <div className="flex items-center space-x-4">
                <motion.a
                  href="https://github.com/gazi786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-element p-2 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GitHub fontSize="small" />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/alshafaraz-gazi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-element p-2 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LinkedIn fontSize="small" />
                </motion.a>
                
                <motion.div
                  className="hud-element px-3 py-1 stark-text text-xs"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ONLINE
                </motion.div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden hud-element p-2 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors"
              onClick={handleDrawerToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MenuIcon />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={handleDrawerToggle}
            />
            <div className="fixed right-0 top-0 h-full z-50 md:hidden">
              {drawer}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}