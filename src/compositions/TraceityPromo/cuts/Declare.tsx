import { ClipVideo } from '../components/ClipVideo'
import { PaperScene } from '../components/PaperScene'
import { ScreenCard } from '../components/ScreenCard'
import { layout } from '../layout'

/**
 * C-1 答えの宣言。白背景にグラデーションが開き、カードが 1.03 → 1.00 で着地する。
 * コピーは 2 行を 2 秒差で入れる。操作は映さない。
 */
export const Declare: React.FC = () => (
  <PaperScene
    openInFrames={18}
    lines={[
      [{ text: 'エンジニアは' }, { text: 'エディタ', accent: true }, { text: 'から。' }],
      [{ text: '他のメンバーは、' }, { text: 'ブラウザ', accent: true }, { text: 'から。' }],
    ]}
    copyDelaysInFrames={[0, 60]}
  >
    <ScreenCard width={layout.cardWidth} delayInFrames={4} fromScale={1.03}>
      <ClipVideo clip="view" />
    </ScreenCard>
  </PaperScene>
)
