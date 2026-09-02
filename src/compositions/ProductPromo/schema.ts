import { zColor } from '@remotion/zod-types'
import { z } from 'zod'

export const featureSchema = z.object({
  label: z.string().min(1).max(40),
  description: z.string().max(90),
})

/**
 * ProductPromo の props。features の数に応じて尺が自動で伸びる。
 */
export const productPromoSchema = z.object({
  productName: z.string().min(1).max(40),
  tagline: z.string().max(80),
  accentColor: zColor(),
  features: z.array(featureSchema).min(1).max(6),
})

export type Feature = z.infer<typeof featureSchema>
export type ProductPromoProps = z.infer<typeof productPromoSchema>

export const productPromoDefaultProps: ProductPromoProps = {
  productName: 'Remotion Playground',
  tagline: 'コードで動画をつくる実験場',
  accentColor: '#a06bff',
  features: [
    { label: 'React で書く', description: 'コンポーネントがそのまま動画になる' },
    { label: 'データ駆動', description: 'props を差し替えるだけで量産できる' },
    { label: 'CI でレンダリング', description: 'CLI から mp4 を書き出せる' },
  ],
}
