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
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold font-condensed mb-6',
            headingClassName,
          )}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className={cn(
              'text-lg md:text-xl text-brand-text-secondary leading-relaxed',
              subheadingClassName,
            )}
          >
            {subheading}
          </p>
        )}
      </div>
    </div>
  )
}
