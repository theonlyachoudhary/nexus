import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-28 text-center">
      <div className="prose max-w-none mx-auto">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4 text-xl">Still building 🚧</p>
        <p className="mb-8">This page is not ready yet. If you need something, reach out to us!</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button asChild variant="default">
          <Link href="/contact">Contact Us</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
