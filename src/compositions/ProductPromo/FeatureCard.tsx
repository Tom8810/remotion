import { interpolate } from 'remotion'

import { useSpringIn } from '../../animations/useSpringIn'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'
import type { Feature } from './schema'

type FeatureCardProps = {
  readonly feature: Feature
  readonly index: number
  readonly accentColor: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  index,
  accentColor,
}) => {
  const progress = useSpringIn({ stiffness: 120 })
  const translateX = interpolate(progress, [0, 1], [120, 0])
  const scale = interpolate(progress, [0, 1], [0.92, 1])

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateX(${translateX}px) scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        padding: '48px 64px',
        borderRadius: 32,
        background: colors.surface,
        border: `2px solid ${accentColor}`,
        maxWidth: 1400,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: fontSize.title,
          fontWeight: fontWeight.black,
          color: accentColor,
          minWidth: 120,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span
          style={{
            fontFamily,
            fontSize: fontSize.subtitle,
            fontWeight: fontWeight.bold,
            color: colors.text,
          }}
        >
          {feature.label}
        </span>
        <span
          style={{
            fontFamily,
            fontSize: fontSize.body,
            fontWeight: fontWeight.regular,
            color: colors.textMuted,
          }}
        >
          {feature.description}
        </span>
      </div>
    </div>
  )
}
