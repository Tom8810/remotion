import type { CSSProperties } from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { jpFontFamily } from '../../../theme/fonts'
import { accentGradient } from '../../../theme/traceity'
import { lineHeight } from '../typography'

export type CopySegment = {
  readonly text: string
  /** true の語だけグラデーションで強調する。参考動画にならい 1 行に 1 つまで。 */
  readonly accent?: boolean
}

type KineticLineProps = {
  readonly segments: readonly CopySegment[]
  readonly fontSize: number
  readonly color: string
  readonly delayInFrames?: number
  /** 開始時に何 px 下から動かすか。絵コンテの指定は 10px。 */
  readonly distance?: number
  readonly fontWeight?: number
  readonly align?: CSSProperties['textAlign']
}

const accentStyle: CSSProperties = {
  backgroundImage: accentGradient,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
}

/**
 * コピー 1 行分。下からすっと上がって止まる。
 * 跳ね返らないよう、バネは臨界減衰よりわずかに強めに設定している。
 */
export const KineticLine: React.FC<KineticLineProps> = ({
  segments,
  fontSize,
  color,
  delayInFrames = 0,
  distance = 10,
  fontWeight = 700,
  align = 'center',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 30, stiffness: 200 },
  })

  const translateY = interpolate(progress, [0, 1], [distance, 0])
  const opacity = interpolate(progress, [0, 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        fontFamily: jpFontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing: '0.01em',
        color,
        textAlign: align,
        opacity,
        transform: `translateY(${translateY}px)`,
        whiteSpace: 'pre',
      }}
    >
      {segments.map((segment, index) => (
        <span
          // コピーは静的な配列なので index をキーにしてよい。
          key={index}
          style={segment.accent ? accentStyle : undefined}
        >
          {segment.text}
        </span>
      ))}
    </div>
  )
}
