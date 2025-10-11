'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import * as LucideIcons from 'lucide-react'

export interface ServiceSummaryBlockProps {
  title?: string
  subtitle?: string
  cards?: {
    title?: string
    description?: string
    icon?: keyof typeof LucideIcons
  }[]
}

export const ServiceSummaryBlock: React.FC<ServiceSummaryBlockProps> = ({
  title,
  subtitle,
  cards = [],
}) => {
  return (
    <section className="py-12">
      <div className="px-4 w-full">
        <div className="mb-8 flex">
          <SectionHeader
            heading={title ?? ''}
            subheading={subtitle ?? ''}
            align="center"
            spacing="sm"
            containerClassName="w-full"
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {cards.map((card, idx) => {
            const LucideIcon =
              card.icon && LucideIcons[card.icon]
                ? (LucideIcons[card.icon] as React.FC<{ size?: number; color?: string }>)
                : LucideIcons['Circle']

            return (
              <Card
                key={idx}
                className="bg-white shadow-lg flex flex-col items-center justify-between transition-shadow duration-300 hover:shadow-[0_0_24px_4px_theme(colors.primary.DEFAULT)] w-[15rem] h-[15rem] border-none rounded-xl overflow-hidden"
              >
                <div className="h-[60%] w-full flex items-center justify-center p-4">
                  <LucideIcon size={48} className="text-primary" />
                </div>
                <CardContent className="flex flex-col items-start pb-2 px-4 h-[40%] w-full justify-start">
                  {card.title && (
                    <p className="font-bold text-lg text-left w-full mb-1">{card.title}</p>
                  )}
                  {card.description && (
                    <p className="text-left w-full text-brand-text-secondary">{card.description}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
