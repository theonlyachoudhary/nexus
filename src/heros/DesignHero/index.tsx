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
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background PNG - Large screens only */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <Image
            src="/image.png"
            alt=""
            fill
            className="hidden lg:block object-cover object-right"
            draggable={false}
            priority
          />
        </motion.div>

        {/* Background SVG - constrained to 60% of viewport width on large screens */}
        <motion.div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-[60vw]"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
        >
          <Image
            src="/hero.svg"
            alt=""
            fill
            className="object-cover object-left [object-position:50%_60%]"
            draggable={false}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-[32rem] lg:h-[40rem] flex items-center">
        <div className="px-[10%] lg:pl-[5%] lg:pr-[15%] lg:w-[70rem] space-y-6 text-center lg:text-left">
          {/* Title */}
          {title && (
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              dangerouslySetInnerHTML={{
                __html: renderHighlightedTitle(title, wordsToHighlight),
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.h3
              className="text-xl md:text-2xl text-black/60 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
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
              transition={{ duration: 0.7, delay: 0.8 }}
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
