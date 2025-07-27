// Simple color mapping for demonstration, you might want a more robust system
const projectColors: { [key: string]: string } = {
  1: '#60A5FA', // blue-400
  2: '#34D399', // green-400
  3: '#A78BFA', // purple-400
  4: '#FA709A', // pink-400
  5: '#FACC15', // yellow-400
  6: '#6366F1', // indigo-400
  7: '#F43F5E', // red-400
  // just example, can be auto generated for more

}

/**
 * Returns a color string for a given project ID.
 * Defaults to a gray color if the project ID is not explicitly mapped.
 * @param projectId The ID of the project.
 * @returns A CSS color string (e.g., '#60A5FA').
 */
export const getProjectColor = (projectId: string): string => {
  return projectColors[projectId] || '#9CA3AF' // Default to gray-400
}
