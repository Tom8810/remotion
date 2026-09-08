import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

type FlashOverlayProps = {
  readonly atFrame: number
  readonly durationInFrames?: number
  readonly strength?: number
}

/**
 * クリックの瞬間に画面をわずかに明るくする（絵コンテ C-4 の指定）。
 */
export const FlashOverlay: React.FC<FlashOverlayProps> = ({
  atFrame,
  durationInFrames = 10,
  strength = 0.16,
}) => {
  const frame = useCurrentFrame()

  const opacity = interpolate(
    frame,
    [atFrame, atFrame + durationInFrames * 0.3, atFrame + durationInFrames],
    [0, strength, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#FFFFFF', opacity, pointerEvents: 'none' }}
    />
  )
}
