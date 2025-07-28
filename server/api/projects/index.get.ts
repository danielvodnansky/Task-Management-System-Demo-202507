import { getProjects } from '../../utils/mockData'

export default defineEventHandler(() => {
  return getProjects()
})
