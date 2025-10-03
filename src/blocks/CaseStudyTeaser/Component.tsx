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

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(
          '/api/case-studies/1?depth=2&draft=false&locale=undefined&trash=false',
        )
        if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`)
        const json = await res.json()
        // If the API returns a single case study, wrap it in an array
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
            <Card className="p-6 rounded-xl border border-gray-100 bg-brand-neutral/25 flex flex-col max-w-[30rem] justify-between shadow-sm mx-auto">
              <CardContent className="flex flex-col h-full p-0">
                <div className="">
                  <h3 className="font-bold text-primary text-lg mb-1 text-center">{cs.title}</h3>
                  <p className="font-medium mb-2 text-center">{cs.name}</p>
                  {/* Summary section below organization name */}
                  {cs.summary && (
                    <p className="text-center text-brand-text-secondary mb-3">{cs.summary}</p>
                  )}
                  {cs.metrics && cs.metrics.length > 0 && (
                    <div className="mb-5 flex justify-center">
                      <div
                        className={`grid w-full`}
                        style={{
                          gridTemplateColumns: `repeat(${Math.min(cs.metrics.length, 3)}, minmax(0, 1fr))`,
                          justifyContent: cs.metrics.length < 3 ? 'center' : undefined,
                          maxWidth: '36rem',
                          gap:
                            cs.metrics.length === 1
                              ? '2rem'
                              : cs.metrics.length === 2
                                ? '3rem'
                                : '2.5rem',
                        }}
                      >
                        {cs.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center min-h-[4.5rem] text-center px-4"
                          >
                            <p className="text-lg font-bold text-primary leading-[1.2] whitespace-nowrap">
                              {m.metric}
                            </p>
                            <p className="text-sm whitespace-nowrap">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-2 flex justify-center">
                  <Button variant="default" size="sm" asChild>
                    <Link href="/case-studies">Read Full Case Study</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
