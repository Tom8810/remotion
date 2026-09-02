import { colors } from '../../theme/colors'

type FractionProps = {
  readonly numerator: string
  readonly denominator: string
  readonly color?: string
}

/**
 * 分数。親の font-size に対する相対サイズで組むので、どの行でも同じ見た目になる。
 */
export const Fraction: React.FC<FractionProps> = ({
  numerator,
  denominator,
  color = colors.text,
}) => (
  <span
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.66em',
      lineHeight: 1.15,
      margin: '0 0.14em',
      verticalAlign: 'middle',
    }}
  >
    <span style={{ padding: '0 0.2em' }}>{numerator}</span>
    <span
      style={{
        width: '100%',
        height: 2,
        background: color,
        margin: '0.08em 0',
      }}
    />
    <span style={{ padding: '0 0.2em' }}>{denominator}</span>
  </span>
)
