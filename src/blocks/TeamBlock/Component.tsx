'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import { TeamMember } from '@/payload-types'
type TeamBlockProps = {
  title?: string
  description?: string
  members: TeamMember[]
}
export const TeamBlock: React.FC<TeamBlockProps> = ({
  title = 'Meet the Team',
  description = 'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.',
}) => {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch('/api/teamMembers?limit=12&depth=1')
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }
        const json = await res.json()
        // Typically REST endpoint returns { docs: TeamMember[] }
        setMembers(json.docs || [])
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  if (loading) {
    return <p className="mx-auto text-center">Loading team members...</p>
  }
  if (error) {
    return <p className="mx-auto text-center">Error loading team members: {error}</p>
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeader
            heading={title || 'Meet the Team'}
            subheading={
              description ||
              'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.'
            }
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatePresence>
            {members.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                        <p className="font-semibold mb-4" style={{ color: 'var(--brand-primary)' }}>
                          {member.title}
                        </p>
                        <p className="leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    {member.linked_in && (
                      <a
                        href={member.linked_in}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mb-4 text-primary hover:underline"
                      >
                        Visit LinkedIn
                      </a>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
