import { useCurrentFrame, useVideoConfig } from 'remotion'

import { colors } from '../../theme/colors'
import { fontFamily, fontSize } from '../../theme/typography'
import { buildSpringPath } from './springPath'

type SpringMassProps = {
  readonly accentColor: string
  /** 1 秒あたりの振動回数。 */
  readonly frequency?: number
  /** 振幅（px）。 */
  readonly amplitude?: number
}

const CANVAS = { width: 520, height: 780 } as const
const ANCHOR_Y = 60
const EQUILIBRIUM_Y = 450
const CENTER_X = CANVAS.width / 2
const MASS_RADIUS = 54
const AXIS_X = CANVAS.width - 96

/**
 * つり合いの位置を中心に単振動するばね振り子。
 * 変位 x を実際に sin で動かし、数式と対応させて見せる。
 */
export const SpringMass: React.FC<SpringMassProps> = ({
  accentColor,
  frequency = 0.55,
  amplitude = 115,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const displacement =
    amplitude * Math.sin((2 * Math.PI * frequency * frame) / fps)
  const massY = EQUILIBRIUM_Y + displacement

  const springPath = buildSpringPath({
    anchorY: ANCHOR_Y,
    massY: massY - MASS_RADIUS,
    centerX: CENTER_X,
    coilWidth: 112,
    coilCount: 9,
    leadLength: 34,
  })

  return (
    <svg
      width={CANVAS.width}
      height={CANVAS.height}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
    >
      {/* 天井 */}
      <rect
        x={CENTER_X - 110}
        y={ANCHOR_Y - 18}
        width={220}
        height={12}
        rx={4}
        fill={colors.textMuted}
      />

      {/* 変位 x を測る軸 */}
      <line
        x1={AXIS_X}
        y1={ANCHOR_Y}
        x2={AXIS_X}
        y2={CANVAS.height - 40}
        stroke={colors.textMuted}
        strokeWidth={2}
      />
      <line
        x1={AXIS_X - 30}
        y1={EQUILIBRIUM_Y}
        x2={AXIS_X + 30}
        y2={EQUILIBRIUM_Y}
        stroke={colors.textMuted}
        strokeWidth={2}
      />
      <text
        x={AXIS_X + 42}
        y={EQUILIBRIUM_Y + 10}
        fill={colors.textMuted}
        fontFamily={fontFamily}
        fontSize={fontSize.caption}
      >
        O
      </text>

      {/* 現在位置と、つり合いの位置からの変位 */}
      <line
        x1={AXIS_X - 15}
        y1={massY}
        x2={AXIS_X + 15}
        y2={massY}
        stroke={accentColor}
        strokeWidth={3}
      />
      <text
        x={AXIS_X + 42}
        y={massY + 10}
        fill={accentColor}
        fontFamily={fontFamily}
        fontSize={fontSize.caption}
        fontStyle="italic"
      >
        x
      </text>

      <polyline
        points={springPath}
        fill="none"
        stroke={colors.text}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <circle
        cx={CENTER_X}
        cy={massY}
        r={MASS_RADIUS}
        fill={accentColor}
        stroke={colors.text}
        strokeWidth={4}
      />
      <text
        x={CENTER_X}
        y={massY + 12}
        textAnchor="middle"
        fill={colors.text}
        fontFamily={fontFamily}
        fontSize={fontSize.body}
        fontStyle="italic"
      >
        m
      </text>
    </svg>
  )
}
