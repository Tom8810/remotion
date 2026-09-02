import { seconds } from '../../config/video'
import type { ProductPromoProps } from './schema'

/** イントロの尺。 */
export const INTRO_DURATION = seconds(2)

/** feature 1 枚あたりの尺。 */
export const FEATURE_DURATION = seconds(1.6)

/** アウトロの尺。 */
export const OUTRO_DURATION = seconds(2)

/**
 * props から動画全体のフレーム数を求める。
 * Composition の calculateMetadata から呼ばれる。
 */
export const calculateTotalDuration = ({
  features,
}: Pick<ProductPromoProps, 'features'>): number =>
  INTRO_DURATION + FEATURE_DURATION * features.length + OUTRO_DURATION
