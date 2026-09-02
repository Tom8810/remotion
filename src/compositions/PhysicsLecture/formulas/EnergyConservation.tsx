import { Fraction } from '../../../components/math/Fraction'
import { MathRow } from '../../../components/math/MathRow'
import { Sup } from '../../../components/math/Sup'
import { fontFamily } from '../../../theme/typography'

type EnergyConservationProps = {
  readonly fontSize: number
  readonly color: string
}

/** 結論： ½mv² + ½kx² + mgx = 一定 */
export const EnergyConservation: React.FC<EnergyConservationProps> = ({
  fontSize,
  color,
}) => (
  <MathRow fontSize={fontSize} color={color}>
    <Fraction numerator="1" denominator="2" color={color} />
    mv
    <Sup>2</Sup>
    <span style={{ margin: '0 0.24em', fontStyle: 'normal' }}>+</span>
    <Fraction numerator="1" denominator="2" color={color} />
    kx
    <Sup>2</Sup>
    <span style={{ margin: '0 0.24em', fontStyle: 'normal' }}>+</span>
    mgx
    <span style={{ margin: '0 0.3em', fontStyle: 'normal' }}>=</span>
    <span style={{ fontFamily, fontStyle: 'normal' }}>一定</span>
  </MathRow>
)
