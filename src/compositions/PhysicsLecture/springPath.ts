type SpringPathParams = {
  /** ばねの上端の y 座標。 */
  readonly anchorY: number
  /** おもりの y 座標。 */
  readonly massY: number
  /** ばねの中心の x 座標。 */
  readonly centerX: number
  /** コイルの左右の振れ幅。 */
  readonly coilWidth: number
  /** コイルの巻き数。 */
  readonly coilCount: number
  /** 上下の直線部分の長さ。 */
  readonly leadLength: number
}

/**
 * ばねのジグザグを SVG polyline 用の座標文字列に変換する。
 * おもりが動くとコイルが伸縮するよう、巻き数は固定のまま間隔だけ変える。
 */
export const buildSpringPath = ({
  anchorY,
  massY,
  centerX,
  coilWidth,
  coilCount,
  leadLength,
}: SpringPathParams): string => {
  const coilTop = anchorY + leadLength
  const coilBottom = massY - leadLength
  const segmentCount = coilCount * 2
  const step = (coilBottom - coilTop) / segmentCount

  const coilPoints = Array.from({ length: segmentCount - 1 }, (_, index) => {
    const y = coilTop + step * (index + 1)
    const direction = index % 2 === 0 ? 1 : -1
    return `${centerX + (coilWidth / 2) * direction},${y}`
  })

  return [
    `${centerX},${anchorY}`,
    `${centerX},${coilTop}`,
    ...coilPoints,
    `${centerX},${coilBottom}`,
    `${centerX},${massY}`,
  ].join(' ')
}
