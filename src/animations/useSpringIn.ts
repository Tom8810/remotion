import { spring, useCurrentFrame, useVideoConfig } from 'remotion'

type SpringInOptions = {
  /** アニメーション開始フレーム（コンポジション先頭からの相対値）。 */
  readonly delayInFrames?: number
  /** バネの硬さ。大きいほど速く収束する。 */
  readonly damping?: number
  readonly stiffness?: number
}

/**
 * 0 から 1 へ向かうバネの進捗値を返す。
 * 拡大・フェード・スライドなどの入場アニメーションの基礎値として使う。
 */
export const useSpringIn = ({
  delayInFrames = 0,
  damping = 200,
  stiffness = 100,
}: SpringInOptions = {}): number => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return spring({
    frame: frame - delayInFrames,
    fps,
    config: { damping, stiffness },
  })
}
