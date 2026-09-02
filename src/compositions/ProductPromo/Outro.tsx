import { interpolate } from 'remotion'

import { Center } from '../../components/Center'
import { useSpringIn } from '../../animations/useSpringIn'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'

type OutroProps = {
  readonly productName: string
  readonly accentColor: string
}

export const Outro: React.FC<OutroProps> = ({ productName, accentColor }) => {
  const progress = useSpringIn({ damping: 14 })
  const scale = interpolate(progress, [0, 1], [0.6, 1])

  return (
    <Center>
      <div
        style={{
          opacity: progress,
          transform: `scale(${scale})`,
          padding: '40px 80px',
          borderRadius: 999,
          border: `4px solid ${accentColor}`,
          fontFamily,
          fontSize: fontSize.title,
          fontWeight: fontWeight.bold,
          color: colors.text,
        }}
      >
        {productName}
      </div>
    </Center>
  )
}
