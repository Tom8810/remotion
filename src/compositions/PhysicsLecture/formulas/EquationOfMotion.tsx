import { Dotted } from '../../../components/math/Dotted'
import { MathRow } from '../../../components/math/MathRow'

type EquationOfMotionProps = {
  readonly fontSize: number
}

/** 運動方程式 m ẍ = −kx − mg */
export const EquationOfMotion: React.FC<EquationOfMotionProps> = ({
  fontSize,
}) => (
  <MathRow fontSize={fontSize}>
    m
    <Dotted symbol="x" count={2} />
    <span style={{ margin: '0 0.3em', fontStyle: 'normal' }}>=</span>
    −kx − mg
  </MathRow>
)
