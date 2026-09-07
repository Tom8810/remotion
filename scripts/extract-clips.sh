#!/usr/bin/env bash
#
# Traceity プロモ用のクリップを通し録画から切り出す。
#
# 通し録画は 3840x2160 / 60fps / 無音 で、そのまま Remotion に食わせるとプレビューも
# レンダリングも重い。カット単位に分けて 1920x1080 / 30fps へ落としておく。
# 速度変更はここでは焼かず、Remotion 側の playbackRate で当てる（尺を後から詰められるように）。
#
# 使い方: bash scripts/extract-clips.sh [通し録画のパス]

set -euo pipefail

SOURCE="${1:-assets/source/toshi.mp4}"
OUT_DIR="public/clips"

if [[ ! -f "$SOURCE" ]]; then
  echo "エラー: 通し録画が見つかりません: $SOURCE" >&2
  echo "録画を assets/source/toshi.mp4 に置くか、パスを引数で渡してください。" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# name|開始秒|尺秒|絵コンテ上の用途
CLIPS=(
  "01-view|0.0|5.0|C-1 ドキュメント閲覧"
  "02-edit-enter|7.2|3.0|C-2 編集モードに入る"
  "03-edit-rewrite|11.5|10.5|C-2 本文を書き換える"
  "04-modal-open|30.2|2.6|C-3 変更提案モーダルを開く"
  "05-modal-fill|43.0|14.0|C-3 タイトルと本文を入力"
  "06-modal-submit|89.4|3.3|C-3 提出する"
  "07-detail-activity|94.2|6.0|C-5 右 / C-6 アクティビティと理由・経緯"
  "08-detail-diff|98.8|5.8|C-4 差分をスクロール"
  "09-detail-merge|103.8|5.6|C-4 変更を反映する"
  "10-doc-after|115.5|6.0|C-5 左 反映後のドキュメント"
  "11-ai-ask|124.0|6.0|C-7 AI に質問する"
  "12-ai-answer|331.0|7.0|C-7 出典つきの回答"
)

for entry in "${CLIPS[@]}"; do
  IFS='|' read -r name start duration note <<<"$entry"
  printf '%-20s %6ss +%5ss  %s\n' "$name" "$start" "$duration" "$note"

  ffmpeg -hide_banner -loglevel error -y \
    -ss "$start" -i "$SOURCE" -t "$duration" \
    -vf "scale=1920:1080:flags=lanczos,fps=30" \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$OUT_DIR/$name.mp4"
done

echo
echo "完了: $OUT_DIR に $(ls -1 "$OUT_DIR"/*.mp4 | wc -l | tr -d ' ') 本"
