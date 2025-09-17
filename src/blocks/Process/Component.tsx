'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
// Predeclare hooks for up to 10 steps (safe for most use cases)
function useStepAnimations(stepCount: number) {
  const ref0 = useRef<HTMLDivElement>(null)
  const inView0 = useInView(ref0, { once: true, margin: '-20% 0px' })
  const control0 = useAnimation()
  const ref1 = useRef<HTMLDivElement>(null)
  const inView1 = useInView(ref1, { once: true, margin: '-20% 0px' })
  const control1 = useAnimation()
  const ref2 = useRef<HTMLDivElement>(null)
  const inView2 = useInView(ref2, { once: true, margin: '-20% 0px' })
  const control2 = useAnimation()
  const ref3 = useRef<HTMLDivElement>(null)
  const inView3 = useInView(ref3, { once: true, margin: '-20% 0px' })
  const control3 = useAnimation()
  const ref4 = useRef<HTMLDivElement>(null)
  const inView4 = useInView(ref4, { once: true, margin: '-20% 0px' })
  const control4 = useAnimation()
  const ref5 = useRef<HTMLDivElement>(null)
  const inView5 = useInView(ref5, { once: true, margin: '-20% 0px' })
  const control5 = useAnimation()
  const ref6 = useRef<HTMLDivElement>(null)
  const inView6 = useInView(ref6, { once: true, margin: '-20% 0px' })
  const control6 = useAnimation()
  const ref7 = useRef<HTMLDivElement>(null)
  const inView7 = useInView(ref7, { once: true, margin: '-20% 0px' })
  const control7 = useAnimation()
  const ref8 = useRef<HTMLDivElement>(null)
  const inView8 = useInView(ref8, { once: true, margin: '-20% 0px' })
  const control8 = useAnimation()
  const ref9 = useRef<HTMLDivElement>(null)
  const inView9 = useInView(ref9, { once: true, margin: '-20% 0px' })
  const control9 = useAnimation()
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9].slice(0, stepCount)
  const inViews = [
    inView0,
    inView1,
    inView2,
    inView3,
    inView4,
    inView5,
    inView6,
    inView7,
    inView8,
    inView9,
  ].slice(0, stepCount)
  const controls = [
    control0,
    control1,
    control2,
    control3,
    control4,
    control5,
    control6,
    control7,
    control8,
    control9,
  ].slice(0, stepCount)
  return { refs, inViews, controls }
}

export interface ProcessBlockProps {
  heading: string
  intro: string
  steps: Array<{
    title: string
    description: string
    position: string
  }>
  ctaText: string
  ctaButton: string
  ctaLink: string
}

export function ProcessBlock({
  heading,
  intro,
  steps,
  ctaText,
  ctaButton,
  ctaLink,
}: ProcessBlockProps) {
  // --- React hook compliant animation setup ---
  const stepCount = steps.length
  const { refs, inViews, controls } = useStepAnimations(stepCount)

  useEffect(() => {
    inViews.forEach((inView, idx) => {
      if (inView) controls[idx].start('visible')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViews.map(Boolean).join(',')])

  return (
    <section className="py-20 bg-muted/20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{heading}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{intro}</p>
        </div>

        {/* Mobile vertical process animation */}
        <div className="md:hidden flex flex-col items-center relative">
          {steps.map((step, idx) => (
            <div key={idx} className="w-full flex items-start relative">
              {/* Node and line */}
              <div className="flex flex-col items-center mr-4 relative z-10">
                <motion.div
                  ref={refs[idx]}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={controls[idx]}
                  variants={{
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { type: 'spring', stiffness: 300, damping: 20 },
                    },
                  }}
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  {idx + 1}
                </motion.div>
                {/* Line below node except last */}
                {idx < steps.length - 1 && (
                  <div
                    style={{ minHeight: 96, borderRadius: 9999 }}
                    className="w-1 bg-primary flex flex-col justify-start"
                  >
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={controls[idx]}
                      variants={{
                        visible: {
                          height: 96,
                          opacity: 1,
                          transition: { delay: 0.2, duration: 0.4 },
                        },
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>
                )}
              </div>
              {/* Card appears to the right of node */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={controls[idx]}
                variants={{
                  visible: { x: 0, opacity: 1, transition: { delay: 0.1, duration: 0.5 } },
                }}
                className="flex-1"
              >
                <div className="ml-2 mb-8">
                  <div className="bg-background rounded-lg p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2`">{step.title}</h3>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Desktop grid with framer-motion animation */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-background rounded-lg p-8 shadow-sm border"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg mb-6">{ctaText}</p>
          <Button asChild size="lg" className="">
            <Link href={ctaLink}>{ctaButton}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
