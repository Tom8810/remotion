import { Sequence } from 'remotion'

import { ClipVideo } from '../components/ClipVideo'
import { HighlightFrame } from '../components/HighlightFrame'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'
import { layout } from '../layout'

/** 編集モードに入るところまでを等速で見せる長さ。 */
const ENTER_DURATION = 45

/**
 * 手動ズームの寄り先。右の「変更」欄まで寄せて、
 * 書き換えが 1 件の変更として記録されたことを読ませる。
 */
const RIGHT_PANEL_FOCUS = { x: 0.75, y: 0.26, scale: 2 } as const
/** 寄り切ったあとに「変更」欄を囲んで、記録された 1 件を指し示す。 */
const PANEL_HIGHLIGHT_AT = 74

/**
 * C-2 編集。「編集する」を押して書ける状態にし、書き換えへ。
 * 書き換えは 2.5 倍速にして、編集箇所へ手動ズームを 1 点だけ当てる。
 */
export const Edit: React.FC = () => (
  <PaperScene
    lines={[
      [
        { text: 'ブラウザで、そのまま' },
        { text: '書き換える', accent: true },
        { text: '。' },
      ],
    ]}
  >
    <ScreenCard width={layout.cardWidth} delayInFrames={0} fromScale={1.02}>
      <Sequence durationInFrames={ENTER_DURATION}>
        <ClipVideo clip="editEnter" />
      </Sequence>

      <Sequence from={ENTER_DURATION}>
        <ClipVideo
          clip="editRewrite"
          playbackRate={2.5}
          focus={{ x: 0.5, y: 0.5, scale: 1 }}
          focusTo={RIGHT_PANEL_FOCUS}
          focusDelayInFrames={12}
          focusDurationInFrames={55}
        />
        <HighlightFrame
          left={0.663}
          top={0.065}
          width={0.33}
          height={0.32}
          delayInFrames={PANEL_HIGHLIGHT_AT}
        />
      </Sequence>
    </ScreenCard>
  </PaperScene>
)
