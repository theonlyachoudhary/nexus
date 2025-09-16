

import { cn } from '@/utilities/ui'
import * as React from 'react'
import Image, { ImageProps } from 'next/image'

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  ),
)
Avatar.displayName = 'Avatar'

const AvatarImage: React.FC<Omit<ImageProps, 'src' | 'alt'> & { src?: string; alt?: string }> = ({ className, src = '', alt = 'avatar', ...props }) => (
  <Image
    className={cn('aspect-square h-full w-full', className)}
    src={src}
    alt={alt}
    width={40}
    height={40}
    {...props}
  />
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    />
  ),
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
