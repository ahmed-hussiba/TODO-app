"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createTodo, deleteTodo, Todo, updateTodo } from "../lib/api";

export default function TodoForm({ todo }: { todo: Todo | null }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [status, setStatus] = useState<Todo["status"]>(
    todo?.status || "pending"
  );

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (todo) {
      await updateTodo(todo.id, { title, description, status });
    } else {
      await createTodo({ title, description, status });
    }

    router.push("/todos");
    router.refresh();
  }

  async function handleDelete() {
    if (todo) {
      await deleteTodo(todo.id);
      router.refresh();
      router.push("/todos");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full text-[var(--title)] rounded dark:bg-gray-800"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full text-[var(--title)] rounded dark:bg-gray-800"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Todo["status"])}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
        >
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🚧 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

      <div className="flex gap-2 flex justify-center">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:opacity-60 transition"
          type="submit"
        >
          Save
        </button>
        {todo && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
