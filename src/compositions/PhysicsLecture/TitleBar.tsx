import { interpolate, useCurrentFrame } from 'remotion'

import { useFadeInUp } from '../../animations/useFadeInUp'
import { colors } from '../../theme/colors'
import { fontFamily, fontSize, fontWeight } from '../../theme/typography'

type TitleBarProps = {
  readonly title: string
  readonly accentColor: string
  readonly underlineStartFrame: number
}

/**
 * タイトルと、板書のように引かれるアンダーライン。
 */
export const TitleBar: React.FC<TitleBarProps> = ({
  title,
  accentColor,
  underlineStartFrame,
}) => {
  const frame = useCurrentFrame()
  const animation = useFadeInUp({ distance: 40 })

  const underlineScale = interpolate(
    frame,
    [underlineStartFrame, underlineStartFrame + 18],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  return (
    <div
      style={{
        ...animation,
        display: 'inline-flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily,
          fontSize: fontSize.heading,
          fontWeight: fontWeight.black,
          letterSpacing: -2,
          whiteSpace: 'nowrap',
          color: colors.text,
        }}
      >
        {title}
      </h1>
      <span
        style={{
          marginTop: 14,
          height: 8,
          borderRadius: 4,
          background: accentColor,
          transform: `scaleX(${underlineScale})`,
          transformOrigin: 'left center',
        }}
      />
    </div>
  )
}
