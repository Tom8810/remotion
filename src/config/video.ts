/**
 * コンポジション共通のビデオ設定。fps や解像度をここでのみ定義する。
 */
export const FPS = 30

export const DIMENSIONS = {
  landscape: { width: 1920, height: 1080 },
  square: { width: 1080, height: 1080 },
  vertical: { width: 1080, height: 1920 },
} as const

/** 秒数をフレーム数へ変換する。durationInFrames の指定を読みやすくするため。 */
export const seconds = (value: number): number => Math.round(value * FPS)
