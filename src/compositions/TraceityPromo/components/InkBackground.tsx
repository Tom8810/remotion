import { AbsoluteFill, useCurrentFrame } from 'remotion'

import { traceity } from '../../../theme/traceity'

/**
 * 冒頭の暗い地。隅のグラデーションがゆっくり動く（絵コンテ A-1 の指定）。
 */
export const InkBackground: React.FC = () => {
  const frame = useCurrentFrame()

  const topLeftX = 12 + Math.sin(frame / 95) * 5
  const topLeftY = 8 + Math.cos(frame / 120) * 4
  const bottomRightX = 88 + Math.cos(frame / 105) * 5
  const bottomRightY = 92 + Math.sin(frame / 85) * 4

  return (
    <AbsoluteFill style={{ backgroundColor: traceity.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${topLeftX}% ${topLeftY}%, ${traceity.primaryLight} 0%, transparent 45%)`,
          opacity: 0.35,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${bottomRightX}% ${bottomRightY}%, ${traceity.primary} 0%, transparent 50%)`,
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  )
}
