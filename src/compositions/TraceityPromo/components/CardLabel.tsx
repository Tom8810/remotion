import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { jpFontFamily } from '../../../theme/fonts'
import { traceity } from '../../../theme/traceity'
import { copySize, copyWeight } from '../typography'

type CardLabelProps = {
  readonly children: string
  readonly delayInFrames?: number
}

/**
 * カードの下に置く出どころのラベル。左右で何を見ているかを言い切る。
 */
export const CardLabel: React.FC<CardLabelProps> = ({
  children,
  delayInFrames = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 30, stiffness: 190 },
  })

  return (
    <div
      style={{
        fontFamily: jpFontFamily,
        fontSize: copySize.body - 4,
        fontWeight: copyWeight.medium,
        letterSpacing: '0.06em',
        color: traceity.textOnPaperMuted,
        textAlign: 'center',
        opacity: interpolate(progress, [0, 1], [0, 1]),
      }}
    >
      {children}
    </div>
  )
}
