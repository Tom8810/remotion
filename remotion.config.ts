import { Config } from '@remotion/cli/config'

// 動画フレームの中間画像フォーマット。jpeg のほうが高速、png は透過が必要な場合。
Config.setVideoImageFormat('jpeg')

// 同名の出力ファイルがあっても上書きする（CI や繰り返しレンダリング向け）。
Config.setOverwriteOutput(true)

// H.264 の品質。18-28 が実用域で、値が小さいほど高品質・大容量。
Config.setCrf(18)

// 並列レンダリング数。null で CPU コア数に応じて自動決定。
Config.setConcurrency(null)

// Studio / render 中に発生したブラウザ側のログをターミナルへ流す。
Config.setChromiumOpenGlRenderer('angle')
