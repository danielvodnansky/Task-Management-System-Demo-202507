## Objective

Build a **Task Management System** that supports:

- Project-based task grouping via dynamic routes
- Form validation using Zod
- Global state management with Pinia
- Styling with Tailwind CSS
- Full type-safety using TypeScript
- Unit tests using Vitest

The app must persist state across reloads (using localStorage or composables).

---

## Tech Stack Requirements

| Tool             | Purpose                     |
| ---------------- | --------------------------- |
| **Nuxt 3**       | Core application framework  |
| **TypeScript**   | Type safety                 |
| **Zod**          | Schema & runtime validation |
| **Pinia**        | State management            |
| **Tailwind CSS** | Utility-first CSS framework |
| **Vitest**       | Unit testing                |

You may use other utilities as needed, but the above are mandatory.

---

## Requirements

### Core Features

#### Tasks

- Add, edit, delete tasks
- Task properties:
  - `uuid`: UUID
  - `title`: required, 3–100 characters
  - `description`: optional, max 1000 characters
  - `dueDate`: ISO string, must be future date on creation
  - `priority`: `"low" | "medium" | "high"`
  - `projectId`: number
  - `completed`: boolean
- Use **Zod** for all form validation
- Show inline error messages

#### Projects

- Tasks are grouped by `projectId`
- Support project views via dynamic route: `/projects/[projectId]`

#### Filters & Sorting

- Filter tasks by:
  - Completion status (all, active, completed)
  - Priority level
- Sort tasks by due date or title

#### Persistence

- Persist tasks and projects in localStorage or cookies using Nuxt composables

---

### UI & UX

- Use **Tailwind CSS**
- Fully responsive (mobile, tablet, desktop)
- Create reusable components:
  - `TaskCard.vue`, `TaskForm.vue`, `ProjectHeader.vue`, etc.
- Use transitions or animations where appropriate
- Focus on accessibility and keyboard navigation

---

### Testing

Use **Vitest** to test:

- Zod schemas (valid and invalid inputs)
- Pinia stores (actions, getters, reactivity)
- Utility functions (e.g., filtering, sorting logic)
- Optional: Add component tests using Nuxt Test Utils

---

### Bonus (Optional)

- Drag-and-drop reordering of tasks
- Dark/light mode toggle
- Mock authentication middleware (e.g., block routes unless "logged in")
- Store data remotely using a mock backend (e.g., JSON Server or Nuxt server routes)
- Deploy to Netlify/Vercel with live demo

---
