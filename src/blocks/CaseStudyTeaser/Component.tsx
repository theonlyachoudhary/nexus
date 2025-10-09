'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/SectionHeader' // <-- Import SectionHeader
import { title } from 'process'

type CaseStudy = {
  title: string
  name: string // Organization name
  summary?: string
  metrics?: { metric: string; value: string }[]
  slug?: string
}

export interface CaseStudyTeaserBlockProps {
  title?: string
  description?: string
}

export const CaseStudyTeaserBlock: React.FC<CaseStudyTeaserBlockProps> = ({
  title,
  description,
}) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [maxHeight, setMaxHeight] = useState<number>(0)

  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // After cards render, measure the largest height
    if (cardRefs.current.length && caseStudies.length) {
      let max = 0
      cardRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          if (rect.height > max) max = rect.height
        }
      })
      if (max) setMaxHeight(max)
    }
  }, [caseStudies, loading])

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(
          '/api/case-studies?depth=2&draft=false&locale=undefined&trash=false',
        )
        if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`)
        const json = await res.json()
        const docs = Array.isArray(json.docs) ? json.docs : [json]
        setCaseStudies(docs.slice(0, 3))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchCaseStudies()
  }, [])

  if (loading) return <p className="text-center">Loading case studies...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>
  if (!caseStudies.length) return <p className="text-center">No case studies found.</p>

  return (
    <section className="py-12">
      <SectionHeader
        heading={title ?? ''}
        subheading={description ?? ''}
        align="center"
        spacing="md"
      />
      <div className="flex flex-wrap justify-center items-center gap-8 min-h-[20rem]">
        {caseStudies.map((cs, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex justify-center"
          >
            <div
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              style={maxHeight ? { height: maxHeight } : undefined}
            >
              <Card className="p-6 rounded-xl border border-gray-100 bg-brand-neutral/25 flex flex-col max-w-[30rem] justify-between shadow-sm mx-auto w-full h-full">
                <CardContent className="flex flex-col h-full p-0">
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-1 text-center">{cs.title}</h3>
                    <p className="font-medium mb-2 text-center">{cs.name}</p>
                    {cs.summary && (
                      <p className="text-center text-brand-text-secondary mb-3">{cs.summary}</p>
                    )}
                  </div>
                  <div className="mt-auto w-full">
                    {cs.metrics && cs.metrics.length > 0 && (
                      <div className="mb-5 flex justify-center w-full">
                        <div
                          className={`
              grid w-full py-3
              ${cs.metrics.length === 1 ? 'grid-cols-1' : ''}
              ${cs.metrics.length === 2 ? 'grid-cols-2' : ''}
              ${cs.metrics.length >= 3 ? 'grid-cols-3' : ''}
              gap-6
              max-w-3xl
            `}
                        >
                          {cs.metrics.map((m, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center text-center px-2 break-words w-full"
                            >
                              <span className="text-lg font-bold text-primary leading-tight break-words">
                                {m.metric}
                              </span>
                              <p className="text-sm break-words">{m.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-2 flex justify-center">
                      <Button variant="default" size="sm" asChild>
                        <Link href="/case-studies">Read Full Case Study</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
