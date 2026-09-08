import { Chip } from './Chip'

type ToolChipsProps = {
  readonly names: readonly string[]
  readonly delayInFrames?: number
  /** チップ 1 つあたりの点灯間隔。 */
  readonly staggerInFrames?: number
}

/**
 * MCP でつながる AI ツールのチップ列。絵コンテの指定どおり答えの後に点灯する。
 */
export const ToolChips: React.FC<ToolChipsProps> = ({
  names,
  delayInFrames = 0,
  staggerInFrames = 4,
}) => (
  <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
    {names.map((name, index) => (
      <Chip key={name} delayInFrames={delayInFrames + index * staggerInFrames}>
        {name}
      </Chip>
    ))}
  </div>
)
