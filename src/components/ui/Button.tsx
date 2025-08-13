import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<MuiButtonProps, 'className'> {
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'contained',
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      className={cn(
        'normal-case font-medium rounded-lg transition-all duration-300',
        variant === 'contained' && 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
        variant === 'outlined' && 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
        variant === 'text' && 'text-blue-600 hover:bg-blue-50',
        className
      )}
      {...props}
    >
      {children}
    </MuiButton>
  )
}