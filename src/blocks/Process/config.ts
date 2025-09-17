import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  labels: {
    singular: 'Process',
    plural: 'Processes',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Process',
    },
    {
      name: 'intro',
      label: 'Intro Paragraph',
      type: 'textarea',
      required: true,
      defaultValue:
        'A proven methodology that transforms businesses through systematic change management and operational excellence.',
    },
    {
      name: 'steps',
      label: 'Steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'position',
          label: 'Position (CSS classes)',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Discovery & Assessment',
          description:
            'Rapid, targeted automation builds that eliminate single-point bottlenecks and free up capacity without requiring a full system overhaul.',
          position: 'top-0 left-0',
        },
        {
          title: 'Strategic Planning',
          description:
            'We develop a comprehensive roadmap tailored to your business needs, identifying key areas for operational improvement and growth.',
          position: 'top-20 left-16',
        },
        {
          title: 'Implementation',
          description:
            'Our team works closely with yours to implement solutions systematically, ensuring minimal disruption to daily operations.',
          position: 'top-0 left-1/2 -translate-x-1/2',
        },
        {
          title: 'Optimization',
          description:
            'We fine-tune processes and systems to maximize efficiency, providing training and support for sustainable long-term success.',
          position: 'top-20 right-16',
        },
        {
          title: 'Ongoing Support',
          description:
            'Continuous monitoring and support ensure your business maintains momentum and adapts to evolving market conditions.',
          position: 'top-0 right-0',
        },
      ],
    },
    {
      name: 'ctaText',
      label: 'CTA Text',
      type: 'text',
      required: true,
      defaultValue: 'Ready to transform your business with our proven process?',
    },
    {
      name: 'ctaButton',
      label: 'CTA Button Label',
      type: 'text',
      required: true,
      defaultValue: 'Start Your Journey',
    },
    {
      name: 'ctaLink',
      label: 'CTA Button Link',
      type: 'text',
      required: true,
      defaultValue: '/book-consultation',
    },
  ],
}
