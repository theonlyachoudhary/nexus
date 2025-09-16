'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const cta = data?.ctaButton

  return (
    <header
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              {/* Use Logo component if available, otherwise site name */}
              <span className="sr-only">Home</span>
              <Logo loading="eager" priority="high" className="h-8 md:h-10 lg:h-12 max-w-[9rem]" />
            </Link>
          </div>

          <div className="hidden md:flex md:ml-10 md:flex-1 md:items-center">
            <div className="w-full">
              <HeaderNav data={data} className="w-full justify-between" />
            </div>
          </div>

          <div className="flex items-center">
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
            <div className="md:hidden ml-4">
              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="p-2 rounded"
                onClick={() => setMenuOpen((s) => !s)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4">
            <div className="flex flex-col gap-4">
              <HeaderNav data={data} />

              {/* CTA inside mobile menu */}
              {cta?.text && (
                <div>
                  <Button size="lg" asChild className="w-full">
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
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
