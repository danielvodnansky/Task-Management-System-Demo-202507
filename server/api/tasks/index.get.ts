import { getTasks } from '../../utils/mockData'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const projectId = query.projectId as string | undefined // Allow filtering by projectId
  return getTasks(projectId)
})
