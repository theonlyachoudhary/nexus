import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'

// Since the payload-types will be generated after our block is added,
// we'll define the interface manually for now
interface ValueItem {
  text: string
}

interface AboutTeaserBlockProps {
  heading?: string
  subheading?: string
  mission?: {
    heading?: string
    text?: string
  }
  vision?: {
    heading?: string
    text?: string
  }
  coreValues?: {
    heading?: string
    values: ValueItem[]
  }
  cta?: {
    text?: string
    link?: string
  }
}

export const AboutTeaserBlock: React.FC<AboutTeaserBlockProps> = (props) => {
  const {
    heading = 'Learn About Who We Are',
    subheading,
    mission = {
      heading: 'Our Mission',
      text: 'Help good businesses become great by equipping them with tools and thinking that deliver real value to customers, teams, and communities.',
    },
    vision = {
      heading: 'Our Vision',
      text: 'Elevate leaders to build a smarter tomorrow by redefining how work is done and how value is created.',
    },
    coreValues = {
      heading: 'Core Values',
      values: [
        { text: 'Clarity over Complexity' },
        { text: 'Discipline in Execution' },
        { text: 'Purpose in Decision' },
        { text: 'Partnership with Integrity' },
        { text: 'Commitment to Improvement' },
      ],
    },
    cta = { text: 'Learn More About Our Team', link: '/about' },
  } = props

  return (
    <section className="py-20 my-0 bg-brand-neutral/20">
      <SectionHeader
        heading={heading}
        subheading={subheading}
        containerClassName="max-w-7xl sm:px-6 lg:px-8"
        headingClassName="text-4xl md:text-5xl font-semibold"
        subheadingClassName="text-xl subtitle text-brand-text-secondary"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed the header section since it's now in SectionHeader */}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card className="p-8 bg-brand-neutral/25">
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-primary">
                  {mission.heading}
                </h3>
                <p className="leading-relaxed">{mission.text}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-primary">{vision.heading}</h3>
                <p className="leading-relaxed">{vision.text}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-brand-primary">{coreValues.heading}</h3>
            <ul className="space-y-4">
              {coreValues.values.map((value, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-primary rounded-full flex-shrink-0"></div>
                  <span className="text-body">{value.text}</span>
                </li>
              ))}
            </ul>

            <Button className="mt-8" asChild>
              <Link href={cta.link || '/about'}>{cta.text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
