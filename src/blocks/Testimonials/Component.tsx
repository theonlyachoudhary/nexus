'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/SectionHeader'
import Link from 'next/link'
import { Testimonial } from '@/payload-types'
import { FaQuoteLeft } from 'react-icons/fa'
import Slider from 'react-slick'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

type TestimonialsBlockProps = {
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
  neutralBackground?: boolean
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
  neutralBackground = false,
}) => {
  // Set background based on checkbox
  const bgClass = neutralBackground ? 'bg-brand-neutral/20' : 'bg-white'

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sliderRef = useRef<Slider>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials?')
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

  const sliderSettings = {
    dots: false, // We'll add custom breadcrumbs
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false, // Hide default arrows
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  }

  // Duplicate testimonials if less than 3 for the effect
  const displayTestimonials =
    testimonials.length >= 3
      ? testimonials
      : Array(3)
          .fill(null)
          .map((_, i) => testimonials[i % testimonials.length])

  // Helper to get the visible window of 3 cards
  const getVisibleTestimonials = () => {
    if (displayTestimonials.length < 3) return displayTestimonials
    const start = currentSlide
    return [
      displayTestimonials[start % displayTestimonials.length],
      displayTestimonials[(start + 1) % displayTestimonials.length],
      displayTestimonials[(start + 2) % displayTestimonials.length],
    ]
  }
  const visibleTestimonials = getVisibleTestimonials()

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
    <section className={cn('py-24', bgClass)}>
      <SectionHeader heading={heading} subheading={subheading} />

      <div className="container my-5">
        {/* Mobile/Tablet: Carousel */}
        <div className="max-w-xl mx-auto block lg:hidden">
          <Slider ref={sliderRef} {...sliderSettings}>
            {testimonials?.map((testimonial, index) => (
              <div key={index}>
                <Card className="p-6 hover:shadow-xl transition-shadow bg-brand-neutral/25 rounded-xl border border-gray-100 flex flex-col h-[300px] w-full max-w-xl overflow-hidden">
                  <CardContent className="flex flex-col h-full p-0">
                    <div className="relative mb-4 flex-grow">
                      <FaQuoteLeft
                        className="text-4xl text-brand-primary absolute -top-4 -left-2 opacity-30"
                        aria-hidden="true"
                      />
                      <p className="leading-relaxed italic pl-8">{testimonial.testimonial}</p>
                    </div>
                    <div className="border-t pt-4 mt-auto">
                      <p className="font-semibold text-brand-primary">{testimonial.name}</p>
                      <p className="text-sm font-medium">
                        {testimonial.title}
                        {testimonial.title && testimonial.organization ? ', ' : ''}
                        {testimonial.organization}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>

        {/* LG screens: Show 3 cards, center is active and slightly bigger, sides faded, all cards same height */}
        <div
          className="hidden lg:flex items-center w-[70vw] max-w-none px-0 gap-8 mx-auto overflow-x-hidden"
          style={{ minHeight: '300px', height: '350px' }}
        >
          {visibleTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                scale: idx === 1 ? 1.08 : 1,
                opacity: idx === 1 ? 1 : 0.6,
                zIndex: idx === 1 ? 2 : 1,
                x: 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'flex-1 flex justify-center items-center',
                idx === 1 ? '' : 'pointer-events-none',
              )}
              style={{ minWidth: '0' }}
            >
              <Card className="p-6 hover:shadow-xl transition-shadow bg-brand-neutral/25 rounded-xl border border-gray-100 flex flex-col w-full max-w-xl h-[280px] overflow-visible">
                <CardContent className="flex flex-col h-full p-0">
                  <div className="relative mb-4 flex-grow">
                    <FaQuoteLeft
                      className="text-4xl text-brand-primary absolute -top-4 -left-2 opacity-30"
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed italic pl-8">{testimonial.testimonial}</p>
                  </div>
                  <div className="border-t pt-4 mt-auto">
                    <p className="font-semibold text-brand-primary">{testimonial.name}</p>
                    <p className="text-sm font-medium">
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

        {/* Custom navigation buttons and breadcrumbs */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous testimonial"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary hover:bg-brand-primary/80 transition-colors"
            type="button"
          >
            <LuArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  'w-3 h-3 rounded-full',
                  idx === currentSlide ? 'bg-brand-primary' : 'bg-gray-300 hover:bg-brand-primary',
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => sliderRef.current?.slickGoTo(idx)}
                type="button"
              />
            ))}
          </div>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Next testimonial"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary hover:bg-brand-primary/80 transition-colors"
            type="button"
          >
            <LuArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="pb-3" />
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
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsBlock
