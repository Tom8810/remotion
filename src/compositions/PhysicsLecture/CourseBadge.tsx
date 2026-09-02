import { useFadeInUp } from '../../animations/useFadeInUp'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'

type CourseBadgeProps = {
  readonly label: string
  readonly subLabel: string
  readonly accentColor: string
  readonly delayInFrames: number
}

/**
 * 画面下部に出る講座ラベル。
 */
export const CourseBadge: React.FC<CourseBadgeProps> = ({
  label,
  subLabel,
  accentColor,
  delayInFrames,
}) => {
  const animation = useFadeInUp({ delayInFrames, distance: 24 })

  return (
    <div
      style={{
        ...animation,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <span
        style={{
          padding: '10px 28px',
          borderRadius: 12,
          background: accentColor,
          fontFamily,
          fontSize: fontSize.body,
          fontWeight: fontWeight.black,
          color: colors.background,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily,
          fontSize: fontSize.body,
          fontWeight: fontWeight.medium,
          letterSpacing: 4,
          color: colors.textMuted,
        }}
      >
        {subLabel}
      </span>
    </div>
  )
}
