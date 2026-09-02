import { Series } from 'remotion'

import { Center } from '../../components/Center'
import { GradientBackground } from '../../components/GradientBackground'
import { Stage } from '../../components/Stage'
import { FeatureCard } from './FeatureCard'
import { Intro } from './Intro'
import { Outro } from './Outro'
import type { ProductPromoProps } from './schema'
import { FEATURE_DURATION, INTRO_DURATION, OUTRO_DURATION } from './timing'

/**
 * Series でシーンを順に並べる例。features の要素数だけシーンが増える。
 */
export const ProductPromo: React.FC<ProductPromoProps> = ({
  productName,
  tagline,
  accentColor,
  features,
}) => {
  return (
    <Stage>
      <GradientBackground rotationPerFrame={0.08} />
      <Series>
        <Series.Sequence durationInFrames={INTRO_DURATION}>
          <Intro
            productName={productName}
            tagline={tagline}
            accentColor={accentColor}
          />
        </Series.Sequence>

        {features.map((feature, index) => (
          <Series.Sequence
            key={feature.label}
            durationInFrames={FEATURE_DURATION}
          >
            <Center>
              <FeatureCard
                feature={feature}
                index={index}
                accentColor={accentColor}
              />
            </Center>
          </Series.Sequence>
        ))}

        <Series.Sequence durationInFrames={OUTRO_DURATION}>
          <Outro productName={productName} accentColor={accentColor} />
        </Series.Sequence>
      </Series>
    </Stage>
  )
}
