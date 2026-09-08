import { seconds } from '../../config/video'

/**
 * 絵コンテ（45秒本編・冒頭A案）のシーン順。
 * A-1/A-2 は 1 行目が上に詰まる動きがあるので opening にまとめ、
 * C-8a/C-8b はロゴが出たまま注記と CTA に切り替わるので closing にまとめている。
 */
export const SCENE_ORDER = [
  'opening',
  'declare',
  'edit',
  'propose',
  'approve',
  'sync',
  'history',
  'ai',
  'closing',
] as const

export type SceneId = (typeof SCENE_ORDER)[number]

/** 絵コンテの尺（秒）。動画全体の尺はここだけが正。 */
const DURATION_IN_SECONDS: Record<SceneId, number> = {
  opening: 5, // A-1 0:00-0:03 / A-2 0:03-0:05
  declare: 4, // C-1 0:05-0:09
  edit: 5, // C-2 0:09-0:14
  propose: 5, // C-3 0:14-0:19
  approve: 4.5, // C-4 0:19-0:23.5
  sync: 4.5, // C-5 0:23.5-0:28
  history: 5, // C-6 0:28-0:33
  ai: 5, // C-7 0:33-0:38
  closing: 7, // C-8a 0:38-0:41.5 / C-8b 0:41.5-0:45
}

/** シーンの尺をフレーム数で返す。 */
export const sceneDuration = (id: SceneId): number =>
  seconds(DURATION_IN_SECONDS[id])

/** シーンの開始フレームを、それより前のシーンの尺から求める。 */
export const sceneStart = (id: SceneId): number =>
  SCENE_ORDER.slice(0, SCENE_ORDER.indexOf(id)).reduce(
    (total, scene) => total + sceneDuration(scene),
    0,
  )

export const TOTAL_DURATION = SCENE_ORDER.reduce(
  (total, scene) => total + sceneDuration(scene),
  0,
)
