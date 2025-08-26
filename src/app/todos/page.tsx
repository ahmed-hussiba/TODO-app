"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo, Todo } from "../../../lib/api";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  async function handleDelete(id: number) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") return 1;
    if (a.status !== "completed" && b.status === "completed") return -1;
    return 0;
  });

  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-2xl font-semibold mb-2">No tasks yet</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Start adding your first Task!
        </p>
        <Link
          href="/todos/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add Task
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      <div className="space-y-4">
        {sortedTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg text-[var(--title)] mb-2">
                {todo.title}
              </h3>
              <p className="text-sm text-[var(--title)]/80">
                {todo.description}
              </p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded-full
                  ${
                    todo.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : todo.status === "in-progress"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                  }`}
              >
                {todo.status === "completed"
                  ? "✅ Completed"
                  : todo.status === "in-progress"
                  ? "🚧 In Progress"
                  : "⏳ Pending"}
              </span>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/todos/${todo.id}`}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/todos/new"
        className="fixed bottom-6 right-6 px-6 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800 transition text-xl"
      >
        +
      </Link>
    </div>
  );
}
