import { z } from 'zod'

export const ProjectFormSchema = z.object({
  id: z.string().optional(), name: z.string().min(3, 'Project name must be at least 3 characters').max(100, 'Project name must be at most 100 characters'),
})

export type ProjectForm = z.infer<typeof ProjectFormSchema>
