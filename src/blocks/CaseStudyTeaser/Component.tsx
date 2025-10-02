'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CaseStudy = {
  title: string
  name: string // Organization name
  metrics?: { metric: string; value: string }[]
  slug?: string
}

export const CaseStudyTeaserBlock: React.FC = () => {
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
      <div className="flex flex-wrap justify-center gap-8">
        {caseStudies.map((cs, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="w-full max-w-xs"
          >
            <Card className="p-6 rounded-xl border border-gray-100 bg-brand-neutral/25 flex flex-col h-[220px] justify-between shadow-sm">
              <CardContent className="flex flex-col h-full p-0">
                <div>
                  <h3 className="font-bold text-lg mb-1">{cs.title}</h3>
                  <p className="text-sm text-brand-primary font-medium mb-2">{cs.name}</p>
                  {cs.metrics && cs.metrics.length > 0 && (
                    <ul className="text-xs mb-2 list-disc list-inside">
                      {cs.metrics.map((m, i) => (
                        <li key={i}>
                          <span className="font-semibold">{m.metric}:</span> {m.value}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-auto pt-2">
                  <Button variant="default" size="sm" asChild>
                    <Link href="/case-studies">View Case Studies</Link>
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
