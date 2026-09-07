import { ClipVideo } from '../components/ClipVideo'
import { HighlightFrame } from '../components/HighlightFrame'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'
import { layout } from '../layout'

/**
 * アクティビティが映っているのは素材の 2.2 秒ぶんしかないので、
 * ゆっくり流して 5 秒を持たせる。中身はほぼ静止しているので気にならない。
 */
const PLAYBACK_RATE = 0.42

/** 「誰がいつ」が見えるヘッダ寄りの位置。 */
const TOP_FOCUS = { x: 0.47, y: 0.334, scale: 1.7 } as const
/** 「なぜ」が読める位置。倍率は変えず、縦だけ動かしてスクロールに見せる。 */
const REASON_FOCUS = { x: 0.47, y: 0.48, scale: 1.7 } as const

const SCROLL_DELAY = 20
const SCROLL_DURATION = 55
/** スクロールが止まってから「変更の理由・経緯」を指し示す。 */
const HIGHLIGHT_AT = SCROLL_DELAY + SCROLL_DURATION + 7

/**
 * C-6 履歴。
 * 1 枚の変更提案を、ヘッダ（誰がいつ）から「変更の理由・経緯」（なぜ）へ
 * ゆっくりスクロールし、止まったところで理由の段落だけを残して周りを落とす。
 */
export const History: React.FC = () => (
  <PaperScene
    lines={[
      [
        { text: '誰がいつ、' },
        { text: 'なぜ', accent: true },
        { text: '変えたか。' },
      ],
      [{ text: 'あとから、' }, { text: 'たどれる', accent: true }, { text: '。' }],
    ]}
    copyDelaysInFrames={[0, 70]}
  >
    <ScreenCard width={layout.cardWidth} delayInFrames={0} fromScale={1.02}>
      <ClipVideo
        clip="detailActivity"
        trimBeforeInSeconds={1.9}
        playbackRate={PLAYBACK_RATE}
        focus={TOP_FOCUS}
        focusTo={REASON_FOCUS}
        focusDelayInFrames={SCROLL_DELAY}
        focusDurationInFrames={SCROLL_DURATION}
      />
      <HighlightFrame
        left={0.225}
        top={0.42}
        width={0.59}
        height={0.157}
        delayInFrames={HIGHLIGHT_AT}
        spotlight
      />
    </ScreenCard>
  </PaperScene>
)
