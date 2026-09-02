/**
 * フォントとサイズのスケール。1080p を基準にした px 値。
 */
export const fontFamily =
  '"Inter", "Helvetica Neue", "Hiragino Sans", "Noto Sans JP", sans-serif'

export const fontSize = {
  hero: 120,
  title: 84,
  heading: 62,
  subtitle: 44,
  body: 32,
  caption: 24,
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
} as const

/** 数式用のフォント。イタリックのセリフ体で「物理の板書」らしさを出す。 */
export const mathFontFamily =
  '"Latin Modern Math", "Cambria Math", "Times New Roman", "Hiragino Mincho ProN", serif'
