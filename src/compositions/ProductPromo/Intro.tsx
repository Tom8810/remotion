import { Center } from '../../components/Center'
import { useFadeInUp } from '../../animations/useFadeInUp'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'

type IntroProps = {
  readonly productName: string
  readonly tagline: string
  readonly accentColor: string
}

export const Intro: React.FC<IntroProps> = ({
  productName,
  tagline,
  accentColor,
}) => {
  const nameAnimation = useFadeInUp()
  const taglineAnimation = useFadeInUp({ delayInFrames: 10, distance: 30 })

  return (
    <Center gap={24}>
      <h1
        style={{
          ...nameAnimation,
          margin: 0,
          fontFamily,
          fontSize: fontSize.hero,
          fontWeight: fontWeight.black,
          letterSpacing: -4,
          color: colors.text,
          textShadow: `0 0 100px ${accentColor}`,
        }}
      >
        {productName}
      </h1>
      <p
        style={{
          ...taglineAnimation,
          margin: 0,
          fontFamily,
          fontSize: fontSize.subtitle,
          fontWeight: fontWeight.medium,
          color: colors.textMuted,
        }}
      >
        {tagline}
      </p>
    </Center>
  )
}
