import { AbsoluteFill, Sequence } from 'remotion'

import { ClipVideo } from '../components/ClipVideo'
import { FlashOverlay } from '../components/FlashOverlay'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'
import { layout } from '../layout'

const DIFF = { from: 0, duration: 72 } as const
const MERGE = { from: 72, duration: 63 } as const
/** 「変更を反映する」を押す瞬間。ここで画面をわずかに明るくする。 */
const CLICK_AT = 99

/**
 * C-4 確認と承認。差分を軽くスクロールしてから詳細に戻り、変更を反映する。
 */
export const Approve: React.FC = () => (
  <PaperScene
    lines={[
      [
        { text: '差分を見て、' },
        { text: '承認', accent: true },
        { text: 'する。' },
      ],
    ]}
  >
    <ScreenCard width={layout.cardWidth} delayInFrames={0} fromScale={1.02}>
      <Sequence from={DIFF.from} durationInFrames={DIFF.duration}>
        <ClipVideo clip="detailDiff" playbackRate={1.6} />
      </Sequence>

      <Sequence from={MERGE.from} durationInFrames={MERGE.duration}>
        <ClipVideo clip="detailMerge" trimBeforeInSeconds={1.8} />
      </Sequence>

      <AbsoluteFill>
        <FlashOverlay atFrame={CLICK_AT} />
      </AbsoluteFill>
    </ScreenCard>
  </PaperScene>
)
