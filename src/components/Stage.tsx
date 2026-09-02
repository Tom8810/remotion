import type { ReactNode } from 'react'
import { AbsoluteFill } from 'remotion'

import { useFadeOutAtEnd } from '../animations/useFadeOutAtEnd'
import { colors } from '../theme/colors'

type StageProps = {
  readonly children: ReactNode
  readonly fadeOutInFrames?: number
}

/**
 * 全コンポジション共通の土台。
 * 不透明な黒を敷いた上で中身をフェードさせるので、末尾が白抜けせず黒に落ちる。
 */
export const Stage: React.FC<StageProps> = ({
  children,
  fadeOutInFrames = 15,
}) => {
  const opacity = useFadeOutAtEnd(fadeOutInFrames)

  return (
    <AbsoluteFill style={{ backgroundColor: colors.stage }}>
      <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  )
}
