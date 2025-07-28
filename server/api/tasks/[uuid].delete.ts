import { deleteTask } from '../../utils/mockData'

export default defineEventHandler((event) => {
  const uuid = event.context.params?.uuid as string
  const taskDeleted = deleteTask(uuid)
  if (!taskDeleted) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }
  return { message: `Task ${uuid} deleted` }
})
