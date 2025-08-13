'use client'

import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, GitHub, LinkedIn, Mail } from '@mui/icons-material'
import { useTheme as useNextTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { theme: currentTheme, setTheme } = useNextTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div className="w-64 p-4">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h6" className="font-bold">
          AG
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </div>
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} className="px-0">
            <Link href={item.href} className="w-full">
              <ListItemText 
                primary={item.name} 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              />
            </Link>
          </ListItem>
        ))}
      </List>
      <div className="mt-8 space-y-4">
        <Button
          onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          variant="outlined"
          fullWidth
        >
          {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <AppBar 
        position="fixed" 
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
        elevation={0}
      >
        <Toolbar className="max-w-7xl mx-auto w-full px-4">
          <Typography variant="h6" className="font-bold text-gray-900 dark:text-white mr-auto">
            Alshafaraz Gazi
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2">
                <IconButton
                  href="https://github.com/gazi786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://linkedin.com/in/alshafaraz-gazi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  <LinkedIn />
                </IconButton>
                <Button
                  onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                  variant="outlined"
                  size="small"
                >
                  {currentTheme === 'dark' ? '☀️' : '🌙'}
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="text-gray-900 dark:text-white"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed header */}
      <Toolbar />
    </>
  )
}