import type { CSSProperties } from 'react'

import { jpFontFamily } from '../../../theme/fonts'
import { HighlightFrame } from './HighlightFrame'

/**
 * GitHub のプルリクエスト画面を模したカード。
 *
 * 通し録画に GitHub 側の画面が含まれていないため、録画から読み取れる実データ
 * （変更提案 #10 のタイトル・作成者・ブランチ ref・コミット・差分の本文）だけを使って
 * 見た目を再現している。本番前に実物のスクリーンショットへ差し替える前提のモック。
 */

const githubColors = {
  canvas: '#FFFFFF',
  subtle: '#F6F8FA',
  border: '#D1D9E0',
  text: '#1F2328',
  muted: '#59636E',
  openGreen: '#1F883D',
  branchBg: '#DDF4FF',
  branchText: '#0969DA',
  addedBg: '#DAFBE1',
  addedMarker: '#1A7F37',
  removedBg: '#FFEBE9',
  removedMarker: '#CF222E',
} as const

const monoFontFamily = '"SFMono-Regular", Menlo, Consolas, monospace'

const PULL_REQUEST = {
  repository: 'nexis-inc / minerva-handbook',
  title: 'リリースを週2回から平日毎日に変更',
  number: '#10',
  author: 'Eito Morohashi',
  head: 'ref_1_01m1r6jz7bctm1cy0e6gdxza6g',
  base: 'main',
  commit: 'fce603b',
  file: '40-開発ルール/リリース手順.md',
  hunk: '@@ -12,7 +12,9 @@ ## 1. リリースのタイミング',
  removed:
    'リリースは毎週火曜と木曜の 14:00 に実施します。リリース担当はその日の当番が務め、前日 17:00 までに対象の変更を確定します。',
  added:
    'リリースは平日毎日 14:00 に実施します。金曜は原則リリースしません（週末に障害対応の人手が足りないため）。リリース担当はその日の当番が務め、当日 12:00 までに対象の変更を確定します。',
  addedExtra:
    '緊急リリース（障害の修正など）は時間外でも行えます。当番のリードに #release で承認をもらってから実施し、実施後に同じスレッドで結果を報告してください。',
} as const

const diffLineStyle = (background: string, marker: string): CSSProperties => ({
  display: 'flex',
  gap: 8,
  background,
  padding: '5px 10px',
  color: githubColors.text,
  borderLeft: `3px solid ${marker}`,
  lineHeight: 1.6,
})

type GithubPrCardProps = {
  /** 変更後の行を囲む枠を点灯させるフレーム。 */
  readonly highlightDelayInFrames?: number
}

export const GithubPrCard: React.FC<GithubPrCardProps> = ({
  highlightDelayInFrames,
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: githubColors.canvas,
      fontFamily: jpFontFamily,
      color: githubColors.text,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ padding: '16px 22px 12px' }}>
      <div style={{ fontSize: 13, color: githubColors.muted }}>
        {PULL_REQUEST.repository}
      </div>

      <div style={{ fontSize: 25, fontWeight: 600, marginTop: 6 }}>
        {PULL_REQUEST.title}{' '}
        <span style={{ color: githubColors.muted, fontWeight: 400 }}>
          {PULL_REQUEST.number}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 10,
          fontSize: 13,
          color: githubColors.muted,
        }}
      >
        <span
          style={{
            backgroundColor: githubColors.openGreen,
            color: githubColors.canvas,
            borderRadius: 999,
            padding: '3px 12px',
            fontSize: 12.5,
          }}
        >
          Open
        </span>
        <span>
          <strong style={{ color: githubColors.text }}>
            {PULL_REQUEST.author}
          </strong>{' '}
          wants to merge 1 commit into
        </span>
        <span
          style={{
            backgroundColor: githubColors.branchBg,
            color: githubColors.branchText,
            borderRadius: 6,
            padding: '2px 8px',
            fontFamily: monoFontFamily,
            fontSize: 12,
          }}
        >
          {PULL_REQUEST.base}
        </span>
        <span>from</span>
        <span
          style={{
            backgroundColor: githubColors.branchBg,
            color: githubColors.branchText,
            borderRadius: 6,
            padding: '2px 8px',
            fontFamily: monoFontFamily,
            fontSize: 12,
            maxWidth: 250,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {PULL_REQUEST.head}
        </span>
      </div>
    </div>

    <div style={{ borderTop: `1px solid ${githubColors.border}`, flex: 1 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: githubColors.subtle,
          padding: '8px 22px',
          fontSize: 13,
          fontFamily: monoFontFamily,
          borderBottom: `1px solid ${githubColors.border}`,
        }}
      >
        <span>{PULL_REQUEST.file}</span>
        <span style={{ color: githubColors.muted }}>
          <span style={{ color: githubColors.addedMarker }}>+2</span>{' '}
          <span style={{ color: githubColors.removedMarker }}>−1</span>{' '}
          {PULL_REQUEST.commit}
        </span>
      </div>

      <div style={{ fontSize: 13.5, padding: '0 12px' }}>
        <div
          style={{
            fontFamily: monoFontFamily,
            fontSize: 12,
            color: githubColors.muted,
            padding: '5px 10px',
          }}
        >
          {PULL_REQUEST.hunk}
        </div>

        <div
          style={diffLineStyle(
            githubColors.removedBg,
            githubColors.removedMarker,
          )}
        >
          <span style={{ color: githubColors.removedMarker }}>−</span>
          <span>{PULL_REQUEST.removed}</span>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={diffLineStyle(
              githubColors.addedBg,
              githubColors.addedMarker,
            )}
          >
            <span style={{ color: githubColors.addedMarker }}>+</span>
            <span>{PULL_REQUEST.added}</span>
          </div>

          {highlightDelayInFrames === undefined ? null : (
            <HighlightFrame
              left={0}
              top={0}
              width={1}
              height={1}
              delayInFrames={highlightDelayInFrames}
            />
          )}
        </div>

        <div
          style={diffLineStyle(githubColors.addedBg, githubColors.addedMarker)}
        >
          <span style={{ color: githubColors.addedMarker }}>+</span>
          <span>{PULL_REQUEST.addedExtra}</span>
        </div>
      </div>
    </div>
  </div>
)
