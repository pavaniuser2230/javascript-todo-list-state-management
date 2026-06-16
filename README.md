# JavaScript Logic & State Management - To-Do List Application

## Overview

This project is a fully interactive client-side To-Do List application developed using Vanilla JavaScript. It demonstrates core JavaScript concepts including DOM manipulation, event handling, state management, Local Storage persistence, and dynamic UI updates.

The application allows users to create, update, delete, and manage tasks efficiently while automatically saving data in the browser using `window.localStorage`.

---

## Features

### Full CRUD Operations

* Create new tasks
* Read and display existing tasks
* Update task content
* Delete individual tasks

### Task Status Management

* Mark tasks as completed
* Toggle tasks between active and completed states

### Advanced Filtering

* View All Tasks
* View Active Tasks
* View Completed Tasks

### Local Storage Persistence

* Automatically saves tasks in browser storage
* Restores task data after page refresh or browser restart

### Dynamic DOM Manipulation

* Create task elements dynamically
* Update UI without page reloads
* Real-time task rendering

### Event Delegation

* Efficient event handling
* Reduced memory usage
* Improved scalability for dynamic elements

### Responsive Design

* Mobile-friendly interface
* Tablet and desktop compatibility
* Clean and intuitive user experience

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Local Storage API

---

## Project Structure

```
todo-app/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
└── README.md
```

---

## Core JavaScript Concepts Implemented

### State Management

Tasks are maintained in a centralized JavaScript array and synchronized with Local Storage.

### DOM Manipulation

* createElement()
* appendChild()
* innerHTML
* querySelector()
* querySelectorAll()

### Event Handling

* Click Events
* Input Events
* Event Delegation using addEventListener()

### Local Storage

```javascript
localStorage.setItem("tasks", JSON.stringify(tasks));
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
```

---

## Application Workflow

1. User creates a task
2. Task is added to application state
3. Task is stored in Local Storage
4. UI updates dynamically
5. User can edit, complete, filter, or delete tasks
6. Changes are automatically persisted

---

## Learning Outcomes

Through this project, I gained practical experience in:

* JavaScript Fundamentals
* DOM Manipulation
* Event Delegation
* State Management
* Local Storage API
* CRUD Operations
* Responsive Web Development
* Dynamic User Interface Design

---

## How to Run

### Clone Repository

```bash
git clone https://github.com/your-username/javascript-todo-list-state-management.git
```

### Open Project

```bash
cd javascript-todo-list-state-management
```

### Launch

Open `index.html` in any modern web browser.

---

## Future Improvements

* Drag-and-drop task sorting
* Due date functionality
* Dark/Light theme toggle
* Search tasks
* Task categories and tags
* Export and import task data

---

## Author

Pavani

B.Tech - Artificial Intelligence & Machine Learning

Web Development Internship Assignment – Thirane Technologies

---

## License

This project is developed for educational and internship evaluation purposes.
# To-Do List — Client-side app

Simple, state-driven To-Do list demonstrating DOM manipulation, event delegation, and `localStorage` persistence.

Files created:
- `index.html` — main page
- `styles.css` — styling
- `app.js` — application logic and persistence

How to run:
1. Open `index.html` in your browser.
2. Add tasks, edit, mark complete, filter (All / Active / Completed).
3. Data persists automatically in `window.localStorage`.
