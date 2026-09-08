/**
 * この動画のサイズスケール。1920x1080 基準の px 値。
 * 参考動画にならい、コピーは大きく・行数は少なく・字間はやや詰める。
 */
export const copySize = {
  /** 冒頭と締めの中央コピー。 */
  hero: 76,
  /** 本編の上部コピー。 */
  lead: 54,
  /** 注記やチップなど、本文サイズ。 */
  body: 30,
  /** ロゴのワードマーク。 */
  wordmark: 64,
} as const

export const copyWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const

/** 日本語を詰めすぎると読みにくいので、行間は広めに取る。 */
export const lineHeight = 1.45
