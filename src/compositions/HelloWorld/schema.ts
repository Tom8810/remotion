import { zColor } from '@remotion/zod-types'
import { z } from 'zod'

/**
 * HelloWorld コンポジションの props。
 * Remotion Studio の右ペインからこのスキーマ通りに GUI 編集できる。
 */
export const helloWorldSchema = z.object({
  title: z.string().min(1).max(60),
  subtitle: z.string().max(120),
  accentColor: zColor(),
})

export type HelloWorldProps = z.infer<typeof helloWorldSchema>

export const helloWorldDefaultProps: HelloWorldProps = {
  title: 'Hello, Remotion',
  subtitle: 'React で動画をつくる',
  accentColor: '#5b8cff',
}
