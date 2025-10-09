'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import Image from 'next/image'

export interface PartnersBannerBlockProps {
  title?: string
  subtitle?: string
  cards?: {
    image?: string | { url: string; alt?: string }
    scale?: number
  }[]
}

export const PartnersBannerBlock: React.FC<PartnersBannerBlockProps> = ({
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
