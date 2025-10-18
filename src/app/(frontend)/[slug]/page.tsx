import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
// import configPromise from '@payload-config' // Disabled for static export
import type { RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  // For static export, return empty array - pages will be generated at build time
  // In a real static site, you would pre-generate all page slugs here
  return []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pb-12">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  // For static export, return null - pages will be pre-generated
  // In a real static site, you would return pre-fetched data here
  console.warn('queryPageBySlug: static export mode - no database access')
  return null
})
