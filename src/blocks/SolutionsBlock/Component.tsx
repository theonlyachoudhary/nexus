'use client'
// Helper to convert hex color to rgba with 0.1 alpha
function hexToRgba(hex: string, alpha = 0.1) {
  let c = hex.replace('#', '')
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]
  }
  const num = parseInt(c, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r},${g},${b},${alpha})`
}
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import { SolutionsBlock as SolutionsBlockConfig } from './config'
import { cn } from '@/utilities/ui'
import * as LucideIcons from 'lucide-react'
import { ChevronRight, ChevronUp } from 'lucide-react'
import { Product } from '@/payload-types'

type ProductsBlockProps = {
  flagshipProducts: Product[]
}

export const SolutionsBlock = () => {
  const [flagshipProducts, setFlagshipProducts] = useState<ProductsBlockProps['flagshipProducts']>(
    [],
  )
  useEffect(() => {
    const fetchFlagshipProducts = async () => {
      const response = await fetch('/api/products?flagship=true&limit=3')
      const data = await response.json()
      setFlagshipProducts(data.docs)
    }
    fetchFlagshipProducts()
  }, [])

  // Manage toggle state for each card
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const handleToggle = (idx: number) => {
    setOpenIndexes((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
  }

  // Get default heading/subheading from config

  const defaultHeading = 'Our Engagement Pathways'
  const defaultSubheading =
    'Organizations grow in different ways. Our ARC, GRID, and NOVA tiers provide clear pathways for quick fixes, scalable systems, or full transformation.'

  return (
    <section className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <SectionHeader heading={defaultHeading} subheading={defaultSubheading} />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {flagshipProducts.map((solution, i) => {
            const solutionKey = i
            const showDetails = openIndexes.includes(i)
            return (
              <motion.div
                key={solutionKey}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
              >
                <Card
                  className={cn(
                    'h-full flex flex-col overflow-hidden',
                    'hover:shadow-md transition-shadow duration-200',
                  )}
                >
                  <div
                    className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 px-6 py-3"
                    style={solution.cardColor ? { background: solution.cardColor } : {}}
                  >
                    <div
                      className="w-full sm:w-auto"
                      style={{ width: undefined, minWidth: undefined, maxWidth: undefined }}
                    >
                      <div
                        className="hidden sm:block"
                        style={{ width: 220, minWidth: 180, maxWidth: 260 }}
                      >
                        <h3 className="text-xl font-bold font-condensed text-white">
                          {solution.productAcronym}
                        </h3>
                        {solution.name && (
                          <p className="text-white text-sm font-medium mt-1">{solution.name}</p>
                        )}
                      </div>
                      <span className="block sm:hidden">
                        <span className="flex flex-row items-center gap-2 w-full">
                          <span className="text-xl font-bold font-condensed text-white">
                            {solution.productAcronym}
                          </span>
                          {solution.name && (
                            <span className="text-white text-sm font-medium">{solution.name}</span>
                          )}
                          <button
                            className="ml-auto text-white flex items-center"
                            onClick={() => handleToggle(i)}
                            type="button"
                            aria-label={showDetails ? 'Hide details' : 'Show details'}
                          >
                            {showDetails ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                        </span>
                        {showDetails && solution.oneSentenceDescription && (
                          <p className="text-white/80 mt-1">{solution.oneSentenceDescription}</p>
                        )}
                      </span>
                    </div>
                    {/* Divider only on desktop */}
                    <div className="hidden sm:block my-auto w-1 h-12 bg-white mx-2 self-stretch rounded" />
                    {/* On desktop, show subtitle and description in right column. On mobile, only show subtitle here. */}
                    <div className="flex-1 my-auto hidden sm:block">
                      {solution.oneSentenceDescription && (
                        <p className="text-white/80">{solution.oneSentenceDescription}</p>
                      )}
                    </div>
                  </div>

                  {/* CardContent and CardFooter: always visible on desktop, toggle on mobile */}
                  {/* Desktop: always visible */}
                  <div className="hidden sm:block">
                    <CardContent className="px-0 py-0">
                      {solution.keyFeatures && solution.keyFeatures.length > 0 ? (
                        solution.keyFeatures.map((f, idx) => {
                          const featureKey = `${solutionKey}-${idx}-${f.feature}`
                          return (
                            <div
                              key={featureKey}
                              className={cn(
                                'flex flex-row items-center gap-4 px-5 py-2',
                                idx % 2 === 0 ? 'bg-white' : '',
                              )}
                              style={
                                idx % 2 === 1 && solution.cardColor
                                  ? { background: hexToRgba(solution.cardColor, 0.1) }
                                  : {}
                              }
                            >
                              <LucideIcons.Check
                                className="w-8 h-8"
                                style={{ color: solution.cardColor }}
                              />
                              <p className="text-sm text-brand-text-secondary m-0">{f.feature}</p>
                            </div>
                          )
                        })
                      ) : (
                        <div className="flex flex-row items-center gap-4 px-5 py-1 bg-white">
                          <LucideIcons.Check
                            className="w-8 h-8"
                            style={{ color: solution.cardColor }}
                          />
                          <p className="text-sm text-brand-text-secondary m-0">
                            {solution.keyFeatures?.[0]?.feature}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </div>
                  {/* Mobile: AnimatePresence for expand/collapse */}
                  <AnimatePresence initial={false}>
                    {showDetails && (
                      <>
                        <motion.div
                          key="card-content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className={cn('px-0 py-0', 'sm:hidden', showDetails ? 'block' : 'hidden')}
                        >
                          <CardContent className="px-0 py-0">
                            {solution.keyFeatures && solution.keyFeatures.length > 0 ? (
                              solution.keyFeatures.map((f, idx) => {
                                const featureKey = `${solutionKey}-${idx}-${f.feature}`
                                return (
                                  <div
                                    key={featureKey}
                                    className={cn(
                                      'flex flex-row items-center gap-4 px-5 py-2',
                                      idx % 2 === 0 ? 'bg-white' : '',
                                    )}
                                    style={
                                      idx % 2 === 1 && solution.cardColor
                                        ? { background: hexToRgba(solution.cardColor, 0.1) }
                                        : {}
                                    }
                                  >
                                    <LucideIcons.Check
                                      className="w-8 h-8"
                                      style={{ color: solution.cardColor }}
                                    />
                                    <p className="text-sm text-brand-text-secondary m-0">
                                      {f.feature}
                                    </p>
                                  </div>
                                )
                              })
                            ) : (
                              <div className="flex flex-row items-center gap-4 px-5 py-1 bg-white">
                                <LucideIcons.Check
                                  className="w-8 h-8"
                                  style={{ color: solution.cardColor }}
                                />
                                <p className="text-sm text-brand-text-secondary m-0">
                                  {solution.oneSentenceDescription}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </motion.div>
                        <motion.div
                          key="card-footer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className={cn('py-1', 'sm:hidden', showDetails ? 'block' : 'hidden')}
                        ></motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Button asChild variant="default" size="lg">
            <Link href="/products">View More</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionsBlock
