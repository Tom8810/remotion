import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

import { traceity } from '../../../theme/traceity'

type PaperBackgroundProps = {
  /**
   * 0 より大きいと、地のグラデーションがこのフレーム数をかけて開く。
   * 冒頭から本編へ切り替わる C-1 でだけ使う。
   */
  readonly openInFrames?: number
}

/**
 * 本編と締めの明るい地。隅にブランド色のグラデーションを薄く敷く。
 */
export const PaperBackground: React.FC<PaperBackgroundProps> = ({
  openInFrames = 0,
}) => {
  const frame = useCurrentFrame()

  const open =
    openInFrames > 0
      ? interpolate(frame, [0, openInFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1

  const drift = Math.sin(frame / 110) * 4

  return (
    <AbsoluteFill style={{ backgroundColor: traceity.paper }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${14 + drift}% 6%, ${traceity.primaryGlow} 0%, transparent 55%)`,
          opacity: 0.24 * open,
          transform: `scale(${interpolate(open, [0, 1], [0.7, 1])})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 92% 96%, ${traceity.primaryLight} 0%, transparent 50%)`,
          opacity: 0.11 * open,
          transform: `scale(${interpolate(open, [0, 1], [0.7, 1])})`,
        }}
      />
    </AbsoluteFill>
  )
}
