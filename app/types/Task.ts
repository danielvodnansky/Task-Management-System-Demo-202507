import type { TaskPriority } from './TaskPriority'

export interface Task {
  uuid: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  projectId: string;
  completed: boolean;
}
