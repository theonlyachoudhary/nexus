import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutTeaserBlock } from '@/blocks/AboutTeaser/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CaseStudiesBlock } from '@/blocks/CaseStudies/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CTASectionBlock } from '@/blocks/CTASection/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SolutionsBlock } from '@/blocks/SolutionsBlock/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'

const blockComponents = {
  aboutTeaser: AboutTeaserBlock,
  archive: ArchiveBlock,
  caseStudies: CaseStudiesBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaSection: CTASectionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  solutions: SolutionsBlock,
  testimonials: TestimonialsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
