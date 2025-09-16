'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
// ...existing code...
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; className?: string }> = ({
  data,
  className,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn('flex items-center justify-center', className)}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="mx-[1rem] md:mx-[6.25rem] text-center text-black hover:text-primary transition-colors"
          />
        )
      })}
      {/* search removed per request */}
    </nav>
  )
}
