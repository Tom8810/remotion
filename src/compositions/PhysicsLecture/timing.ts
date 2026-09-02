import { seconds } from '../../config/video'

/**
 * 5 秒のカット内で各要素が出てくるフレーム。
 * 見せ場（結論の式）が中盤に来るよう前半を詰めている。
 */
export const CUES = {
  underline: 8,
  equationOfMotion: 22,
  transformNote: 40,
  energyConservation: 58,
  courseBadge: 88,
} as const

export const TOTAL_DURATION = seconds(5)
