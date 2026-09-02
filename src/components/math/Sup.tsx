type SupProps = {
  readonly children: string
}

/** 指数などの上付き文字。vertical-align はフォント差が出るので相対位置で組む。 */
export const Sup: React.FC<SupProps> = ({ children }) => (
  <span
    style={{
      position: 'relative',
      top: '-0.46em',
      fontSize: '0.56em',
      fontStyle: 'normal',
      marginLeft: '0.04em',
    }}
  >
    {children}
  </span>
)
