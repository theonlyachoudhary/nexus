'use client'
import React from 'react'
import { motion } from 'framer-motion'
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <SectionHeader heading={heading} subheading={subheading} />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {solutions.map((solution, i) => {
            // Get the icon component or default to Settings
            const iconName = solution.icon
              ? solution.icon.charAt(0).toUpperCase() + solution.icon.slice(1).toLowerCase()
              : 'Settings'

            const IconComponent = (LucideIcons[iconName as keyof typeof LucideIcons] ||
              LucideIcons.Settings) as React.ComponentType<LucideProps>

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
                }}
              >
                <Card
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
                    {solution.subtitle && (
                      <p className="text-sm font-medium">{solution.subtitle}</p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-brand-text-secondary">{solution.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="link"
                      className="p-0 font-medium hover:text-brand-primary-light"
                    >
                      Learn more &rarr;
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {cta?.text && cta?.link && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Button asChild variant="default" size="lg">
              <Link href={cta.link}>{cta.text}</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default SolutionsBlock
