import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

import { traceity } from '../../../theme/traceity'
import { InkBackground } from '../components/InkBackground'
import { KineticLine } from '../components/KineticLine'
import { copySize } from '../typography'

/** A-2 でコピーが 2 行になる瞬間（絵コンテ 0:03）。 */
const SECOND_LINE_AT = 90
/** 本編へ明るく開けはじめるフレーム（絵コンテ 0:05 の直前）。 */
const OPEN_AT = 138
const OPEN_DURATION = 12
/** 2 行になったとき 1 行目が上へ詰まる距離。行の高さの半分。 */
const LINE_SHIFT = 58

/**
 * 冒頭 A案（A-1 / A-2）。
 * 「本当は、GitHub に置きたかった。」から始め、2 行目が入るときに 1 行目が上へ詰まる。
 * 末尾で白く開けて本編へ渡す。
 */
export const Opening: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const shiftProgress = spring({
    frame: frame - SECOND_LINE_AT,
    fps,
    config: { damping: 30, stiffness: 200 },
  })
  const firstLineShift = interpolate(shiftProgress, [0, 1], [0, -LINE_SHIFT])

  const open = interpolate(frame, [OPEN_AT, OPEN_AT + OPEN_DURATION], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  return (
    <AbsoluteFill>
      <InkBackground />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ transform: `translateY(${firstLineShift}px)` }}>
          <KineticLine
            segments={[
              { text: '本当は、' },
              { text: 'GitHub', accent: true },
              { text: ' に置きたかった。' },
            ]}
            fontSize={copySize.hero}
            color={traceity.textOnInk}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            marginTop: LINE_SHIFT - 12,
          }}
        >
          <KineticLine
            segments={[
              { text: 'エンジニアしか', accent: true },
              { text: '、編集できないから。' },
            ]}
            fontSize={copySize.hero}
            color={traceity.textOnInk}
            delayInFrames={SECOND_LINE_AT}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            width: 2400,
            height: 2400,
            flexShrink: 0,
            borderRadius: '50%',
            backgroundColor: traceity.paper,
            transform: `scale(${open})`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
