import { useFadeInUp } from '../../animations/useFadeInUp'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'

type TitleProps = {
  readonly text: string
  readonly accentColor: string
  readonly delayInFrames?: number
}

export const Title: React.FC<TitleProps> = ({
  text,
  accentColor,
  delayInFrames = 0,
}) => {
  const animation = useFadeInUp({ delayInFrames })

  return (
    <h1
      style={{
        ...animation,
        margin: 0,
        fontFamily,
        fontSize: fontSize.hero,
        fontWeight: fontWeight.black,
        letterSpacing: -4,
        textAlign: 'center',
        color: colors.text,
        textShadow: `0 0 80px ${accentColor}`,
      }}
    >
      {text}
    </h1>
  )
}
