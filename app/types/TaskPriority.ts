import { z } from 'zod'

export const TaskPrioritySchema = z.enum([
  'low',
  'medium',
  'high',
])
export type TaskPriority = z.infer<typeof TaskPrioritySchema>
