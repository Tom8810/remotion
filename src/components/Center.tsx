import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill } from 'remotion'

type CenterProps = {
  readonly children: ReactNode
  readonly gap?: number
  readonly style?: CSSProperties
}

/**
 * 子要素を縦横中央に積むレイアウト。
 */
export const Center: React.FC<CenterProps> = ({ children, gap = 0, style }) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
)
