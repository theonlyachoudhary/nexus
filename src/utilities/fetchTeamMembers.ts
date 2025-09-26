import { TeamMember, Media } from '@/payload-types'

export interface TeamBlockMember {
  id: string | number
  name: string
  role: string
  bio?: string
  image?: string | { url?: string }
}

export async function fetchTeamMembers(): Promise<TeamBlockMember[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/teamMembers?limit=100&depth=1`,
  )
  if (!res.ok) throw new Error('Failed to fetch team members')
  const data = await res.json()
  if (!data?.docs) return []
  return data.docs.map((member: TeamMember) => ({
    id: member.id,
    name: member.name,
    role: member.title,
    bio: member.bio || '',
    image:
      typeof member.image === 'object' && member.image && 'url' in member.image
        ? { url: (member.image as Media).url || '' }
        : '',
  }))
}
