'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import Image from 'next/image'

export interface CoreStackBlockProps {
  title?: string
  subtitle?: string
  cards?: {
    image?: string
    summary?: string
  }[]
}

export const CoreStackBlock: React.FC<CoreStackBlockProps> = ({ title, subtitle, cards = [] }) => {
  return (
    <section className="py-12">
      <SectionHeader
        heading={title ?? ''}
        subheading={subtitle ?? ''}
        align="center"
        spacing="md"
      />
      <div className="flex flex-wrap justify-center items-center gap-8">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="p-6 rounded-xl border border-gray-100 bg-brand-neutral/25 flex flex-col max-w-[22rem] justify-between shadow-sm mx-auto"
          >
            <CardContent className="flex flex-col h-full p-0 items-center">
              {card.image && (
                <Image
                  src={card.image}
                  alt="Card image"
                  className="mb-4 w-full h-40 object-cover rounded-md"
                  width={352}
                  height={160}
                />
              )}
              {card.summary && (
                <p className="text-center text-brand-text-secondary">{card.summary}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
