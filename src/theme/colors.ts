/**
 * 動画全体で使う配色。コンポーネント側に色を直書きしないための単一の情報源。
 */
export const colors = {
  /** 映像の外側。フェードアウトの落とし先。 */
  stage: '#000000',
  background: '#0b1020',
  backgroundAccent: '#1b2a5b',
  surface: 'rgba(255, 255, 255, 0.06)',
  text: '#f5f7ff',
  textMuted: 'rgba(245, 247, 255, 0.65)',
  brand: '#5b8cff',
  brandAlt: '#a06bff',
} as const

export type ColorName = keyof typeof colors
