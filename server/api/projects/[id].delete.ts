import { deleteProject, deleteTasksByProjectId } from '../../utils/mockData'

export default defineEventHandler((event) => {
  const id = event.context.params?.id as string
  const projectDeleted = deleteProject(id)
  if (!projectDeleted) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  deleteTasksByProjectId(id)
  return { message: `Project ${id} and its tasks deleted` }
})
