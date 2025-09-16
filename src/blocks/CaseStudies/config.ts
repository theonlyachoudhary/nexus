import type { Block } from 'payload'

export const CaseStudiesBlock: Block = {
  slug: 'caseStudies',
  interfaceName: 'CaseStudiesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Success Stories',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        "See how we've helped businesses transform their operations and achieve measurable results.",
    },
    {
      name: 'caseStudies',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Add case studies to showcase',
      },
      defaultValue: [
        {
          title: 'YMS Coaching Platform',
          client: 'YMS',
          industry: 'Education & Training',
          challenge:
            'Manual coach scheduling taking 2-5 hours daily, frequent missed sessions due to poor communication.',
          solution:
            'Automated scheduling system with instant notifications and one-click management.',
          results: [
            { result: 'Reduced scheduling time from 2-5 hours to 1 click' },
            { result: '100% elimination of missed coaching sessions' },
            { result: '30% increase in coach utilization' },
            { result: 'Complete automation of reminder system' },
          ],
          metrics: [
            { label: 'Time Saved', value: '95%' },
            { label: 'Missed Sessions', value: '0%' },
            { label: 'Coach Satisfaction', value: '100%' },
          ],
          image: '',
          tags: [{ tag: 'Automation' }, { tag: 'Education' }, { tag: 'Scheduling' }],
        },
        {
          title: 'DarusSalam Seminary Attendance',
          client: 'DarusSalam Seminary',
          industry: 'Religious Education',
          challenge:
            'Manual attendance tracking consuming 30-45 minutes daily, delayed student notifications.',
          solution:
            'Real-time attendance system with instant student notifications and automated reporting.',
          results: [
            { result: 'Saved 30-45 minutes daily on attendance' },
            { result: 'Instant student notification system' },
            { result: 'Real-time attendance analytics' },
            { result: 'Automated parent/guardian alerts' },
          ],
          metrics: [
            { label: 'Daily Time Saved', value: '45 min' },
            { label: 'Notification Speed', value: 'Instant' },
            { label: 'Accuracy Improvement', value: '100%' },
          ],
          image: '',
          tags: [{ tag: 'Real-time' }, { tag: 'Education' }, { tag: 'Notifications' }],
        },
        {
          title: 'Impact Builders Project Management',
          client: 'Impact Builders',
          industry: 'Construction & Development',
          challenge:
            'Disconnected project communication, unclear deliverable tracking, client update delays.',
          solution:
            'Integrated project management system with real-time client dashboards and automated reporting.',
          results: [
            { result: 'Streamlined project communication' },
            { result: 'Real-time project visibility for clients' },
            { result: 'Automated progress reporting' },
            { result: '50% reduction in project coordination time' },
          ],
          metrics: [
            { label: 'Communication Efficiency', value: '+200%' },
            { label: 'Client Satisfaction', value: '98%' },
            { label: 'Project Delivery', value: 'On-time' },
          ],
          image: '',
          tags: [{ tag: 'Project Management' }, { tag: 'Communication' }, { tag: 'Real-time' }],
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'client',
          type: 'text',
          required: true,
        },
        {
          name: 'industry',
          type: 'text',
        },
        {
          name: 'challenge',
          type: 'textarea',
          required: true,
        },
        {
          name: 'solution',
          type: 'textarea',
          required: true,
        },
        {
          name: 'results',
          type: 'array',
          fields: [
            {
              name: 'result',
              type: 'text',
            },
          ],
        },
        {
          name: 'metrics',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'displayStyle',
      type: 'radio',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid Layout',
          value: 'grid',
        },
        {
          label: 'Featured + Grid',
          value: 'featured',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
      admin: {
        description: 'How to display the case studies',
      },
    },
    {
      name: 'background',
      type: 'radio',
      defaultValue: 'light',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Neutral',
          value: 'neutral',
        },
        {
          label: 'Brand Primary Light',
          value: 'primary-light',
        },
        {
          label: 'Muted',
          value: 'muted',
        },
      ],
      admin: {
        description: 'Background color for the case studies section',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'View All Case Studies',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/case-studies',
        },
      ],
    },
  ],
}
