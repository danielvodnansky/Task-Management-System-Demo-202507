import { z } from 'zod'
import { TaskPrioritySchema } from './TaskPriority'

// Zod schema for task form validation
export const TaskFormSchema = z.object({
  uuid: z.string().optional(), // UUID is optional for new tasks, required for existing
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be at most 100 characters'),
  description: z.string().max(1000, 'Description must be at most 1000 characters').optional().or(z.literal('')),
  dueDate: z.string().refine((val) => {
    const date = new Date(val)
    return !isNaN(date.getTime())
  }, 'Invalid date format').refine((val) => {
    // For new tasks, dueDate must be in the future. For existing tasks, it can be past.
    // This logic might need refinement based on exact edit requirements.
    return new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)) // Must be today or future
  }, 'Due date must be today or in the future'),
  priority: TaskPrioritySchema,
  projectId: z.string(),
  completed: z.boolean().optional(), // Completed is optional for form, handled by store
})

// TypeScript type inferred from the Zod schema
export type TaskForm = z.infer<typeof TaskFormSchema>
