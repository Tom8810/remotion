import { Sequence } from 'remotion'

import { Chip } from '../components/Chip'
import { ClipVideo } from '../components/ClipVideo'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'
import { ToolChips } from '../components/ToolChips'

/** チップの分だけカードを小さくする。 */
const CARD_WIDTH = 1160
const ASK = { from: 0, duration: 66 } as const
const ANSWER = { from: 66, duration: 84 } as const
/** 絵コンテの指定どおり、チップは答えが出たあとに点灯させる。 */
const SOURCE_CHIP_AT = 88
const TOOL_CHIPS_AT = 98

const AI_TOOLS = ['Claude', 'ChatGPT', 'Copilot', 'Gemini'] as const

/**
 * C-7 AI が「なぜ」に答える。
 * 質問の入力は 2 倍速、答えが出る瞬間は実速。出典は録画の回答に合わせて #10。
 */
export const Ai: React.FC = () => (
  <PaperScene
    lines={[
      [
        { text: 'AI に聞いても、' },
        { text: '記録をもとに', accent: true },
        { text: '答える。' },
      ],
    ]}
    cardTop={264}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 34,
      }}
    >
      <ScreenCard width={CARD_WIDTH} delayInFrames={0} fromScale={1.02}>
        <Sequence from={ASK.from} durationInFrames={ASK.duration}>
          <ClipVideo
            clip="aiAsk"
            playbackRate={2.2}
            focus={{ x: 0.5, y: 0.42, scale: 1.8 }}
          />
        </Sequence>

        <Sequence from={ANSWER.from} durationInFrames={ANSWER.duration}>
          <ClipVideo
            clip="aiAnswer"
            trimBeforeInSeconds={2.6}
            focus={{ x: 0.5, y: 0.33, scale: 1.9 }}
          />
        </Sequence>
      </ScreenCard>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <Chip delayInFrames={SOURCE_CHIP_AT} filled>
          出典: 変更提案 #10
        </Chip>
        <ToolChips names={AI_TOOLS} delayInFrames={TOOL_CHIPS_AT} />
      </div>
    </div>
  </PaperScene>
)
