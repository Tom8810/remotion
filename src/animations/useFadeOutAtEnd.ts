import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * コンポジション末尾で 0 へ落ちる不透明度を返す。
 * @param fadeDurationInFrames フェードアウトにかけるフレーム数。
 */
export const useFadeOutAtEnd = (fadeDurationInFrames = 15): number => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  return interpolate(
    frame,
    [durationInFrames - fadeDurationInFrames, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )
}
