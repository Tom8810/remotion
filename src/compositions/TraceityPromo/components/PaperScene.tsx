import type { ReactNode } from 'react'
import { AbsoluteFill } from 'remotion'

import { layout } from '../layout'
import type { CopySegment } from './KineticLine'
import { LeadCopy } from './LeadCopy'
import { PaperBackground } from './PaperBackground'

type PaperSceneProps = {
  readonly lines: readonly (readonly CopySegment[])[]
  readonly copyDelaysInFrames?: readonly number[]
  /** 地のグラデーションを開く長さ。冒頭から本編へ渡る C-1 でだけ使う。 */
  readonly openInFrames?: number
  readonly cardTop?: number
  readonly children: ReactNode
}

/**
 * 本編カットの共通の器。明るい地・上部のコピー・その下の画面という並びを固定する。
 */
export const PaperScene: React.FC<PaperSceneProps> = ({
  lines,
  copyDelaysInFrames,
  openInFrames,
  cardTop = layout.cardTop,
  children,
}) => (
  <AbsoluteFill>
    <PaperBackground openInFrames={openInFrames} />

    <LeadCopy
      lines={lines}
      delaysInFrames={copyDelaysInFrames}
      top={layout.copyTop}
    />

    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: cardTop,
      }}
    >
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
)
