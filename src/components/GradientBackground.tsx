import type { CSSProperties } from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

import { colors } from '../theme/colors'

type GradientBackgroundProps = {
  /** 背景のグラデーションがゆっくり回転する速度（度/フレーム）。 */
  readonly rotationPerFrame?: number
}

/**
 * 全コンポジションで使う、ゆっくり動くグラデーション背景。
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  rotationPerFrame = 0.15,
}) => {
  const frame = useCurrentFrame()
  const angle = 120 + frame * rotationPerFrame
  const glowOpacity = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    [0.25, 0.55],
  )

  const baseStyle: CSSProperties = {
    background: `linear-gradient(${angle}deg, ${colors.background} 0%, ${colors.backgroundAccent} 100%)`,
  }

  const glowStyle: CSSProperties = {
    background: `radial-gradient(circle at 50% 45%, ${colors.brand} 0%, transparent 55%)`,
    opacity: glowOpacity,
  }

  return (
    <AbsoluteFill style={baseStyle}>
      <AbsoluteFill style={glowStyle} />
    </AbsoluteFill>
  )
}
