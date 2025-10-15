'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/SectionHeader'
import Link from 'next/link'
import { Testimonial } from '@/payload-types'
import { FaQuoteLeft } from 'react-icons/fa'
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

const TestimonialCard: React.FC<{
  testimonial: Testimonial
  minHeight?: number
}> = ({ testimonial, minHeight }) => {
  return (
    <Card
      className="p-6 hover:shadow-xl transition-shadow bg-brand-neutral/25 rounded-xl border border-gray-100 flex flex-col w-full"
      style={{ minHeight: minHeight ? `${minHeight}px` : 'auto' }}
    >
      <CardContent className="flex flex-col h-full p-0">
        <div className="relative mb-4 flex-grow">
          <FaQuoteLeft
            className="text-4xl text-brand-primary absolute -top-4 -left-2 opacity-30"
            aria-hidden="true"
          />
          <p className="leading-relaxed italic pl-8">{testimonial?.testimonial || ''}</p>
        </div>
        <div className="border-t pt-4 mt-auto">
          <p className="font-semibold text-brand-primary">{testimonial?.name || ''}</p>
          <p className="text-sm font-medium">
            {testimonial?.title || ''}
            {testimonial?.title && testimonial?.organization ? ', ' : ''}
            {testimonial?.organization || ''}
          </p>
        </div>
      </CardContent>
    </Card>
  )
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
  const bgClass = neutralBackground ? 'bg-brand-neutral/20' : 'bg-white'

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [isMeasured, setIsMeasured] = useState(false)
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())

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

  const measureCardHeights = () => {
    const heights: number[] = []
    cardRefs.current.forEach((element) => {
      if (element) {
        heights.push(element.offsetHeight)
      }
    })
    if (heights.length > 0) {
      const tallest = Math.max(...heights)
      setMaxHeight(tallest)
      setIsMeasured(true)
    }
  }

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setTimeout(() => {
        measureCardHeights()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [testimonials])

  useEffect(() => {
    const handleResize = () => {
      measureCardHeights()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [testimonials])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!isMeasured) return
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide, testimonials.length, isMeasured])

  const getVisibleTestimonials = (): Array<{ testimonial: Testimonial; position: number }> => {
    const visible: Array<{ testimonial: Testimonial; position: number }> = []
    if (testimonials.length === 0) return visible

    if (testimonials.length < 3) {
      return testimonials.map((t, idx) => ({ testimonial: t, position: idx - 1 }))
    }

    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + testimonials.length) % testimonials.length
      visible.push({ testimonial: testimonials[index], position: i })
    }
    return visible
  }

  if (loading) {
    return <p className="mx-auto text-center">Loading testimonials...</p>
  }
  if (error) {
    return <p className="mx-auto text-center">Error loading testimonials: {error}</p>
  }
  if (testimonials.length === 0) {
    return <p className="mx-auto text-center">No testimonials available.</p>
  }

  const visibleTestimonials = getVisibleTestimonials()

  return (
    <section className={cn('py-24', bgClass)}>
      <SectionHeader heading={heading} subheading={subheading} />

      <div className="container my-5">
        {/* Hidden measurement cards - render all testimonials invisibly to measure heights */}
        <div
          className="max-w-xl lg:max-w-md mx-auto"
          style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={`measure-${idx}`}
              ref={(el) => {
                if (el) {
                  cardRefs.current.set(idx, el)
                } else {
                  cardRefs.current.delete(idx)
                }
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Single card carousel with fade */}
        <div
          className="max-w-xl mx-auto block lg:hidden"
          style={{ minHeight: maxHeight ? `${maxHeight}px` : 'auto' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <TestimonialCard
                testimonial={testimonials[currentSlide]}
                minHeight={maxHeight}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: 3-card layout with center focus and fade transitions */}
        <div
          className="hidden lg:flex items-center justify-center w-full max-w-7xl gap-8 mx-auto overflow-hidden"
          style={{ minHeight: maxHeight ? `${maxHeight}px` : 'auto' }}
        >
          <AnimatePresence mode="sync">
            {visibleTestimonials.map(({ testimonial, position }) => (
              <motion.div
                key={`${currentSlide}-${position}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  scale: position === 0 ? 1.05 : 0.95,
                  opacity: position === 0 ? 1 : 0.5,
                  zIndex: position === 0 ? 2 : 1,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="flex-1 flex justify-center items-center max-w-md"
              >
                <TestimonialCard testimonial={testimonial} minHeight={maxHeight} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom navigation buttons and breadcrumbs */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={handlePrev}
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
                  'w-3 h-3 rounded-full transition-colors',
                  idx === currentSlide ? 'bg-brand-primary' : 'bg-gray-300 hover:bg-brand-primary',
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => goToSlide(idx)}
                type="button"
              />
            ))}
          </div>
          <button
            onClick={handleNext}
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
