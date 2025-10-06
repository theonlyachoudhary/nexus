'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import Image from 'next/image'

export interface ApplicationEcosystemBlockProps {
  title?: string
  subtitle?: string
  categories?: {
    name?: string
    images?: string[]
  }[]
}

export const ApplicationEcosystemBlock: React.FC<ApplicationEcosystemBlockProps> = ({
  title,
  subtitle,
  categories = [],
}) => {
  return (
    <section className="py-12">
      <SectionHeader
        heading={title ?? ''}
        subheading={subtitle ?? ''}
        align="center"
        spacing="md"
      />
      <div className="flex flex-wrap justify-center items-start gap-8">
        {categories.map((category, idx) => (
          <Card
            key={idx}
            className="p-6 rounded-xl border border-gray-100 bg-brand-neutral/25 flex flex-col max-w-[22rem] justify-between shadow-sm mx-auto"
          >
            <CardContent className="flex flex-col h-full p-0 items-center">
              {category.name && (
                <h3 className="font-bold text-lg mb-4 text-center">{category.name}</h3>
              )}
              {category.images && category.images.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mb-2">
                  {category.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`Category image ${i + 1}`}
                      className="w-24 h-24 object-contain rounded-md bg-white p-2"
                      width={96}
                      height={96}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
