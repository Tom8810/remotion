/**
 * Traceity のブランドトークン。
 * 色は製品の画面録画から直接サンプリングしたもので、動画と実 UI の見た目を揃える。
 */
export const traceity = {
  /** 冒頭の暗い地。 */
  ink: '#0A0A0F',
  inkSoft: '#171726',
  /** 本編と締めの明るい地。アプリの地色に合わせる。 */
  paper: '#FAFAFA',
  paperSoft: '#F3F1FB',
  /** 「変更提案を提出する」「変更を反映する」ボタンの色。 */
  primary: '#2C1D94',
  primaryLight: '#6B5CE7',
  primaryGlow: '#A79BF2',
  textOnInk: '#FFFFFF',
  textOnInkMuted: 'rgba(255, 255, 255, 0.45)',
  textOnPaper: '#0F0F16',
  textOnPaperMuted: 'rgba(15, 15, 22, 0.45)',
  /** 差分ページの色。ハイライト枠を実 UI と揃えるために持っておく。 */
  diffAdded: '#C9E9D4',
  diffRemoved: '#FCD0D3',
} as const

/**
 * 1 行のうち 1 語だけを強調するときのグラデーション。
 * background-clip: text と組み合わせて使う。
 */
export const accentGradient = `linear-gradient(100deg, ${traceity.primary} 0%, ${traceity.primaryLight} 58%, ${traceity.primaryGlow} 100%)`
