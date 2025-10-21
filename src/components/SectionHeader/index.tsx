import React from 'react'
import { cn } from '@/utilities/ui'

export interface SectionHeaderProps {
  heading: string
  subheading?: string
  className?: string
  headingClassName?: string
  subheadingClassName?: string
  containerClassName?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
  align?: 'left' | 'center' | 'right'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const spacingClasses = {
  sm: 'mb-8',
  md: 'mb-12',
  lg: 'mb-16',
  xl: 'mb-20',
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  subheading,
  className,
  headingClassName,
  subheadingClassName,
  containerClassName,
  maxWidth = '3xl',
  align = 'center',
  spacing = 'lg',
}) => {
  return (
    <div className={cn('container mx-auto px-4', containerClassName)}>
      <div
        className={cn(
          maxWidthClasses[maxWidth],
          'mx-auto',
          alignClasses[align],
          spacingClasses[spacing],
          className,
        )}
      >
        <h2
          className={cn('font-bold font-condensed mb-6 leading-snug', headingClassName)}
          style={{
            /* middle-ground clamp: smaller min, less-aggressive max than your earlier clamp,
               but still responsive and smooth across viewports */
            fontSize: 'clamp(1.875rem, 4.5vh, 3.5rem)',
          }}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className={cn('text-brand-text-secondary leading-relaxed', subheadingClassName)}
            style={{
              /* middle-ground subheading sizing between tight mobile and larger desktop sizes */
              fontSize: 'clamp(1.0625rem, 1.9vh, 1.625rem)',
            }}
          >
            {subheading}
          </p>
        )}
      </div>
    </div>
  )
}
