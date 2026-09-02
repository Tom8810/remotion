import { interpolate } from 'remotion'

import { useSpringIn } from './useSpringIn'

type FadeInUpOptions = {
  readonly delayInFrames?: number
  /** 開始時に何 px 下から動かすか。 */
  readonly distance?: number
}

type FadeInUpStyle = {
  readonly opacity: number
  readonly transform: string
}

/**
 * 下からふわっと現れる入場アニメーションのスタイルを返す。
 */
export const useFadeInUp = ({
  delayInFrames = 0,
  distance = 60,
}: FadeInUpOptions = {}): FadeInUpStyle => {
  const progress = useSpringIn({ delayInFrames })

  const translateY = interpolate(progress, [0, 1], [distance, 0])
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return { opacity, transform: `translateY(${translateY}px)` }
}
