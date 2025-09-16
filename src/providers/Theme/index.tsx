'use client'

import React, { createContext, use } from 'react'

import type { ThemeContextType } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Always use light theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])
  const setTheme = React.useCallback(() => {}, [])
  return <ThemeContext value={{ setTheme, theme: 'light' }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
