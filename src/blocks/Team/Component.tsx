import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { SectionHeader } from '@/components/SectionHeader'
import { TeamMember } from '@/payload-types'


export const TeamBlock = ({
  title,
  description,
  approachTitle,
  approachDescription,
  approachStats,
}: {
  title?: string
  description?: string
  approachTitle?: string
  approachDescription?: string
  approachStats?: Array<{ value: string; label: string }>
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const response = await fetch('/api/teamMembers?limit=12')
      const data = await response.json()
      setTeamMembers(Array.isArray(data.docs) ? data.docs : [])
    }
    fetchTeamMembers()
  }, [])

  // Sort by ranking if present
  const sortedMembers = [...teamMembers].sort((a, b) => {
    const rankA = typeof a?.ranking === 'number' ? a.ranking! : Number.POSITIVE_INFINITY
    const rankB = typeof b?.ranking === 'number' ? b.ranking! : Number.POSITIVE_INFINITY
    return rankA - rankB
  })

  const statsToRender =
    Array.isArray(approachStats) && approachStats.length > 0
      ? approachStats
      : [
          { value: '15+', label: 'Years Combined Experience' },
          { value: '50+', label: 'Successful Transformations' },
          { value: '100%', label: 'Client Satisfaction Rate' },
        ]

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
          {sortedMembers.map((member, index) => (
            <Card
              key={member.id || index}
              className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    {member.image && (
                      <Image
                        src={
                          typeof member.image === 'string' ? member.image : member.image?.url || ''
                        }
                        alt={member.name || ''}
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-lg object-cover mx-auto md:mx-0"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="font-semibold mb-4" style={{ color: 'var(--brand-primary)' }}>
                      {member.role}
                    </p>
                    <p className="leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--brand-primary)' }}>
              {approachTitle || 'Our Approach'}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {approachDescription ||
                'We combine deep industry expertise with proven methodologies to deliver transformational results. Our team works collaboratively with your organization to ensure sustainable change and measurable improvement.'}
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {statsToRender.map((stat, idx) => (
                <div key={idx}>
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    {stat.value}
                  </div>
                  <p className="">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
