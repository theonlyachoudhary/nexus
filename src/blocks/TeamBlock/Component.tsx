'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import { TeamMember } from '@/payload-types'
import clsx from 'clsx'
import Image from 'next/image'

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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch('/api/teamMembers?limit=12&depth=1&sort=priority')
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }
        const json = await res.json()
        // Filter out non-core members in JS
        const coreMembers = (json.docs || []).filter((m: TeamMember) => !m.non_core)
        setMembers(coreMembers)
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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
          <a href="#team"></a>
          <SectionHeader
            heading={title || 'Meet the Team'}
            subheading={
              description ||
              'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.'
            }
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <AnimatePresence>
            {members.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card className="bg-brand-neutral/20 border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <CardContent className="p-8 flex-1">
                    {/* Image row */}
                    {member.image && (
                      <div className="w-full flex justify-center mb-4">
                        <Image
                          src={
                            typeof member.image === 'string'
                              ? member.image
                              : typeof member.image === 'object' &&
                                  member.image !== null &&
                                  'url' in member.image
                                ? (member.image as { url: string }).url
                                : ''
                          }
                          alt={member.name}
                          width={400}
                          height={300}
                          className="w-full aspect-[4/3] object-cover border border-gray-200 shadow rounded-[5px] transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                        />
                      </div>
                    )}
                    {/* Info row: name, title, email */}
                    <div className="flex flex-col items-start mb-4">
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="font-semibold mb-1" style={{ color: 'var(--brand-primary)' }}>
                        {member.title}
                      </p>
                      {member.email && <p className="text-sm text-gray-600">{member.email}</p>}
                    </div>
                    {/* Bio row */}
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        if (
                          (e.target as HTMLElement).closest('a') &&
                          (e.target as HTMLElement).closest('a')?.href === member.linked_in
                        ) {
                          return
                        }
                        toggleExpand(String(member.id))
                      }}
                    >
                      <div
                        className={clsx(
                          'leading-relaxed transition-all',
                          !expanded[member.id] && 'line-clamp-3 max-h-20',
                        )}
                      >
                        {member.bio}
                      </div>
                      {member.bio && member.bio.length > 200 && (
                        <button
                          className="mt-2 text-sm text-primary underline focus:outline-none"
                          tabIndex={0}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleExpand(String(member.id))
                          }}
                        >
                          {expanded[member.id] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0 flex justify-start">
                    {member.linked_in && (
                      <a
                        href={member.linked_in}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-primary hover:underline"
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
