import type { ReactNode } from 'react'
import { interpolate, useCurrentFrame } from 'remotion'

import { useSpringIn } from '../../animations/useSpringIn'

type HighlightBoxProps = {
  readonly children: ReactNode
  readonly accentColor: string
  readonly delayInFrames: number
}

/**
 * 結論の式を囲む枠。出現後もゆっくり明滅させて視線を集める。
 */
export const HighlightBox: React.FC<HighlightBoxProps> = ({
  children,
  accentColor,
  delayInFrames,
}) => {
  const frame = useCurrentFrame()
  const progress = useSpringIn({ delayInFrames, damping: 16, stiffness: 90 })

  const scale = interpolate(progress, [0, 1], [0.86, 1])
  const glow = interpolate(
    Math.sin((frame - delayInFrames) / 9),
    [-1, 1],
    [24, 60],
  )

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
        alignSelf: 'flex-start',
        padding: '28px 44px',
        borderRadius: 20,
        border: `3px solid ${accentColor}`,
        boxShadow: `0 0 ${glow}px ${accentColor}55`,
      }}
    >
      {children}
    </div>
  )
}
