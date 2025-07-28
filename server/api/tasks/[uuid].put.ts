import { updateTask } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid as string
  const body = await readBody(event)
  const updatedTask = updateTask(uuid, body)
  if (!updatedTask) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }
  return updatedTask
})
