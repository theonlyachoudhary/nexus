'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
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
  heroImage,
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
    <section className="relative h-[60vh]overflow-hidden lg:pt-0 my-0">
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Background PNG - Large screens only */}
        <div>
          <Image
            src={
              typeof heroImage === 'object' &&
              heroImage !== null &&
              'url' in heroImage &&
              typeof heroImage.url === 'string' &&
              heroImage.url
                ? heroImage.url
                : '/image.webp'
            }
            alt={
              typeof heroImage === 'object' && heroImage !== null && 'alt' in heroImage
                ? (heroImage.alt as string)
                : ''
            }
            fill
            className="hidden lg:block object-cover object-right"
            draggable={false}
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI4Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y1ZjVmNSIgZmlsdGVyPSJ1cmwoI2JsdXIpIi8+PC9zdmc+"
          />
        </div>

        {/* Background SVG - constrained to smaller width and height on large screens */}
        <div className="hidden lg:block absolute left-0 top-0 w-[60vw] h-[60vh]">
          <Image src="/hero.svg" alt="" fill className="w-full h-full" draggable={false} priority />
        </div>
      </div>

      {/* Content */}
      <div className="ml-[3rem] relative z-20 lg:h-[60vh] lg:w-[50vw] flex items-center justify-center lg:justify-start">
        <div className="mx-auto p-24 px-[10%] lg:pl-[5%] lg:pr-[15%] lg:w-[70rem] space-y-6 text-center md:text-center lg:text-left">
          {/* Title */}
          {title && (
            <motion.h1
              className="font-bold text-foreground leading-tight"
              style={{
                fontSize: 'clamp(2rem, 6vh, 4rem)',
              }}
              dangerouslySetInnerHTML={{
                __html: renderHighlightedTitle(title, wordsToHighlight),
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2}}
            />
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.h3
              className="text-black/60 font-medium"
              style={{
                fontSize: 'clamp(1.125rem, 2vh, 1.75rem)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2}}
            >
              {subtitle}
            </motion.h3>
          )}

          {/* CTA Button */}
          {ctaButton?.text && ctaButton?.url && (
            <motion.div
              className="pt-4 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2}}
            >
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
              <motion.div
                className="flex items-center justify-center gap-2 text-sm text-black/60 lg:hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                <Clock size={16} />
                <span>We&apos;ll contact you within 24 hours</span>
              </motion.div>
            </motion.div>
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
