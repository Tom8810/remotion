import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { jpFontFamily } from '../../../theme/fonts'
import { traceity } from '../../../theme/traceity'
import { copySize, copyWeight } from '../typography'

type CtaButtonProps = {
  readonly label: string
  readonly delayInFrames?: number
}

/**
 * 締めの CTA。実 UI のプライマリボタンと同じ色で置く。
 */
export const CtaButton: React.FC<CtaButtonProps> = ({
  label,
  delayInFrames = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 30, stiffness: 180 },
  })

  return (
    <div
      style={{
        fontFamily: jpFontFamily,
        fontSize: copySize.body + 4,
        fontWeight: copyWeight.medium,
        color: traceity.textOnInk,
        backgroundColor: traceity.primary,
        borderRadius: 999,
        padding: '18px 46px',
        boxShadow: '0 16px 40px rgba(44, 29, 148, 0.28)',
        opacity: interpolate(progress, [0, 0.5], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        transform: `translateY(${interpolate(progress, [0, 1], [12, 0])}px)`,
      }}
    >
      {label}
    </div>
  )
}
