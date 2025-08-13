import React from 'react'
import { Card as MuiCard, CardContent, CardActions } from '@mui/material'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  hover = false 
}) => {
  return (
    <MuiCard
      className={cn(
        'rounded-xl shadow-md border border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800 transition-all duration-300',
        hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
      elevation={0}
    >
      {children}
    </MuiCard>
  )
}

export { CardContent, CardActions }