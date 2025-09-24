import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType = {
  title?: string | null | undefined
  description?: string | null | undefined
  children?: React.ReactNode
  richText?: Page['hero']['richText']
}

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  title,
  description,
  children,
  richText,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="text-center mb-16">
        {title && <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">{title}</h1>}
        {description && <p className="text-xl max-w-3xl mx-auto leading-relaxed">{description}</p>}
        {!title && !description && children}
        {!title && !description && richText && <RichText data={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
