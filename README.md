# Task Management System

This is a simple, yet effective, Task Management System built with Nuxt 4 and Pinia. It allows users to organize their tasks into projects, set due dates and priorities, and track completion status. The application features a clean, responsive user interface with light/dark mode support and a mock backend for data persistence.

## 🚀 Features

* **Task Management**: Add, edit, delete, and toggle completion status for tasks.

* **Project Organization**: Group tasks under different projects.

* **Filtering & Sorting**: Filter tasks by status (active/completed) and priority (low, medium, high). Sort tasks by due date or title.

* **Project-Specific Views**: View tasks associated with a particular project.

* **Dynamic Project List**: Projects are dynamically loaded and displayed in the navigation.

* **Responsive Design**: Optimized for various screen sizes (mobile, tablet, desktop).

* **Light/Dark Mode**: Toggle between light and dark themes for improved user experience.

* **Mock Authentication**: Simple "login" and "logout" functionality to protect routes.

* **Mock Backend Integration**: Data operations (CRUD) are simulated using server API endpoints in Nuxt, providing a realistic development experience without a full database.

## 🛠️ Technologies Used

* **Nuxt 3**: The intuitive Vue framework for building web applications.

* **Vue 3**: Progressive JavaScript framework for building user interfaces.

* **Pinia**: A lightweight and powerful state management library for Vue.js.

* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

* **Zod**: TypeScript-first schema declaration and validation library for robust form validation.

* **date-fns**: A modern JavaScript date utility library.

* **Vitest**: A blazing fast unit test framework powered by Vite.

* **@nuxtjs/color-mode**: Nuxt module for easy light/dark mode implementation.

## 📦 Installation & Local Development

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/danielvodnansky/Task-Management-System-Demo-202507
    cd Task-Management-System-Demo-202507
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    yarn dev
    ```

    The application will be accessible at `http://localhost:3000`.

## ⚙️ Mock Backend

This application utilizes a **mock backend** implemented directly within the Nuxt server API routes. This mock backend stores data in memory and resets whenever the Nuxt development server is restarted.

The code for the server-side mock is located in the `server/` directory. If you are looking for the version of the application with the mock backend implementation, it is available in the `mock-be-store-server` branch.

## 🌐 Deployment

This application is deployed and publicly accessible on Netlify:

**Live Demo:** <https://stunning-douhua-95a686.netlify.app/>

## 🧪 Testing

Unit tests are set up using Vitest and `@nuxt/test-utils`. To run the tests:

```bash
yarn test
# or npm test
