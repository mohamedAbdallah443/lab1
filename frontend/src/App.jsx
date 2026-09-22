// App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './api/todos';
import './todo.css';

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Possible values: all, active, done
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);

    fetchTodos(filter)
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [filter]);

  const handleAdd = async (title) => {
    const newTodo = await createTodo(title);

    // A new todo is normally active, so do not display it
    // immediately when the current filter is "done".
    if (filter !== 'done') {
      setTodos((currentTodos) => [newTodo, ...currentTodos]);
    }
  };

  const handleToggle = async (id, done) => {
    await updateTodo(id, { done: !done });

    // Reload the current filtered list. This is important because
    // a todo may need to disappear from the current filter.
    const data = await fetchTodos(filter);
    setTodos(data);
  };

  const handleRename = async (id, title) => {
    const updated = await updateTodo(id, { title });

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo._id === id ? updated : todo
      )
    );
  };

  const handleRemove = async (id) => {
    await deleteTodo(id);

    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo._id !== id)
    );
  };

  return (
    <div className="receipt-page">
      <div className="receipt">
        <header className="receipt-header">
          <span className="stamp">Tasks</span>
          <p className="receipt-date">{today}</p>
        </header>

        <div className="filter-buttons">
          <button
            type="button"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>

          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>

          <button
            type="button"
            className={filter === 'done' ? 'selected' : ''}
            onClick={() => setFilter('done')}
          >
            Done
          </button>
        </div>

        <TodoForm onAdd={handleAdd} />

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
