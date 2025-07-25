import type { TaskPriority } from './TaskPriority'

export type TaskFilterStatus = 'all' | 'active' | 'completed'

export type TaskFilterPriority = TaskPriority | 'all'

export type TaskSortBy = 'dueDate' | 'title'
