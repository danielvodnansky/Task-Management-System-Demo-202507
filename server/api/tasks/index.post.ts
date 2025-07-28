import { addTask } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newTask = addTask(body)
  return newTask
})
