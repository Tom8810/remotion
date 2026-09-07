import { loadFont } from '@remotion/google-fonts/NotoSansJP'

const { fontFamily } = loadFont('normal', {
  weights: ['400', '500', '700'],
  subsets: ['japanese', 'latin'],
  // 日本語サブセットは unicode-range が細かく分かれるため、リクエスト数の警告は抑える。
  ignoreTooManyRequestsWarning: true,
})

/**
 * 日本語コピー用のフォントスタック。
 * Noto Sans JP はラテン文字も持つので「GitHub」「Traceity」も同じ書体で通す。
 */
export const jpFontFamily = `${fontFamily}, "Hiragino Sans", "Yu Gothic", sans-serif`
