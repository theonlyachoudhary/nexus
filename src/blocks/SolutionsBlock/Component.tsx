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

// Accept an optional prop `summarized` (caller can force it); otherwise fall back to config/default
type SolutionsBlockProps = {
  summarized?: boolean
}

export const SolutionsBlock: React.FC<SolutionsBlockProps> = ({ summarized: summarizedProp }) => {
  const [flagshipProducts, setFlagshipProducts] = useState<ProductsBlockProps['flagshipProducts']>([])
  useEffect(() => {
    // determine endpoint based on summarized flag (we will compute summarized below)
    // fetch happens inside another effect so this effect is intentionally only for initial setup
  }, [])

  // Manage toggle state for each card
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const handleToggle = (idx: number) => {
    setOpenIndexes((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
  }

  // Get default heading/subheading from config
  const headingField = SolutionsBlockConfig.fields.find(
    (f) => typeof f === 'object' && 'name' in f && f.name === 'heading',
  ) as { defaultValue?: string } | undefined
  const descriptionField = SolutionsBlockConfig.fields.find(
    (f) => typeof f === 'object' && 'name' in f && f.name === 'description',
  ) as { defaultValue?: string } | undefined
  const summarizedField = SolutionsBlockConfig.fields.find(
    (f) => typeof f === 'object' && 'name' in f && f.name === 'summarized',
  ) as { defaultValue?: boolean } | undefined

  const defaultHeading = headingField?.defaultValue || 'Our Solutions'
  const defaultSubheading = descriptionField?.defaultValue || ''
  // final summarized value: prop overrides config, fallback to config default, then false
  const summarized = typeof summarizedProp === 'boolean' ? summarizedProp : !!summarizedField?.defaultValue

  // fetch products — select endpoint based on `summarized`
  useEffect(() => {
    const fetchFlagshipProducts = async () => {
      try {
        // choose endpoint depending on summarized
        // * if summarized, add summary=true to the query so backend can return a lighter payload
        // * if your backend expects a different route name, change the string below
        const endpoint = summarized
          ? '/api/products?flagship=true&limit=3&summary=true'
          : '/api/products?flagship=true&limit=3'

        const response = await fetch(endpoint)
        if (!response.ok) {
          console.warn('Products fetch failed:', response.statusText)
          setFlagshipProducts([])
          return
        }
        const data = await response.json()
        // defensive: some APIs return { docs: [...] } while others return an array
        const docs = Array.isArray(data) ? data : data?.docs ?? data?.items ?? []
        setFlagshipProducts(docs)
      } catch (err) {
        console.error('Error fetching products:', err)
        setFlagshipProducts([])
      }
    }
    fetchFlagshipProducts()
  }, [summarized]) // re-run if summarized changes

  // Sort products by ranking (lowest first)
  const sortedProducts = (Array.isArray(flagshipProducts) ? [...flagshipProducts] : []).sort(
    (a, b) => {
      const rankA = typeof a?.ranking === 'number' ? a.ranking : Number.POSITIVE_INFINITY
      const rankB = typeof b?.ranking === 'number' ? b.ranking : Number.POSITIVE_INFINITY
      return rankA - rankB
    },
  )

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
          {sortedProducts.map((solution, i) => {
            // Defensive fallback for solution properties
            const safeSolution = solution || {}
            const solutionKey = i
            const showDetails = openIndexes.includes(i)
            const keyFeatures = Array.isArray(safeSolution.keyFeatures) ? safeSolution.keyFeatures : []

            // If summarized mode, we render a condensed card (no feature list and no expand)
            if (summarized) {
              return (
                <motion.div
                  key={`summ-${solutionKey}`}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.08 }}
                >
                  <Card
                    className={cn(
                      'h-full flex flex-col overflow-hidden',
                      'hover:shadow-md transition-shadow duration-200',
                    )}
                  >
                    <div
                      className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 px-6 py-3"
                      style={safeSolution.cardColor ? { background: safeSolution.cardColor } : {}}
                    >
                      <div className="w-full sm:w-auto">
                        <h3 className="text-xl font-bold font-condensed text-white">
                          {safeSolution.productAcronym || ''}
                        </h3>
                        {safeSolution.name && (
                          <p className="text-white text-sm font-medium mt-1">{safeSolution.name}</p>
                        )}
                        {safeSolution.oneSentenceDescription && (
                          <p className="text-white/80 mt-2 text-sm">
                            {safeSolution.oneSentenceDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            }

            // Regular (non-summarized) card (original behavior)
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
                    style={safeSolution.cardColor ? { background: safeSolution.cardColor } : {}}
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
                          {safeSolution.productAcronym || ''}
                        </h3>
                        {safeSolution.name && (
                          <p className="text-white text-sm font-medium mt-1">{safeSolution.name}</p>
                        )}
                      </div>
                      <span className="block sm:hidden">
                        <span className="flex flex-row items-center gap-2 w-full">
                          <span className="text-xl font-bold font-condensed text-white">
                            {safeSolution.productAcronym || ''}
                          </span>
                          {safeSolution.name && (
                            <span className="text-white text-sm font-medium">{safeSolution.name}</span>
                          )}
                          <button
                            className="ml-auto text-white flex items-center"
                            onClick={() => handleToggle(i)}
                            type="button"
                            aria-label={showDetails ? 'Hide details' : 'Show details'}
                          >
                            {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </button>
                        </span>
                        {showDetails && safeSolution.oneSentenceDescription && (
                          <p className="text-white/80 mt-1">{safeSolution.oneSentenceDescription}</p>
                        )}
                      </span>
                    </div>
                    {/* Divider only on desktop */}
                    <div className="hidden sm:block my-auto w-1 h-12 bg-white mx-2 self-stretch rounded" />
                    {/* On desktop, show subtitle and description in right column. On mobile, only show subtitle here. */}
                    <div className="flex-1 my-auto hidden sm:block">
                      {safeSolution.oneSentenceDescription && (
                        <p className="text-white/80">{safeSolution.oneSentenceDescription}</p>
                      )}
                    </div>
                  </div>

                  {/* CardContent and CardFooter: always visible on desktop, toggle on mobile */}
                  {/* Desktop: always visible */}
                  <div className="hidden sm:block">
                    <CardContent className="px-0 py-0">
                      {keyFeatures.length > 0 ? (
                        keyFeatures.map((f, idx) => {
                          const featureKey = `${solutionKey}-${idx}-${f.feature}`
                          return (
                            <div
                              key={featureKey}
                              className={cn(
                                'flex flex-row items-center gap-4 px-5 py-2',
                                idx % 2 === 0 ? 'bg-white' : '',
                              )}
                              style={
                                idx % 2 === 1 && safeSolution.cardColor
                                  ? { background: hexToRgba(safeSolution.cardColor, 0.1) }
                                  : {}
                              }
                            >
                              <LucideIcons.Check className="w-8 h-8" style={{ color: safeSolution.cardColor }} />
                              <p className="text-sm text-brand-text-secondary m-0">{f.feature}</p>
                            </div>
                          )
                        })
                      ) : (
                        <div className="flex flex-row items-center gap-4 px-5 py-1 bg-white">
                          <LucideIcons.Check className="w-8 h-8" style={{ color: safeSolution.cardColor }} />
                          <p className="text-sm text-brand-text-secondary m-0">
                            {safeSolution.keyFeatures?.[0]?.feature ||
                              safeSolution.oneSentenceDescription ||
                              'No features listed.'}
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
                            {keyFeatures.length > 0 ? (
                              keyFeatures.map((f, idx) => {
                                const featureKey = `${solutionKey}-${idx}-${f.feature}`
                                return (
                                  <div
                                    key={featureKey}
                                    className={cn(
                                      'flex flex-row items-center gap-4 px-5 py-2',
                                      idx % 2 === 0 ? 'bg-white' : '',
                                    )}
                                    style={
                                      idx % 2 === 1 && safeSolution.cardColor
                                        ? { background: hexToRgba(safeSolution.cardColor, 0.1) }
                                        : {}
                                    }
                                  >
                                    <LucideIcons.Check
                                      className="w-8 h-8"
                                      style={{ color: safeSolution.cardColor }}
                                    />
                                    <p className="text-sm text-brand-text-secondary m-0">{f.feature}</p>
                                  </div>
                                )
                              })
                            ) : (
                              <div className="flex flex-row items-center gap-4 px-5 py-1 bg-white">
                                <LucideIcons.Check
                                  className="w-8 h-8"
                                  style={{ color: safeSolution.cardColor }}
                                />
                                <p className="text-sm text-brand-text-secondary m-0">
                                  {safeSolution.oneSentenceDescription || 'No features listed.'}
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

        {/* Only show the "View More" / solutions button when is summarized */}
        {summarized && (
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
        )}
      </div>
    </section>
  )
}

export default SolutionsBlock
