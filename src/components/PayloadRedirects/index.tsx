import type React from 'react'
import { notFound } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component handles 404s for static export - no dynamic redirects */
export const PayloadRedirects: React.FC<Props> = ({ disableNotFound }) => {
  if (disableNotFound) return null

  notFound()
}
