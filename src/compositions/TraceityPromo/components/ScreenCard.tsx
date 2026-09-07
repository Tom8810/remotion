import type { CSSProperties, ReactNode } from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

type ScreenCardProps = {
  readonly children: ReactNode
  readonly width: number
  readonly delayInFrames?: number
  /** 着地アニメーションの開始倍率。絵コンテ C-1 の指定は 1.03 → 1.00。 */
  readonly fromScale?: number
  readonly style?: CSSProperties
}

const ASPECT_RATIO = 9 / 16
const CORNER_RADIUS = 20

/**
 * 画面録画を置く角丸カード。少し大きい状態から等倍へ着地する。
 */
export const ScreenCard: React.FC<ScreenCardProps> = ({
  children,
  width,
  delayInFrames = 0,
  fromScale = 1.03,
  style,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping: 32, stiffness: 180 },
  })

  const scale = interpolate(progress, [0, 1], [fromScale, 1])
  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        width,
        height: width * ASPECT_RATIO,
        borderRadius: CORNER_RADIUS,
        overflow: 'hidden',
        position: 'relative',
        transform: `scale(${scale})`,
        opacity,
        boxShadow:
          '0 40px 90px rgba(15, 15, 22, 0.18), 0 4px 14px rgba(15, 15, 22, 0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
