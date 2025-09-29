import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

// ...existing code...

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const { footerNav, teamLinks, resourceLinks, copyrightText, companyInfo } = footerData || {}

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">{companyInfo?.name || 'Nexus'}</h3>
            <p className="">{companyInfo?.tagline || 'Preparing for a Smarter Tomorrow'}</p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="">Navigation</h4>
            <div className="space-y-2">
              {footerNav?.map((item, index) => {
                const linkProps = item.newTab
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}

                return (
                  <Link
                    key={index}
                    href={item.url || '#'}
                    className="text-black/60 block hover:text-primary transition-colors"
                    {...linkProps}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Resource Links */}
          <div className="space-y-4">
            <h4 className="">Resources</h4>
            <div className="space-y-2">
              {resourceLinks?.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.link || '#'}
                  className="block text-black/60 hover:text-primary transition-colors"
                >
                  {resource.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Team Links */}
          <div className="space-y-4">
            <h4 className="">Team</h4>
            <div className="space-y-2 text-black/60">
              {teamLinks?.map((teamLink, index) => {
                const member = teamLink.member
                if (typeof member === 'object' && member !== null) {
                  const displayName = teamLink.labelOverride || member.name
                  const memberTitle = member.title
                  const memberSlug = member.slug

                  return (
                    <div key={index}>
                      <Link href={'/about#team'} className="hover:text-primary transition-colors">
                        {displayName}
                        {memberTitle && ` — ${memberTitle}`}
                      </Link>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>
            {copyrightText ||
              `© ${new Date().getFullYear()} Nexus Consultancy. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
