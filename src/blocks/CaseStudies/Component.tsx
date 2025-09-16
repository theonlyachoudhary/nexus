import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Types

type CaseStudy = {
  title: string
  client: string
  industry?: string
  challenge: string
  solution: string
  results?: Array<{ result?: string }>
  metrics?: Array<{ label?: string; value?: string }>
  image?: unknown
  tags?: Array<{ tag?: string }>
}

export type CaseStudiesBlockProps = {
  heading?: string
  subheading?: string
  caseStudies?: CaseStudy[]
  ctaButton?: {
    text: string
    link: string
  }
}

const backgroundClasses: Record<string, string> = {
  light: 'bg-white',
  neutral: 'bg-brand-neutral/25',
  'primary-light': 'bg-brand-ibm-blue/10',
  muted: 'bg-muted/50',
}

export const CaseStudiesBlock: React.FC<CaseStudiesBlockProps> = (props) => {
  const {
    heading = 'Success Stories',
    subheading = "See how we've helped businesses transform their operations and achieve measurable results.",
    caseStudies = [
      {
        title: 'Manufacturing Efficiency Transformation',
        client: 'Midwest Manufacturing Co.',
        industry: 'Manufacturing',
        challenge: 'Struggling with 40% production delays and unclear processes',
        solution: 'Implemented streamlined workflows and automated tracking systems',
        metrics: [
          { label: 'Production Delays', value: '65% Reduction' },
          { label: 'Cost Savings', value: '30% Decrease' },
          { label: 'Implementation', value: '90 Days' },
        ],
      },
      {
        title: 'Construction Company Scale-Up',
        client: 'Premier Construction Group',
        industry: 'Construction',
        challenge: 'Revenue plateau and operational bottlenecks limiting growth',
        solution: 'Scaled operations with improved project management and team efficiency',
        metrics: [
          { label: 'Revenue Growth', value: '140% Increase' },
          { label: 'Project Capacity', value: '3x More Projects' },
          { label: 'Team Efficiency', value: '50% Improvement' },
        ],
      },
      {
        title: 'Digital Education Platform',
        client: 'EduTech Solutions',
        industry: 'Education',
        challenge: 'Low student engagement and poor attendance rates',
        solution: 'Developed interactive learning modules and engagement tracking',
        metrics: [
          { label: 'Student Attendance', value: '150% Growth' },
          { label: 'Engagement Rate', value: '85% Increase' },
          { label: 'Course Completion', value: '95% Success' },
        ],
      },
    ],
    ctaButton = { text: 'View All Case Studies', link: '/case-studies' },
  } = props

  // You can change the background here if you want to use a prop
  const background = 'light'

  return (
    <section className={`py-16 lg:py-24 ${backgroundClasses[background]}`}>
      <SectionHeader heading={heading} subheading={subheading} maxWidth="4xl" spacing="lg" />
      <div className="container my-16">
        <div className="max-w-7xl mx-auto">
          {caseStudies && caseStudies.length > 0 ? (
            <div className="space-y-12">
              <div className="flex justify-center">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-16 justify-center">
                  {caseStudies.map((caseStudy, index) => (
                    <Card
                      key={index}
                      className="text-center bg-brand-neutral/20 flex flex-col justify-between h-full"
                    >
                      <div>
                        <CardHeader>
                          <CardTitle className="text-brand-primary">{caseStudy.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-center mb-6">
                            This is a brief description of the case study.
                          </p>
                          <div className="flex justify-center items-center">
                            <div className="grid grid-cols-3 gap-y-8 gap-x-16 w-full max-w-md">
                              {caseStudy.metrics?.slice(0, 3).map((metric, metricIndex) => (
                                <div key={metricIndex} className="text-center">
                                  <h3 className="text-brand-primary font-bold text-lg">
                                    {metric.value}
                                  </h3>
                                  <p className="text-sm">{metric.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                      <div className="flex justify-center pb-6">
                        <Button size="sm">Read Full Case Study</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No case studies available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
