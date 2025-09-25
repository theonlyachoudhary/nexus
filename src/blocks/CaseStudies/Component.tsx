'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion' // <-- Add this import

// Type definitions
interface CaseStudy {
  id?: number
  slug?: string
  title?: string
  client?: string
  industry?: string
  challenge?: string
  approach?: Array<{ step?: string }>
  solution?: string
  results?: Array<{ result?: string }>
  deliverables?: Array<{ item?: string }>
  notes?: Array<{ note?: string }>
  testimonial?: {
    quote?: string
    author?: string
    title?: string
  }
  metrics?: Record<string, string> | Array<{ label: string; value: string }>
}

interface CaseStudiesBlockProps {
  heading?: string
  subheading?: string
  highlights?: Array<{ value: string; description: string; color: string }>
  caseStudies?: CaseStudy[]
  ctaButton?: { text: string; link: string }
}

export const CaseStudiesBlock: React.FC<CaseStudiesBlockProps> = ({
  caseStudies = [],
  ctaButton,
  highlights,
}) => {
  return (
    <section className={`py-10 bg-muted/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {highlights && highlights.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
              {highlights.map((highlight, idx) => (
                <div className="text-center" key={idx}>
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      highlight.color === 'accent' ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    {highlight.value}
                  </div>
                  <p className="">{highlight.description}</p>
                </div>
              ))}
            </div>
          )}
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id || index}
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className="bg-primary text-primary-foreground p-8 rounded-lg lg:rounded-r-none">
                    <Badge variant="secondary" className="mb-4">
                      {study.industry}
                    </Badge>
                    <h2 className="text-2xl font-bold mb-1">{study.title}</h2>
                    {study.client && (
                      <div className="text-base text-primary-foreground/80 mb-4">
                        {study.client}
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          {study.metrics &&
                            (Array.isArray(study.metrics)
                              ? study.metrics.map((metric, idx) => (
                                  <div key={idx} className="flex justify-between">
                                    <span className="opacity-90 capitalize">{metric.label}:</span>
                                    <span className="font-semibold">{metric.value}</span>
                                  </div>
                                ))
                              : Object.entries(study.metrics).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="opacity-90 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1')}:
                                    </span>
                                    <span className="font-semibold">{String(value)}</span>
                                  </div>
                                )))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-8">
                    <div className="space-y-6">
                      {study.challenge && (
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">Challenge</h3>
                          <p className="leading-relaxed">{study.challenge}</p>
                        </div>
                      )}

                      {study.approach &&
                        Array.isArray(study.approach) &&
                        study.approach.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                              Our Approach
                            </h3>
                            <ul className="space-y-2">
                              {study.approach.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                                  <p className="">{item.step || String(item)}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {study.deliverables &&
                        Array.isArray(study.deliverables) &&
                        study.deliverables.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                              Deliverables
                            </h3>
                            <ul className="space-y-2">
                              {study.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0"></div>
                                  <p className="">{item.item || String(item)}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {study.solution && (
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">Solution</h3>
                          <p className="leading-relaxed">{study.solution}</p>
                        </div>
                      )}

                      {study.results &&
                        Array.isArray(study.results) &&
                        study.results.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Results</h3>
                            <ul className="space-y-2">
                              {study.results.map((result, resultIndex) => (
                                <li key={resultIndex} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                                  <p className="">{result.result || String(result)}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {study.notes && Array.isArray(study.notes) && study.notes.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">Notes</h3>
                          <ul className="space-y-2">
                            {study.notes.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-muted rounded-full mt-3 flex-shrink-0"></div>
                                <p className="">{note.note || String(note)}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {study.testimonial && study.testimonial.quote && (
                        <div className="bg-muted/50 rounded-lg p-6 mt-6">
                          <h4 className="font-semibold text-foreground mb-3">Client Testimonial</h4>
                          <blockquote className="text-muted-foreground italic leading-relaxed mb-4">
                            &quot;{study.testimonial.quote}&quot;
                          </blockquote>
                          <div className="text-sm">
                            {study.testimonial.author && (
                              <p className="font-semibold text-foreground">
                                {study.testimonial.author}
                              </p>
                            )}
                            {study.testimonial.title && (
                              <p className="">{study.testimonial.title}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {ctaButton?.text && ctaButton?.link && (
            <div className="text-center pt-8">
              <Button size="lg" variant="outline" asChild>
                <Link href={ctaButton.link} className="flex items-center gap-2">
                  {ctaButton.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
