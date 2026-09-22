# Todo App

A full-stack todo application with a React (Vite) frontend and an Express/MongoDB backend, supporting filtering todos by completion status.

## Features

- Create, view, and manage todos
- Filter todos by status: All / Active / Done
- Server-side filtering via query parameters

## Tech Stack

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose)



## API

### `GET /api/todos`
Returns all todos.

### `GET /api/todos?done=true`
Returns only completed todos.

### `GET /api/todos?done=false`
Returns only pending (not done) todos.

## Recent Changes: Filtering Feature

**Backend (`todoController.js`)**
- `getTodos` now reads the `done` query parameter from `req.query`.
- Builds a `filter` object conditionally: `{ done: true|false }` if `done` is provided, otherwise `{}` so all todos are returned unchanged.
- Passes `filter` into `Todo.find(filter)` instead of the unfiltered `Todo.find()`.

**Frontend**
- `api/todos.js`: `fetchTodos` now accepts an optional filter and passes it via axios `params` (e.g. `api.get('/', { params: { done } })`).
- `App.jsx`: added filter state (`all`, `active`, `done`); re-fetches todos in a `useEffect` whenever the filter changes.
- Added All / Active / Done tabs to switch between views.

**Design note:** Filtering is implemented server-side (re-fetching with a query param) rather than client-side, so the payload scales better as the todo list grows and the client stays in sync with the database. The trade-off is an extra network request per filter change, versus instant filtering if the full list were already cached in memory.

---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
