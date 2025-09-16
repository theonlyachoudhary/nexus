'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Clock } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

export const DesignHero: React.FC<Page['hero']> = ({
  links,
  richText,
  title,
  highlightedWords,
  subtitle,
  ctaButton,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  // Function to highlight words in title
  const renderHighlightedTitle = (titleText: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight || wordsToHighlight.length === 0) {
      return titleText
    }

    let highlightedTitle = titleText
    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      highlightedTitle = highlightedTitle.replace(
        regex,
        `<span class="text-primary">${word}</span>`,
      )
    })

    return highlightedTitle
  }

  const wordsToHighlight = highlightedWords?.map((item) => item.word) || []

  return (
    <section className="relative h-[32rem] lg:h-[40rem] overflow-hidden lg:pt-0 my-0">
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Background PNG - Large screens only */}
        <Image
          src="/image.png"
          alt=""
          fill
          className="hidden lg:block object-cover object-right"
          draggable={false}
          priority
        />

        {/* Background SVG - constrained to 60% of viewport width on large screens */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[60vw]">
          <Image
            src="/hero.svg"
            alt=""
            fill
            className="object-cover object-left [object-position:50%_60%]"
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-[32rem] lg:h-[40rem] flex items-center">
        <div className="px-[10%] lg:pl-[5%] lg:pr-[15%] lg:w-[70rem] space-y-6 text-center lg:text-left">
          {/* Title */}
          {title && (
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              dangerouslySetInnerHTML={{
                __html: renderHighlightedTitle(title, wordsToHighlight),
              }}
            />
          )}

          {/* Subtitle */}
          {subtitle && (
            <h3 className="text-xl md:text-2xl text-black/60 font-medium">{subtitle}</h3>
          )}

          {/* CTA Button */}
          {ctaButton?.text && ctaButton?.url && (
            <div className="pt-4 space-y-3">
              <Button asChild size="lg" className="font-semibold">
                <a
                  href={ctaButton.url}
                  target={ctaButton.newTab ? '_blank' : '_self'}
                  rel={ctaButton.newTab ? 'noopener noreferrer' : undefined}
                >
                  {ctaButton.text}
                </a>
              </Button>

              {/* Mobile & tablet contact note */}
              <div className="flex items-center justify-center gap-2 text-sm text-black/60 lg:hidden">
                <Clock size={16} />
                <span>We'll contact you within 24 hours</span>
              </div>
            </div>
          )}

          {/* Fallback: Rich Text Content */}
          {!title && !subtitle && richText && (
            <RichText className="text-foreground" data={richText} enableGutter={false} />
          )}

          {/* Fallback: Legacy Links */}
          {!ctaButton?.text && Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {links.map(({ link }, i) => (
                <CMSLink key={i} {...link} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-15"></div>
    </section>
  )
}
