'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface HeaderClientProps {
  data: Header
  vertical?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuPanelRef = useRef<HTMLDivElement | null>(null)
  const firstFocusableRef = useRef<HTMLElement | null>(null)
  const lastFocusableRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Lock body scroll when mobile menu is open and restore on close
  useEffect(() => {
    const prev = typeof document !== 'undefined' ? document.body.style.overflow : ''
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = prev
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = prev
    }
  }, [menuOpen])

  // Basic focus trap: keep focus inside menu when open
  useEffect(() => {
    if (!menuOpen || !menuPanelRef.current) return

    const panel = menuPanelRef.current
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length > 0) {
      firstFocusableRef.current = focusable[0]
      lastFocusableRef.current = focusable[focusable.length - 1]
      firstFocusableRef.current.focus()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      } else if (e.key === 'Tab') {
        // trap focus
        if (document.activeElement === lastFocusableRef.current && !e.shiftKey) {
          e.preventDefault()
          firstFocusableRef.current?.focus()
        } else if (document.activeElement === firstFocusableRef.current && e.shiftKey) {
          e.preventDefault()
          lastFocusableRef.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const cta = data?.ctaButton

  // Motion variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const panelVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.995 },
  }

  return (
    <header
      className="sticky top-0 z-50 bg-background border-b border-border py-3"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded px-2 py-1 bg-brand-primary text-white"
      >
        Skip to content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Home">
              <Logo loading="eager" priority="high" className="!w-[72px]" />
            </Link>
          </div>

          {/* Center: Navigation - hidden on small screens */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center justify-center md:flex-1"
          >
            <div className="w-full max-w-3xl mx-auto">
              <HeaderNav data={data} className="flex flex-row gap-6 items-center justify-center" />
            </div>
          </nav>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              {cta?.text && (cta?.link || cta?.link === '') && (
                <Button size="lg" asChild>
                  <Link
                    href={String(cta.link || '')}
                    target={cta.newTab ? '_blank' : '_self'}
                    rel={cta.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {cta.text}
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                onClick={() => setMenuOpen((s) => !s)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay (animated with framer-motion) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 z-50 flex items-start justify-center"
            onClick={() => setMenuOpen(false)} // backdrop click closes
            aria-hidden="true"
          >
            {/* semi-opaque backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />

            {/* panel: clicking inside should not close */}
            <motion.div
              key="mobile-panel"
              ref={menuPanelRef}
              role="dialog"
              aria-modal="true"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={{ duration: 0.28, ease: [0.22, 0.9, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative mt-20 w-full max-w-lg mx-4 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 pt-6 pb-8">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                    <Logo loading="eager" priority="high" className="!w-[72px]" />
                  </Link>
                  <button
                    aria-label="Close menu"
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-0">
                  <HeaderNav data={data} />

                  {/* Mobile CTA */}
                  {cta?.text && (
                    <div className="mt-4">
                      <Button
                        size="lg"
                        asChild
                        className="w-full"
                        onClick={() => {
                          setMenuOpen(false)
                        }}
                      >
                        <a
                          href={String(cta.link || '')}
                          target={cta.newTab ? '_blank' : '_self'}
                          rel={cta.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {cta.text}
                        </a>
                      </Button>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-center text-muted-foreground">
                    <Link href="/privacy" onClick={() => setMenuOpen(false)}>
                      Privacy
                    </Link>
                    <span className="mx-2">·</span>
                    <Link href="/terms" onClick={() => setMenuOpen(false)}>
                      Terms
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anchor for Skip link target */}
      <div id="main" />
    </header>
  )
}

export default HeaderClient
