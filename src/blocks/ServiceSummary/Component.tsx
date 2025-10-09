'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'

export interface ServiceSummaryBlockProps {
  title?: string
  subtitle?: string
  cards?: {
    title?: string
    description?: string
    icon?: string
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
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className="bg-white shadow-lg flex flex-col items-center justify-between transition-shadow duration-300 hover:shadow-[0_0_24px_4px_theme(colors.primary.DEFAULT)]"
              style={{
                width: '15rem',
                height: '15rem',
                border: 'none',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              ></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
