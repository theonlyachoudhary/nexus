'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'

interface UnderConstructionBlockProps {
  heading?: string
  subheading?: string
  message?: {
    heading?: string
    text?: string
  }
  checklist?: {
    heading?: string
    items: { text: string }[]
  }
  cta?: {
    text?: string
    link?: string
  }
}

export const UnderConstructionBlock: React.FC<UnderConstructionBlockProps> = (props) => {
  const {
    heading = 'Under Construction',
    subheading = "This page or feature is not ready yet, but we're working on it!",
    message = {
      heading: 'Hang Tight!',
      text: "We're building something awesome. Check back soon or contact us if you need help.",
    },
    checklist = {
      heading: 'What you can do:',
      items: [
        { text: 'Check back later for updates' },
        { text: 'Contact us for more info' },
        { text: 'Explore other parts of the site' },
      ],
    },
    cta = { text: 'Contact Us', link: '/contact' },
  } = props

  return (
    <section className="py-20 my-0 bg-brand-neutral/20">
      <SectionHeader
        heading={heading}
        subheading={subheading}
        containerClassName="max-w-7xl sm:px-6 lg:px-8"
        headingClassName="text-4xl md:text-5xl font-semibold"
        subheadingClassName="text-xl subtitle text-brand-text-secondary"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-brand-neutral/25">
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-brand-primary">
                    {message.heading}
                  </h3>
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-brand-primary">{checklist.heading}</h3>
            <ul className="space-y-4">
              {checklist.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-primary rounded-full flex-shrink-0"></div>
                  <span className="text-body">{item.text}</span>
                </li>
              ))}
            </ul>

            <Button className="mt-8" asChild>
              <Link href={cta.link || '/contact'}>{cta.text}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
