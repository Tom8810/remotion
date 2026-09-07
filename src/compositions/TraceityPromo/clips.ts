import { staticFile } from 'remotion'

/**
 * scripts/extract-clips.sh が通し録画から切り出したクリップ。
 * すべて 1920x1080 / 30fps / 無音で、素材の速度は等速のまま。
 * 早回しは Remotion 側の playbackRate で当てる。
 */
const CLIP_FILES = {
  view: '01-view',
  editEnter: '02-edit-enter',
  editRewrite: '03-edit-rewrite',
  modalOpen: '04-modal-open',
  modalFill: '05-modal-fill',
  modalSubmit: '06-modal-submit',
  detailActivity: '07-detail-activity',
  detailDiff: '08-detail-diff',
  detailMerge: '09-detail-merge',
  docAfter: '10-doc-after',
  aiAsk: '11-ai-ask',
  aiAnswer: '12-ai-answer',
} as const

export type ClipName = keyof typeof CLIP_FILES

export const clipSrc = (name: ClipName): string =>
  staticFile(`clips/${CLIP_FILES[name]}.mp4`)
