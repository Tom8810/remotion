import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { traceity } from '../../../theme/traceity'

type HighlightFrameProps = {
  /** カードに対する 0-1 の比率で指定する。 */
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
  readonly delayInFrames?: number
  readonly color?: string
  /** 枠の外側を暗く落として、そこだけを見せる。 */
  readonly spotlight?: boolean
}

/** スポットライトで外側を落とす濃さ。 */
const SCRIM_ALPHA = 0.42

/**
 * 画面の一箇所を囲んで点灯させる枠。
 * spotlight を付けると、枠の外側が暗く沈んで注目点だけが残る。
 */
export const HighlightFrame: React.FC<HighlightFrameProps> = ({
  left,
  top,
  width,
  height,
  delayInFrames = 0,
  color = traceity.primaryLight,
  spotlight = false,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 26, stiffness: 160 },
  })

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scale = interpolate(progress, [0, 1], [1.06, 1])

  const glow = `0 0 0 6px ${color}22, 0 0 26px ${color}66`
  const scrimAlpha = interpolate(progress, [0, 1], [0, SCRIM_ALPHA], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scrim = `0 0 0 9999px rgba(15, 15, 22, ${scrimAlpha})`

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        width: `${width * 100}%`,
        height: `${height * 100}%`,
        border: `3px solid ${color}`,
        borderRadius: 8,
        boxShadow: spotlight ? `${glow}, ${scrim}` : glow,
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  )
}
