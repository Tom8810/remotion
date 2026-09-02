import { AbsoluteFill } from 'remotion'

import { useFadeInUp } from '../../animations/useFadeInUp'
import { GradientBackground } from '../../components/GradientBackground'
import { Stage } from '../../components/Stage'
import { fontSize } from '../../theme/typography'
import { CourseBadge } from './CourseBadge'
import { HighlightBox } from './HighlightBox'
import { SpringMass } from './SpringMass'
import { TitleBar } from './TitleBar'
import { CUES } from './timing'
import { EnergyConservation } from './formulas/EnergyConservation'
import { EquationOfMotion } from './formulas/EquationOfMotion'
import { TransformNote } from './formulas/TransformNote'
import type { PhysicsLectureProps } from './schema'

/**
 * 単振動の力学的エネルギー保存則を 5 秒で見せる導入カット。
 * 左でばね振り子が実際に振動し、右で運動方程式から保存則まで式が展開される。
 */
export const PhysicsLecture: React.FC<PhysicsLectureProps> = ({
  title,
  courseLabel,
  courseSubLabel,
  accentColor,
  highlightColor,
}) => {
  const equationAnimation = useFadeInUp({
    delayInFrames: CUES.equationOfMotion,
    distance: 30,
  })
  const noteAnimation = useFadeInUp({
    delayInFrames: CUES.transformNote,
    distance: 20,
  })

  return (
    <Stage fadeOutInFrames={18}>
      <GradientBackground rotationPerFrame={0.06} />

      <AbsoluteFill
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0 110px',
          gap: 60,
        }}
      >
        <SpringMass accentColor={accentColor} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 34,
          }}
        >
          <TitleBar
            title={title}
            accentColor={accentColor}
            underlineStartFrame={CUES.underline}
          />

          <div style={equationAnimation}>
            <EquationOfMotion fontSize={fontSize.subtitle} />
          </div>

          <div style={noteAnimation}>
            <TransformNote
              fontSize={fontSize.body}
              accentColor={accentColor}
            />
          </div>

          <HighlightBox
            accentColor={highlightColor}
            delayInFrames={CUES.energyConservation}
          >
            <EnergyConservation
              fontSize={fontSize.subtitle}
              color={highlightColor}
            />
          </HighlightBox>

          <CourseBadge
            label={courseLabel}
            subLabel={courseSubLabel}
            accentColor={accentColor}
            delayInFrames={CUES.courseBadge}
          />
        </div>
      </AbsoluteFill>
    </Stage>
  )
}
