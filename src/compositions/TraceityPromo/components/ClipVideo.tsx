import { interpolate, OffthreadVideo, useCurrentFrame, useVideoConfig } from 'remotion'

import type { ClipName } from '../clips'
import { clipSrc } from '../clips'

export type Focus = {
  /** 画面中央に寄せたい点。クリップの幅・高さに対する 0-1 の比率。 */
  readonly x: number
  readonly y: number
  readonly scale: number
}

type ClipVideoProps = {
  readonly clip: ClipName
  /** クリップ先頭から何秒を捨てるか。 */
  readonly trimBeforeInSeconds?: number
  readonly playbackRate?: number
  readonly focus?: Focus
  /** focus から focusTo へ動かすと、手動ズームになる。 */
  readonly focusTo?: Focus
  readonly focusDelayInFrames?: number
  readonly focusDurationInFrames?: number
}

const NEUTRAL_FOCUS: Focus = { x: 0.5, y: 0.5, scale: 1 }

/**
 * 拡大しても余白が出ないよう、注目点をクリップの内側へ収める。
 */
const clampFocus = ({ x, y, scale }: Focus): Focus => {
  const margin = Math.min(0.5, 0.5 / scale)
  const clamp = (value: number): number =>
    Math.min(1 - margin, Math.max(margin, value))

  return { x: clamp(x), y: clamp(y), scale }
}

const blendFocus = (from: Focus, to: Focus, progress: number): Focus => ({
  x: interpolate(progress, [0, 1], [from.x, to.x]),
  y: interpolate(progress, [0, 1], [from.y, to.y]),
  scale: interpolate(progress, [0, 1], [from.scale, to.scale]),
})

/**
 * 切り出し済みクリップを 1 枚。注目点へのズーム／パンを持てる。
 */
export const ClipVideo: React.FC<ClipVideoProps> = ({
  clip,
  trimBeforeInSeconds = 0,
  playbackRate = 1,
  focus = NEUTRAL_FOCUS,
  focusTo,
  focusDelayInFrames = 0,
  focusDurationInFrames = 60,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = focusTo
    ? interpolate(
        frame,
        [focusDelayInFrames, focusDelayInFrames + focusDurationInFrames],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      )
    : 0

  const current = clampFocus(
    focusTo ? blendFocus(focus, focusTo, progress) : focus,
  )

  return (
    <OffthreadVideo
      src={clipSrc(clip)}
      trimBefore={Math.round(trimBeforeInSeconds * fps)}
      playbackRate={playbackRate}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: `scale(${current.scale}) translate(${(0.5 - current.x) * 100}%, ${(0.5 - current.y) * 100}%)`,
      }}
    />
  )
}
