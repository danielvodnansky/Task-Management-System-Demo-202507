import { addProject } from '../../utils/mockData'
import { v4 as uuidv4 } from 'uuid' // For generating new IDs on the server

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newProject = { id: uuidv4(), name: body.name }
  addProject(newProject)
  return newProject
})
