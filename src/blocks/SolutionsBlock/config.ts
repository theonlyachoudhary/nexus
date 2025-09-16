import type { Block, Field } from 'payload'

const solutionItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'subtitle',
    type: 'text',
    admin: {
      description: 'A short phrase that appears below the title',
    },
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'icon',
    type: 'text',
    admin: {
      description: 'Icon name from Lucide Icons (e.g., "workflow", "settings", "users")',
    },
  },
]

export const SolutionsBlock: Block = {
  slug: 'solutions',
  interfaceName: 'SolutionsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Explore Our Solutions',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'Holistic improvement of people, processes, and product alignment — with emphasis on workflow development and business process automation.',
    },
    {
      name: 'solutions',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Add up to 6 solution items',
      },
      defaultValue: [
        {
          title: 'Process Optimization',
          subtitle: 'Workflow Efficiency',
          description:
            'Streamline workflows and eliminate bottlenecks for maximum efficiency and productivity.',
          icon: 'workflow',
        },
        {
          title: 'Team Alignment',
          subtitle: 'Cross-functional Collaboration',
          description:
            'Align your teams with clear objectives and communication pathways to drive success.',
          icon: 'users',
        },
        {
          title: 'Business Automation',
          subtitle: 'Smart Technology Integration',
          description:
            'Implement smart automation to reduce manual tasks and focus on high-value activities.',
          icon: 'settings',
        },
      ],
      fields: solutionItemFields,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'View All Solutions',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/solutions',
        },
      ],
    },
  ],
}
