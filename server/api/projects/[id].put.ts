import { updateProject } from '../../utils/mockData'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string
  const body = await readBody(event)
  const updatedProject = updateProject(id, body)
  if (!updatedProject) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  return updatedProject
})
