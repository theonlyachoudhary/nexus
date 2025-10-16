'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; className?: string; vertical?: boolean }> = ({
  data,
  className,
  vertical,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav
      className={cn(
        // Default: stack vertically (mobile)
        'flex items-center justify-center w-full gap-2',
        // If vertical is requested explicitly, keep column layout on all sizes
        vertical ? 'flex-col' : 'flex-col md:flex-row md:gap-6',
        className,
      )}
    >
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="link"
          className={cn(
            'block w-full text-center text-base font-medium transition-colors',
            'text-foreground hover:text-primary md:w-auto md:text-left',
          )}
        />
      ))}
    </nav>
  )
}
