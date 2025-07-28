import { describe, it, expect } from 'vitest'
import { getProjectColor } from '~/utils/projectColors' // Import the utility function

describe('getProjectColor', () => {
  it('should return the correct color for known project IDs', () => {
    expect(getProjectColor('1')).toBe('#60A5FA') // Corresponds to 'blue-400'
    expect(getProjectColor('2')).toBe('#34D399') // Corresponds to 'green-400'
    expect(getProjectColor('3')).toBe('#A78BFA') // Corresponds to 'purple-400'
  })

  it('should handle null or undefined project IDs gracefully (returning default)', () => {
    expect(getProjectColor(null as any)).toBe('#9CA3AF')
    expect(getProjectColor(undefined as any)).toBe('#9CA3AF')
  })
})
