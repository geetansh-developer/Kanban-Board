# Kanban Board Application

This project is a React-based Kanban board application that allows users to create, update, and move tasks across different columns using drag-and-drop functionality. It features a clean and intuitive user interface designed to enhance productivity and task management.

## Features

-   **Drag & Drop Functionality:** Seamlessly move tasks between columns (To Do, In Progress, Completed) using drag-and-drop.
-   **Task Management:** Add, edit, and delete tasks with a user-friendly modal interface.
-   **Persistent Data:** Tasks are stored in Local Storage, ensuring data persistence across browser refreshes.
-   **Smooth Animations:** Utilizes `framer-motion` for smooth task transitions and an enhanced user experience.
-   **Responsive Design:** The application is fully responsive, providing a consistent experience across various screen sizes.
-   **Clean UI:** Follows a modern and attractive design inspired by the provided Figma design.
-   **Header Component:** Includes a header with logo, user profile, and notification icons.

## Technologies Used

-   **React:** For building the user interface.
-   **React DnD (react-dnd):** For implementing drag-and-drop functionality.
-   **React DnD HTML5 Backend (react-dnd-html5-backend):** For HTML5 drag-and-drop support.
-   **Framer Motion (framer-motion):** For smooth animations.
-   **Lucide React (lucide-react):** For icons.
-   **Local Storage:** For persistent data storage.
-   **CSS:** For styling and layout.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd [repository-directory]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    ```

4.  **Open the application in your browser:**

    Visit `http://localhost:3000` to view the application.

## Usage

-   **Adding Tasks:** Click the "Add Task +" button to open the modal. Enter the task title and description, then click "Add Task".
-   **Editing Tasks:** Click on a task to open the modal for editing. Modify the task title and description, then click "Save Task".
-   **Moving Tasks:** Drag and drop tasks between the "To Do", "In Progress", and "Completed" columns.
-   **Viewing Tasks:** Tasks are displayed in their respective columns, with titles and descriptions visible.

## File Structure
