import type { ReactNode } from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { jpFontFamily } from '../../../theme/fonts'
import { traceity } from '../../../theme/traceity'
import { copySize, copyWeight } from '../typography'

type ChipProps = {
  readonly children: ReactNode
  readonly delayInFrames?: number
  readonly filled?: boolean
}

/**
 * 小さなピル。AI ツール名や出典の表示に使う。
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  delayInFrames = 0,
  filled = false,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 28, stiffness: 190 },
  })

  return (
    <div
      style={{
        fontFamily: jpFontFamily,
        fontSize: copySize.body,
        fontWeight: copyWeight.medium,
        color: filled ? traceity.textOnInk : traceity.primary,
        backgroundColor: filled ? traceity.primary : 'rgba(44, 29, 148, 0.08)',
        border: `1.5px solid ${filled ? traceity.primary : 'rgba(44, 29, 148, 0.22)'}`,
        borderRadius: 999,
        padding: '10px 24px',
        whiteSpace: 'nowrap',
        opacity: interpolate(progress, [0, 0.5], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        transform: `translateY(${interpolate(progress, [0, 1], [8, 0])}px)`,
      }}
    >
      {children}
    </div>
  )
}
