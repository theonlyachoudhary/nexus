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
import { BannerBlock } from '@/blocks/Banner/Component'
import { AboutBlock } from '@/blocks/About/Component'
import { TeamBlock } from '@/blocks/Team/Component'

import { ProcessBlock } from '@/blocks/Process/Component'
import { UnderConstructionBlock } from '@/blocks/UnderConstruction/Component'

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
  banner: BannerBlock,
  process: ProcessBlock,
  underConstruction: UnderConstructionBlock,
  about: AboutBlock,
  team: TeamBlock,
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
          const { blockType } = block as { blockType?: string }

          if (blockType && blockType in blockComponents) {
            // @ts-expect-error: blockType is a string but keys are typed
            const Block = blockComponents[blockType]

            if (Block) {
              // Type guard for mediaBlock
              if (blockType === 'mediaBlock') {
                return (
                  <div className="" key={index}>
                    <Block {...(block as any)} disableInnerContainer />
                  </div>
                )
              }
              // Fallback for all other blocks
              return (
                <div className="" key={index}>
                  <Block {...(block as any)} />
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
