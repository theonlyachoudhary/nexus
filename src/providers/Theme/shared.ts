import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'

// No-op: dark mode is disabled site-wide
export const getImplicitPreference = (): Theme | null => 'light'
