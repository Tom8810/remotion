import { CardLabel } from '../components/CardLabel'
import { ClipVideo } from '../components/ClipVideo'
import { GithubPrCard } from '../components/GithubPrCard'
import { HighlightFrame } from '../components/HighlightFrame'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'

/** 2 枚並べるので 1 枚あたりは本編の既定より小さくする。 */
const CARD_WIDTH = 850
const CARD_GAP = 56
/** 左右の枠が同時に点くタイミング。 */
const HIGHLIGHT_AT = 34

/**
 * C-5 GitHub 同期。同じ変更提案を左右に並べる。
 * 左は Traceity の変更提案 #10（ヘッダと差分）、右は同じ差分が乗った GitHub のプルリクエスト。
 * 直した一文を指す枠が、左右で同時に点く。
 */
export const Sync: React.FC = () => (
  <PaperScene
    lines={[
      [
        { text: '直した文は、' },
        { text: 'GitHub', accent: true },
        { text: ' にも入る。' },
      ],
    ]}
    cardTop={318}
  >
    <div style={{ display: 'flex', gap: CARD_GAP, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <ScreenCard width={CARD_WIDTH} delayInFrames={4} fromScale={1.04}>
          <ClipVideo
            clip="detailDiff"
            trimBeforeInSeconds={4.2}
            playbackRate={0.25}
            focus={{ x: 0.56, y: 0.42, scale: 1.35 }}
          />
          <HighlightFrame
            left={0.142}
            top={0.8}
            width={0.7}
            height={0.075}
            delayInFrames={HIGHLIGHT_AT}
          />
        </ScreenCard>
        <CardLabel delayInFrames={10}>Traceity</CardLabel>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <ScreenCard width={CARD_WIDTH} delayInFrames={4} fromScale={1.04}>
          <GithubPrCard highlightDelayInFrames={HIGHLIGHT_AT} />
        </ScreenCard>
        <CardLabel delayInFrames={10}>GitHub</CardLabel>
      </div>
    </div>
  </PaperScene>
)
