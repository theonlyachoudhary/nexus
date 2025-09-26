import React from 'react'
import { TeamBlock } from '@/blocks/Team/Component'
import { fetchTeamMembers, TeamBlockMember } from '@/utilities/fetchTeamMembers'

interface AboutPageProps {
  members: TeamBlockMember[]
}

export async function getStaticProps() {
  let members: TeamBlockMember[] = []
  try {
    members = await fetchTeamMembers()
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching team members:', error)
  }
  return {
    props: { members },
    revalidate: 60, // ISR: revalidate every 60s
  }
}

const AboutPage: React.FC<AboutPageProps> = ({ members }) => {
  return (
    <main>
      <TeamBlock
        title="Meet Our Team"
        description="Learn more about our talented professionals."
        members={members}
      />
    </main>
  )
}

export default AboutPage
