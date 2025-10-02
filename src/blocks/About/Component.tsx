import React from 'react'
// ...existing code...
import { Card, CardContent } from '@/components/ui/card'

interface AboutBlockProps {
  coreValuesHeading?: string
  missionCards?: Array<{
    heading: string
    text: string
    color?: string
  }>
  coreValues?: Array<{
    text: string
    color?: string
  }>
}

// ...existing code...

export const AboutBlock: React.FC<AboutBlockProps> = ({
  coreValuesHeading,
  missionCards,
  coreValues,
}) => {
  // ...existing code...

  // Default values if not provided by PayloadJS
  const brandPrimary = 'var(--brand-primary)'
  const defaultMissionCards = [
    {
      heading: 'Our Mission',
      text: 'Help good businesses become great by equipping them with tools and thinking that deliver real value to customers, teams, and communities.',
      color: brandPrimary,
    },
    {
      heading: 'Our Vision',
      text: 'Elevate leaders to build a smarter tomorrow by redefining how work is done and how value is created.',
      color: brandPrimary,
    },
  ]
  const defaultCoreValues = [
    { text: 'Clarity over Complexity', color: brandPrimary },
    { text: 'Discipline in Execution', color: brandPrimary },
    { text: 'Purpose in Decision', color: brandPrimary },
    { text: 'Partnership with Integrity', color: brandPrimary },
    { text: 'Commitment to Improvement', color: brandPrimary },
  ]

  const missionCardsToRender =
    Array.isArray(missionCards) && missionCards.length > 0 ? missionCards : defaultMissionCards
  const coreValuesToRender =
    Array.isArray(coreValues) && coreValues.length > 0 ? coreValues : defaultCoreValues
  const coreValuesHeadingToRender = coreValuesHeading || 'Our Core Values'

  return (
    <section className="pb-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {missionCardsToRender.map(
            (card: { heading: string; text: string; color?: string }, idx: number) => (
              <Card key={idx} className="p-8 bg-brand-neutral/25 border-gray-200">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: brandPrimary }}
                    >
                      <div className="w-6 h-6 bg-white rounded-sm"></div>
                    </div>
                    <h2 className="text-3xl font-bold" style={{ color: brandPrimary }}>
                      {card.heading}
                    </h2>
                  </div>
                  <p className="leading-relaxed">{card.text}</p>
                </CardContent>
              </Card>
            ),
          )}
        </div>

        <div className="rounded-lg p-5 pt-0">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            {coreValuesHeadingToRender}
          </h3>
          <div className="grid md:grid-cols-5 gap-6">
            {coreValuesToRender.map((value: { text: string; color?: string }, idx: number) => (
              <div key={idx} className="text-center space-y-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: value.color || brandPrimary }}
                >
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h4 className="text-black/70">{value.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
