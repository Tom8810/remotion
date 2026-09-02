import { Center } from '../../components/Center'
import { GradientBackground } from '../../components/GradientBackground'
import { Stage } from '../../components/Stage'
import { Subtitle } from './Subtitle'
import { Title } from './Title'
import type { HelloWorldProps } from './schema'

/**
 * タイトルとサブタイトルが順に出て、最後にフェードアウトする最小構成の例。
 */
export const HelloWorld: React.FC<HelloWorldProps> = ({
  title,
  subtitle,
  accentColor,
}) => {
  return (
    <Stage>
      <GradientBackground />
      <Center gap={32}>
        <Title text={title} accentColor={accentColor} />
        <Subtitle text={subtitle} delayInFrames={12} />
      </Center>
    </Stage>
  )
}
