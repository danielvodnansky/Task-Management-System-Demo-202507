import { describe, it, expect } from 'vitest'
import { TaskFormSchema } from '~/types/TaskForm'
import { format, addDays, subDays } from 'date-fns'

describe('TaskFormSchema', () => {
  const today = new Date()
  const tomorrow = addDays(today, 1)
  const yesterday = subDays(today, 1)

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')

  const baseValidTask = {
    title: 'Valid Task Title',
    description: 'This is a valid description.',
    dueDate: formatDate(tomorrow),
    priority: 'medium',
    projectId: 'project-123',
    completed: false,
  }

  it('should validate a valid task form data', () => {
    expect(() => TaskFormSchema.parse(baseValidTask)).not.toThrow()
    expect(TaskFormSchema.parse(baseValidTask)).toEqual(baseValidTask)
  })

  it('should validate a task form data with a UUID', () => {
    const taskWithUuid = {
      ...baseValidTask,
      uuid: 'some-task-uuid-456',
    }
    expect(() => TaskFormSchema.parse(taskWithUuid)).not.toThrow()
    expect(TaskFormSchema.parse(taskWithUuid)).toEqual(taskWithUuid)
  })

  it('should invalidate task data with a title shorter than 3 characters', () => {
    const invalidTask = { ...baseValidTask, title: 'ab' }
    expect(() => TaskFormSchema.parse(invalidTask)).toThrow('Title must be at least 3 characters')
  })

  it('should invalidate task data with a title longer than 100 characters', () => {
    const invalidTask = { ...baseValidTask, title: 'a'.repeat(101) }
    expect(() => TaskFormSchema.parse(invalidTask)).toThrow('Title must be at most 100 characters')
  })

  it('should invalidate task data with a description longer than 1000 characters', () => {
    const invalidTask = { ...baseValidTask, description: 'a'.repeat(1001) }
    expect(() => TaskFormSchema.parse(invalidTask)).toThrow('Description must be at most 1000 characters')
  })

  it('should invalidate task data with an invalid due date format', () => {
    const invalidTask = { ...baseValidTask, dueDate: 'not-a-date' }
    expect(() => TaskFormSchema.parse(invalidTask)).toThrow('Invalid date format')
  })

  it('should invalidate task data with a due date in the past', () => {
    const invalidTask = { ...baseValidTask, dueDate: formatDate(yesterday) }
    expect(() => TaskFormSchema.parse(invalidTask)).toThrow('Due date must be today or in the future')
  })

  it('should validate task data with a due date of today', () => {
    const validTask = { ...baseValidTask, dueDate: formatDate(today) }
    expect(() => TaskFormSchema.parse(validTask)).not.toThrow()
  })
})
