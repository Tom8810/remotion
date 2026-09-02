import { zColor } from '@remotion/zod-types'
import { z } from 'zod'

/**
 * 物理講義の導入カット用 props。
 */
export const physicsLectureSchema = z.object({
  title: z.string().min(1).max(40),
  courseLabel: z.string().max(20),
  courseSubLabel: z.string().max(30),
  accentColor: zColor(),
  highlightColor: zColor(),
})

export type PhysicsLectureProps = z.infer<typeof physicsLectureSchema>

export const physicsLectureDefaultProps: PhysicsLectureProps = {
  title: '単振動の力学的エネルギー保存則',
  courseLabel: '力学',
  courseSubLabel: '徹底基礎講座',
  accentColor: '#5b8cff',
  highlightColor: '#ffd76b',
}
