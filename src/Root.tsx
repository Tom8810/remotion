import { Composition } from 'remotion'

import { DIMENSIONS, FPS, seconds } from './config/video'
import { HelloWorld } from './compositions/HelloWorld/HelloWorld'
import {
  helloWorldDefaultProps,
  helloWorldSchema,
} from './compositions/HelloWorld/schema'
import { PhysicsLecture } from './compositions/PhysicsLecture/PhysicsLecture'
import {
  physicsLectureDefaultProps,
  physicsLectureSchema,
} from './compositions/PhysicsLecture/schema'
import { TOTAL_DURATION } from './compositions/PhysicsLecture/timing'
import { ProductPromo } from './compositions/ProductPromo/ProductPromo'
import {
  productPromoDefaultProps,
  productPromoSchema,
} from './compositions/ProductPromo/schema'
import { calculateTotalDuration } from './compositions/ProductPromo/timing'

/**
 * Studio / CLI から見えるコンポジションの一覧。
 * 新しい動画を追加するときはここに Composition を足す。
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="HelloWorld"
      component={HelloWorld}
      durationInFrames={seconds(5)}
      fps={FPS}
      width={DIMENSIONS.landscape.width}
      height={DIMENSIONS.landscape.height}
      schema={helloWorldSchema}
      defaultProps={helloWorldDefaultProps}
    />

    <Composition
      id="PhysicsLecture"
      component={PhysicsLecture}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={DIMENSIONS.landscape.width}
      height={DIMENSIONS.landscape.height}
      schema={physicsLectureSchema}
      defaultProps={physicsLectureDefaultProps}
    />

    <Composition
      id="ProductPromo"
      component={ProductPromo}
      fps={FPS}
      width={DIMENSIONS.landscape.width}
      height={DIMENSIONS.landscape.height}
      schema={productPromoSchema}
      defaultProps={productPromoDefaultProps}
      // features の数から尺を計算するので durationInFrames は仮値でよい。
      durationInFrames={calculateTotalDuration(productPromoDefaultProps)}
      calculateMetadata={({ props }) => ({
        durationInFrames: calculateTotalDuration(props),
      })}
    />

    <Composition
      id="ProductPromoVertical"
      component={ProductPromo}
      fps={FPS}
      width={DIMENSIONS.vertical.width}
      height={DIMENSIONS.vertical.height}
      schema={productPromoSchema}
      defaultProps={productPromoDefaultProps}
      durationInFrames={calculateTotalDuration(productPromoDefaultProps)}
      calculateMetadata={({ props }) => ({
        durationInFrames: calculateTotalDuration(props),
      })}
    />
  </>
)
