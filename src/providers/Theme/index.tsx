'use client'

import React, { createContext, useContext } from 'react'

import type { ThemeContextType } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Theme is set server-side via data-theme attribute on html element
  // No client-side mutations needed since theme is always 'light'
  const setTheme = React.useCallback(() => {}, [])
  return (
    <ThemeContext.Provider value={{ setTheme, theme: 'light' }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
