'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/SectionHeader'
import Link from 'next/link'
import { Testimonial } from '@/payload-types'

type TestimonialsBlockProps = {
  heading?: string
  subheading?: string
  background?: 'light' | 'neutral' | 'primary-light' | 'muted'
  primaryCta?: {
    text?: string
    link?: string
  }
  secondaryCta?: {
    text?: string
    link?: string
  }
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  heading = 'See Proven Results',
  subheading = 'Our clients achieve measurable improvements in efficiency, clarity, and growth.',
  background = 'muted',
  primaryCta = {
    text: 'View Case Studies',
    link: '/case-studies',
  },
  secondaryCta = {
    text: 'Read All Testimonials',
    link: '/testimonials',
  },
}) => {
  const bgClass = {
    light: 'bg-brand-neutral/25',
    neutral: 'bg-brand-neutral/25',
    'primary-light': 'bg-brand-primary-light/10',
    muted: 'bg-white',
  }[background]

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          '/api/testimonials?limit=5&where[featured][equals]=true&depth=1&sort=priority',
        )
        if (!res.ok) {
          throw new Error(`Failed: ${res.status} ${res.statusText}`)
        }
        const json = await res.json()
        setTestimonials(json.docs || [])
      } catch (err) {
        console.error('Error fetching testimonials:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (loading) {
    return <p className="mx-auto text-center">Loading testimonials...</p>
  }
  if (error) {
    return <p className="mx-auto text-center">Error loading testimonials: {error}</p>
  }
  if (testimonials.length === 0) {
    return <p className="mx-auto text-center">No testimonials available.</p>
  }

  return (
    <section className={cn('py-20', bgClass)}>
      <SectionHeader heading={heading} subheading={subheading} />

      <div className="container my-16">
        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-y-8 gap-x-16 mb-12 items-stretch">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow bg-brand-neutral/25 flex flex-col h-full">
                  <CardContent className="flex flex-col h-full p-0">
                    <p className="leading-relaxed italic flex-grow mb-4">
                      &quot;{testimonial.testimonial}&quot;
                    </p>
                    <div className="border-t pt-4 mt-auto">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm">
                        {testimonial.title}
                        {testimonial.title && testimonial.organization ? ', ' : ''}
                        {testimonial.organization}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4">
          {primaryCta?.text && primaryCta?.link && (
            <Button variant="default" size="lg" asChild>
              <Link href={primaryCta.link}>{primaryCta.text}</Link>
            </Button>
          )}
          {secondaryCta?.text && secondaryCta?.link && (
            <div>
              <Button variant="outline" asChild>
                <Link href={secondaryCta.link}>{secondaryCta.text}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsBlock
