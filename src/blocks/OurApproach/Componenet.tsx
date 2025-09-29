import React from 'react'

type OurApproachProps = {
  title?: string
  description?: string
  stats?: Array<{ value: string; label: string }>
}

export const OurApproachBlock: React.FC<OurApproachProps> = ({
  title = 'Our Approach',
  description = 'We combine deep industry expertise with proven methodologies to deliver transformational results. Our team works collaboratively with your organization to ensure sustainable change and measurable improvement.',
  stats = [],
}) => {
  return (
    <div className="mt-16 text-center">
      <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--brand-primary)' }}>
          {title}
        </h3>
        <p className="text-lg leading-relaxed mb-6">{description}</p>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--brand-primary)' }}>
                {stat.value}
              </div>
              <p className="">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
