import type { Block, Field } from 'payload'

const TeamBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'Meet the Team',
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue:
      'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.',
  },
  {
    name: 'members',
    type: 'array',
    minRows: 1,
    maxRows: 12,
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'role',
        type: 'text',
      },
      {
        name: 'bio',
        type: 'textarea',
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'id',
        type: 'text',
        admin: { readOnly: true },
      },
    ],
    defaultValue: [
      {
        name: 'Jacob Biese',
        role: 'CEO & Founder',
        bio: 'Visionary leader with extensive experience in organizational transformation and strategic planning. Jacob founded Nexus with the mission to help businesses achieve operational excellence through systematic improvement.',
        image: '/ceo-headshot.png',
      },
      {
        name: 'Hashir Azam',
        role: 'Principal Automation Architect',
        bio: 'Expert in business process automation and workflow optimization. Hashir specializes in designing and implementing systems that eliminate inefficiencies and drive measurable results.',
        image: '/automation-architect-headshot.png',
      },
      {
        name: 'Muhammad Isaiah Brown',
        role: 'Principal Solutions Consultant',
        bio: 'Strategic consultant focused on aligning people, processes, and technology. Isaiah brings deep expertise in change management and organizational development to every client engagement.',
        image: '/solutions-consultant-headshot.png',
      },
      {
        name: 'Awais Mulla',
        role: 'Nexus Advisor',
        bio: 'Seasoned advisor with a track record of helping organizations navigate complex transformations. Awais provides strategic guidance and ensures successful implementation of improvement initiatives.',
        image: '/business-advisor-headshot.png',
      },
    ],
  },
  {
    name: 'approachTitle',
    type: 'text',
    defaultValue: 'Our Approach',
  },
  {
    name: 'approachDescription',
    type: 'textarea',
    defaultValue:
      'We combine deep industry expertise with proven methodologies to deliver transformational results. Our team works collaboratively with your organization to ensure sustainable change and measurable improvement.',
  },
  {
    name: 'approachStats',
    type: 'array',
    minRows: 3,
    maxRows: 3,
    fields: [
      { name: 'value', type: 'text', required: true },
      { name: 'label', type: 'text', required: true },
    ],
    defaultValue: [
      { value: '15+', label: 'Years Combined Experience' },
      { value: '50+', label: 'Successful Transformations' },
      { value: '100%', label: 'Client Satisfaction Rate' },
    ],
  },
]

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: TeamBlockFields,
}
