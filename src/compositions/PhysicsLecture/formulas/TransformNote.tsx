import { Fraction } from '../../../components/math/Fraction'
import { MathRow } from '../../../components/math/MathRow'
import { colors } from '../../../theme/colors'
import { fontFamily } from '../../../theme/typography'

type TransformNoteProps = {
  readonly fontSize: number
  readonly accentColor: string
}

/** 変形の手順を示す注記： v = dx/dt を掛けて積分 */
export const TransformNote: React.FC<TransformNoteProps> = ({
  fontSize,
  accentColor,
}) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{ fontSize: fontSize * 1.3, color: accentColor }}>↓</span>
    <MathRow fontSize={fontSize} color={colors.textMuted}>
      v =
      <Fraction numerator="dx" denominator="dt" color={colors.textMuted} />
      <span
        style={{ fontFamily, fontStyle: 'normal', marginLeft: '0.5em' }}
      >
        を掛けて積分
      </span>
    </MathRow>
  </span>
)
