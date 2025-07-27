import { describe, it, expect } from 'vitest'
import { ProjectFormSchema } from '~/types/ProjectForm'

describe('ProjectFormSchema', () => {
  it('should validate a valid project form data', () => {
    const validProject = {
      name: 'New Project Name',
    }
    expect(() => ProjectFormSchema.parse(validProject)).not.toThrow()
    expect(ProjectFormSchema.parse(validProject)).toEqual(validProject)
  })

  it('should validate a valid project form data with an ID', () => {
    const validProjectWithId = {
      id: 'some-uuid-123',
      name: 'Existing Project',
    }
    expect(() => ProjectFormSchema.parse(validProjectWithId)).not.toThrow()
    expect(ProjectFormSchema.parse(validProjectWithId)).toEqual(validProjectWithId)
  })

  it('should invalidate project data with a name shorter than 3 characters', () => {
    const invalidProject = {
      name: 'ab',
    }
    expect(() => ProjectFormSchema.parse(invalidProject)).toThrow('Project name must be at least 3 characters')
  })

  it('should invalidate project data with a name longer than 100 characters', () => {
    const invalidProject = {
      name: 'a'.repeat(101),
    }
    expect(() => ProjectFormSchema.parse(invalidProject)).toThrow('Project name must be at most 100 characters')
  })
})
