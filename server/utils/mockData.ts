import { v4 as uuidv4 } from 'uuid'
import type { Project } from '~/types/Project'
import type { Task } from '~/types/Task'
const projectsDb = new Map<string, Project>()
const tasksDb = new Map<string, Task>()
const initialProjects: Project[] = [
  { id: '1', name: 'Work Tasks' },
  { id: '2', name: 'Personal Errands' },
  { id: '3', name: 'Study Goals' },
]
initialProjects.forEach(p => projectsDb.set(p.id, p))
const initialTasks: Task[] = [
  {
    uuid: uuidv4(),
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, fruits',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    priority: 'high',
    projectId: '1',
    completed: false,
  },
  {
    uuid: uuidv4(),
    title: 'Finish report',
    description: 'Complete the Q3 financial report',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    priority: 'medium',
    projectId: '1',
    completed: false,
  },
  {
    uuid: uuidv4(),
    title: 'Call mom',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    priority: 'low',
    projectId: '2',
    completed: true,
  },
  {
    uuid: uuidv4(),
    title: 'Learn Nuxt 3',
    description: 'Read documentation and build a small app',
    dueDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
    priority: 'high',
    projectId: '3',
    completed: false,
  },
]
initialTasks.forEach(t => tasksDb.set(t.uuid, t))
export const getProjects = (): Project[] => {
  return Array.from(projectsDb.values())
}

export const addProject = (project: Project): Project => {
  projectsDb.set(project.id, project)
  return project
}

export const updateProject = (id: string, updatedFields: Partial<Project>): Project | undefined => {
  const project = projectsDb.get(id)
  if (project) {
    Object.assign(project, updatedFields)
    projectsDb.set(id, project) // Ensure map is updated with modified object
    return project
  }
  return undefined
}

export const deleteProject = (id: string): boolean => {
  return projectsDb.delete(id)
}
export const getTasks = (projectId?: string): Task[] => {
  let tasks = Array.from(tasksDb.values())
  if (projectId) {
    tasks = tasks.filter(task => task.projectId === projectId)
  }
  return tasks
}

export const addTask = (task: Omit<Task, 'uuid'>): Task => {
  const newTask: Task = { uuid: uuidv4(), ...task }
  tasksDb.set(newTask.uuid, newTask)
  return newTask
}

export const updateTask = (uuid: string, updatedFields: Partial<Task>): Task | undefined => {
  const task = tasksDb.get(uuid)
  if (task) {
    Object.assign(task, updatedFields)
    tasksDb.set(uuid, task) // Ensure map is updated with modified object
    return task
  }
  return undefined
}

export const deleteTask = (uuid: string): boolean => {
  return tasksDb.delete(uuid)
}

export const deleteTasksByProjectId = (projectId: string): void => {
  tasksDb.forEach((task, uuid) => {
    if (task.projectId === projectId) {
      tasksDb.delete(uuid)
    }
  })
}
