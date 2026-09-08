import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { jpFontFamily } from '../../../theme/fonts'
import { accentGradient } from '../../../theme/traceity'
import { copySize, copyWeight } from '../typography'

type WordmarkProps = {
  readonly delayInFrames?: number
  readonly fontSize?: number
}

const BRAND_NAME = 'Traceity'

/**
 * ブランドのワードマーク。グラデーションと一緒に着地する（絵コンテ C-8a）。
 */
export const Wordmark: React.FC<WordmarkProps> = ({
  delayInFrames = 0,
  fontSize = copySize.wordmark,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 30, stiffness: 170 },
  })

  return (
    <div
      style={{
        fontFamily: jpFontFamily,
        fontSize,
        fontWeight: copyWeight.bold,
        letterSpacing: '-0.02em',
        backgroundImage: accentGradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        opacity: interpolate(progress, [0, 0.5], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        transform: `translateY(${interpolate(progress, [0, 1], [14, 0])}px)`,
      }}
    >
      {BRAND_NAME}
    </div>
  )
}
