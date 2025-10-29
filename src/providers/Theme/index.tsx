'use client'

import React, { createContext, useContext } from 'react'

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
  return (
    <ThemeContext.Provider value={{ setTheme, theme: 'light' }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
