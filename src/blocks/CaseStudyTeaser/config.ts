import type { Block } from 'payload'
export const CaseStudyTeaser: Block = {
  slug: 'caseStudyTeaser',
  interfaceName: 'CaseStudyTeaserBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Learn About Who We Are',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Nexus is the gold standard in professional change management consulting — disciplined, adaptable, and relentlessly committed to excellence.',
    },
  ],
}
