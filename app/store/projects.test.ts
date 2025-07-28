// test/store/projects.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProjectStore } from '~/store/projects'
import type { Project } from '~/types/Project'

describe('Project Store', () => {
  let projectStore: ReturnType<typeof useProjectStore>

  // Set up Pinia and reset the store before each test to ensure isolation
  beforeEach(() => {
    setActivePinia(createPinia())
    projectStore = useProjectStore()
    // Reset the store to its initial state for each test
    projectStore.$reset()
  })

  // Test for initial state
  it('should have initial projects loaded', () => {
    expect(projectStore.allProjects).toHaveLength(3)
    expect(projectStore.allProjects?.[0]?.name).toBe('Work Tasks')
  })

  // Test for addProject action
  it('should add a new project', () => {
    const newProject: Project = { id: '4', name: 'New Home Project' }
    projectStore.addProject(newProject)
    expect(projectStore.allProjects).toHaveLength(4)
    expect(projectStore.allProjects).toContainEqual(newProject)
  })

  // Test for editProject action
  it('should edit an existing project', () => {
    const updatedProject: Project = { id: '1', name: 'Updated Work Tasks' }
    projectStore.editProject(updatedProject)
    const foundProject = projectStore.getProjectById('1')
    expect(foundProject?.name).toBe('Updated Work Tasks')
    expect(projectStore.allProjects).toHaveLength(3) // Length should remain the same
  })

  it('should not edit a project if ID does not exist', () => {
    const nonExistentProject: Project = { id: '99', name: 'Non Existent' }
    projectStore.editProject(nonExistentProject)
    expect(projectStore.getProjectById('99')).toBeUndefined()
    expect(projectStore.allProjects).toHaveLength(3) // Length should remain the same
  })

  // Test for deleteProject action
  it('should delete a project', () => {
    projectStore.deleteProject('2')
    expect(projectStore.allProjects).toHaveLength(2)
    expect(projectStore.getProjectById('2')).toBeUndefined()
  })

  it('should not delete a project if ID does not exist', () => {
    projectStore.deleteProject('99')
    expect(projectStore.allProjects).toHaveLength(3) // Length should remain the same
  })

  // Test for allProjects getter
  it('allProjects getter should return all projects', () => {
    const projects = projectStore.allProjects
    expect(projects).toHaveLength(3)
    expect(projects[0]).toEqual({ id: '1', name: 'Work Tasks' })
  })

  // Test for getProjectById getter
  it('getProjectById getter should return a project by ID', () => {
    const project = projectStore.getProjectById('1')
    expect(project).toEqual({ id: '1', name: 'Work Tasks' })
  })

  it('getProjectById getter should return undefined for non-existent ID', () => {
    const project = projectStore.getProjectById('non-existent-id')
    expect(project).toBeUndefined()
  })
})
