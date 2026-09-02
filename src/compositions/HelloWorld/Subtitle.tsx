import { useFadeInUp } from '../../animations/useFadeInUp'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'

type SubtitleProps = {
  readonly text: string
  readonly delayInFrames?: number
}

export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  delayInFrames = 0,
}) => {
  const animation = useFadeInUp({ delayInFrames, distance: 30 })

  return (
    <p
      style={{
        ...animation,
        margin: 0,
        fontFamily,
        fontSize: fontSize.subtitle,
        fontWeight: fontWeight.medium,
        textAlign: 'center',
        color: colors.textMuted,
      }}
    >
      {text}
    </p>
  )
}
