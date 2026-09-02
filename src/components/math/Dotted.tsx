type DottedProps = {
  readonly symbol: string
  /** 記号の上に打つドットの数。1 なら 1 階微分、2 なら 2 階微分。 */
  readonly count: 1 | 2
}

/**
 * ニュートン記法（x の上のドット）。
 * 合成済み Unicode 文字はフォント依存で欠けることがあるため、自前で重ねる。
 */
export const Dotted: React.FC<DottedProps> = ({ symbol, count }) => (
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {symbol}
    <span
      style={{
        position: 'absolute',
        top: '-0.38em',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.12em',
        fontStyle: 'normal',
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          style={{
            width: '0.13em',
            height: '0.13em',
            borderRadius: '50%',
            background: 'currentColor',
          }}
        />
      ))}
    </span>
  </span>
)
