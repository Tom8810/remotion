import type { CSSProperties, ReactNode } from 'react'

import { colors } from '../../theme/colors'
import { mathFontFamily } from '../../theme/typography'

type MathRowProps = {
  readonly children: ReactNode
  readonly fontSize: number
  readonly color?: string
  readonly style?: CSSProperties
}

/**
 * 数式 1 行分のコンテナ。フォントとベースライン揃えをここで一括指定する。
 */
export const MathRow: React.FC<MathRowProps> = ({
  children,
  fontSize,
  color = colors.text,
  style,
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: mathFontFamily,
      fontStyle: 'italic',
      fontSize,
      color,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </span>
)
