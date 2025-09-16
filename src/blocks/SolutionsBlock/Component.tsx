import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

type SolutionItem = {
  title: string
  subtitle?: string
  description: string
  icon?: string
}

export type SolutionsBlockProps = {
  heading?: string
  subheading?: string
  solutions?: SolutionItem[]
  cta?: {
    text?: string
    link?: string
  }
}

export const SolutionsBlock: React.FC<SolutionsBlockProps> = ({
  heading = 'Explore Our Solutions',
  subheading = 'Holistic improvement of people, processes, and product alignment — with emphasis on workflow development and business process automation.',
  solutions = [],
  cta,
}) => {
  return (
    <section className="py-16 md:py-24">
      <SectionHeader heading={heading} subheading={subheading} />

      <div className="container mx-auto px-4">
        {/* Removed the header section since it's now in SectionHeader */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, i) => {
            // Get the icon component or default to Settings
            const iconName = solution.icon
              ? // Capitalize first letter for proper icon name format
                solution.icon.charAt(0).toUpperCase() + solution.icon.slice(1).toLowerCase()
              : 'Settings'

            const IconComponent = (LucideIcons[iconName as keyof typeof LucideIcons] ||
              LucideIcons.Settings) as React.ComponentType<LucideProps>

            return (
              <Card
                key={i}
                className={cn(
                  'h-full flex flex-col overflow-hidden',
                  'hover:shadow-md transition-shadow duration-200 bg-brand-neutral/25',
                )}
              >
                <CardHeader className="pb-0">
                  <div className="text-brand-primary mb-2">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold font-condensed text-brand-primary">
                    {solution.title}
                  </h3>
                  {solution.subtitle && <p className="text-sm font-medium">{solution.subtitle}</p>}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-brand-text-secondary">{solution.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 font-medium hover:text-brand-primary-light">
                    Learn more &rarr;
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {cta?.text && cta?.link && (
          <div className="mt-12 text-center">
            <Button asChild variant="default" size="lg">
              <Link href={cta.link}>{cta.text}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default SolutionsBlock
