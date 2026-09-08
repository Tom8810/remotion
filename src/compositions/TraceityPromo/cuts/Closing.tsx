import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

import { jpFontFamily } from '../../../theme/fonts'
import { traceity } from '../../../theme/traceity'
import { CtaButton } from '../components/CtaButton'
import { KineticLine } from '../components/KineticLine'
import { PaperBackground } from '../components/PaperBackground'
import { Wordmark } from '../components/Wordmark'
import { copySize, copyWeight } from '../typography'

/** C-8a から C-8b へ切り替わるフレーム（絵コンテ 0:41.5）。 */
const NOTE_AT = 105
const FADE_DURATION = 12

/**
 * C-8a 締めコピー / C-8b 注記と CTA。
 * ロゴは出したまま、コピーが注記と CTA に入れ替わる。最後はロゴとボタンだけ残して静止する。
 */
export const Closing: React.FC = () => {
  const frame = useCurrentFrame()

  const headlineOpacity = interpolate(
    frame,
    [NOTE_AT - FADE_DURATION, NOTE_AT],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  const wordmarkTop = interpolate(frame, [NOTE_AT - 6, NOTE_AT + 10], [578, 512], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const noteOpacity = interpolate(frame, [NOTE_AT, NOTE_AT + FADE_DURATION], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill>
      <PaperBackground />

      <AbsoluteFill style={{ alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 424, opacity: headlineOpacity }}>
          <KineticLine
            segments={[
              { text: 'GitHub のドキュメント管理を、' },
              { text: '全ての人に', accent: true },
            ]}
            fontSize={copySize.hero}
            color={traceity.textOnPaper}
            delayInFrames={6}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 434,
            opacity: noteOpacity,
            fontFamily: jpFontFamily,
            fontSize: copySize.body,
            fontWeight: copyWeight.regular,
            color: traceity.textOnPaperMuted,
          }}
        >
          GitHub 連携なしでも、使えます。
        </div>

        <div style={{ position: 'absolute', top: wordmarkTop }}>
          <Wordmark delayInFrames={20} />
        </div>

        <div style={{ position: 'absolute', top: 640, opacity: noteOpacity }}>
          <CtaButton label="無料で始める" delayInFrames={NOTE_AT + 8} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
