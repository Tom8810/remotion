import { AbsoluteFill } from 'remotion'

import { traceity } from '../../../theme/traceity'
import { copySize } from '../typography'
import type { CopySegment } from './KineticLine'
import { KineticLine } from './KineticLine'

type LeadCopyProps = {
  /** 1 要素が 1 行。行ごとに入場を遅らせられる。 */
  readonly lines: readonly (readonly CopySegment[])[]
  readonly delaysInFrames?: readonly number[]
  readonly top?: number
}

/**
 * 本編カットの上部に置くコピー。カードより先に置いて視線を上から下へ流す。
 */
export const LeadCopy: React.FC<LeadCopyProps> = ({
  lines,
  delaysInFrames = [],
  top = 96,
}) => (
  <AbsoluteFill
    style={{
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: top,
      gap: 6,
    }}
  >
    {lines.map((segments, index) => (
      <KineticLine
        // コピーは静的な配列なので index をキーにしてよい。
        key={index}
        segments={segments}
        fontSize={copySize.lead}
        color={traceity.textOnPaper}
        delayInFrames={delaysInFrames[index] ?? 0}
      />
    ))}
  </AbsoluteFill>
)
