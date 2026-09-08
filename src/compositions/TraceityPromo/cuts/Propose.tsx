import { Sequence } from 'remotion'

import { ClipVideo } from '../components/ClipVideo'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'
import { layout } from '../layout'

/** 絵コンテの「記録〜提出は早回し、行が入る瞬間だけ実速」に合わせた区切り。 */
const OPEN_MODAL = { from: 0, duration: 33 } as const
const FILL_FORM = { from: 33, duration: 57 } as const
const SUBMIT = { from: 90, duration: 36 } as const
const CREATED = { from: 126, duration: 24 } as const

/** モーダルの文字が小さいので、全体を少しだけ寄せて読ませる。 */
const MODAL_FOCUS = { x: 0.5, y: 0.5, scale: 1.2 } as const

/**
 * C-3 変更提案。モーダルを開く → 入力（早回し）→ 提出 → 変更提案が立つ、まで。
 */
export const Propose: React.FC = () => (
  <PaperScene
    lines={[
      [
        { text: '書いた変更を、' },
        { text: '提案', accent: true },
        { text: 'として出す。' },
      ],
    ]}
  >
    <ScreenCard width={layout.cardWidth} delayInFrames={0} fromScale={1.02}>
      <Sequence from={OPEN_MODAL.from} durationInFrames={OPEN_MODAL.duration}>
        <ClipVideo clip="modalOpen" focus={MODAL_FOCUS} />
      </Sequence>

      <Sequence from={FILL_FORM.from} durationInFrames={FILL_FORM.duration}>
        <ClipVideo clip="modalFill" playbackRate={6} focus={MODAL_FOCUS} />
      </Sequence>

      <Sequence from={SUBMIT.from} durationInFrames={SUBMIT.duration}>
        <ClipVideo
          clip="modalSubmit"
          trimBeforeInSeconds={1.8}
          focus={MODAL_FOCUS}
        />
      </Sequence>

      <Sequence from={CREATED.from} durationInFrames={CREATED.duration}>
        <ClipVideo clip="detailActivity" trimBeforeInSeconds={0.6} />
      </Sequence>
    </ScreenCard>
  </PaperScene>
)
