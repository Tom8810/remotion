import { AbsoluteFill, Sequence } from 'remotion'

import { traceity } from '../../theme/traceity'
import { Ai } from './cuts/Ai'
import { Approve } from './cuts/Approve'
import { Closing } from './cuts/Closing'
import { Declare } from './cuts/Declare'
import { Edit } from './cuts/Edit'
import { History } from './cuts/History'
import { Opening } from './cuts/Opening'
import { Propose } from './cuts/Propose'
import { Sync } from './cuts/Sync'
import type { SceneId } from './timing'
import { SCENE_ORDER, sceneDuration, sceneStart } from './timing'

const SCENES: Record<SceneId, React.FC> = {
  opening: Opening,
  declare: Declare,
  edit: Edit,
  propose: Propose,
  approve: Approve,
  sync: Sync,
  history: History,
  ai: Ai,
  closing: Closing,
}

/**
 * Traceity プロモ 45 秒（冒頭 A案）。
 * 各カットの尺は timing.ts が持ち、ここでは順番に並べるだけにする。
 */
export const TraceityPromo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: traceity.ink }}>
    {SCENE_ORDER.map((id) => {
      const Scene = SCENES[id]

      return (
        <Sequence
          key={id}
          name={id}
          from={sceneStart(id)}
          durationInFrames={sceneDuration(id)}
        >
          <Scene />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
