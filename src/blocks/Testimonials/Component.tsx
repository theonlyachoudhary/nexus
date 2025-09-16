import React from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/SectionHeader'
import Link from 'next/link'

type Testimonial = {
  quote: string
  author: string
  role?: string
  company?: string
}

export type TestimonialsBlockProps = {
  heading?: string
  subheading?: string
  testimonials?: Testimonial[]
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
  testimonials = [],
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
    muted: 'bg-brand-neutral/20',
  }[background]

  return (
    <section className={cn('py-20', bgClass)}>
      <SectionHeader heading={heading} subheading={subheading} />

      <div className="container my-16">
        {/* Removed the header section since it's now in SectionHeader */}

        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-y-8 gap-x-16 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow bg-brand-neutral/25 flex flex-col"
              >
                <CardContent className="flex flex-col h-full p-0">
                  <p className="leading-relaxed italic flex-grow mb-4">"{testimonial.quote}"</p>
                  <div className="border-t pt-4 mt-auto">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm">
                      {testimonial.role}
                      {testimonial.role && testimonial.company ? ', ' : ''}
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
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
