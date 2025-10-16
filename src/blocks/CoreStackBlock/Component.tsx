'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import Image from 'next/image'

export interface CoreStackBlockProps {
  title?: string
  subtitle?: string
  cards?: {
    image?: string | { url: string; alt?: string }
    summary?: string
    scale?: number
  }[]
}

export const CoreStackBlock: React.FC<CoreStackBlockProps> = ({ title, subtitle, cards = [] }) => {
  return (
    <section className="py-12">
      <div className="px-4 w-full">
        <div className="mb-8 flex">
          <SectionHeader
            heading={title ?? ''}
            subheading={subtitle ?? ''}
            align="left"
            spacing="sm"
            containerClassName="w-full ml-0"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className="
                bg-white shadow-lg flex flex-col items-center justify-between
                transition-shadow duration-300 hover:shadow-[0_0_24px_4px_theme(colors.primary.DEFAULT)]
                w-[calc(50%-0.5rem)] md:w-[15rem]
              "
              style={{
                border: 'none',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '75%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                {card.image &&
                  typeof card.image === 'object' &&
                  'url' in card.image &&
                  (() => {
                    const scale = card.scale ?? 1
                    const baseSize = 6
                    const sizeRem = baseSize * scale

                    return (
                      <Image
                        src={(card.image as { url: string }).url}
                        alt={
                          typeof card.image === 'object' && 'alt' in card.image
                            ? card.image.alt || 'Card image'
                            : 'Card image'
                        }
                        width={0}
                        height={0}
                        unoptimized
                        style={{
                          objectFit: 'contain',
                          borderRadius: '0.5rem',
                          width: `${sizeRem}rem`,
                          height: `${sizeRem}rem`,
                          aspectRatio: '1 / 1',
                          maxHeight: '100%',
                          maxWidth: '100%',
                        }}
                      />
                    )
                  })()}
              </div>
              <CardContent
                className="flex flex-col items-start pb-2 px-4 flex-start"
              >
                {card.summary && <p className="text-center w-full">{card.summary}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
