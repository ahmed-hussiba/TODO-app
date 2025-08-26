export type Todo = {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
};
const BASE_URL = "https://68ad4eeda0b85b2f2cf2c98d.mockapi.io/todos/tasks";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function fetchTodoById(id: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Todo not found");
  return res.json();
}

export async function createTodo(todo: Omit<Todo, "id">) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(id: number, updated: Partial<Todo>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return true;
}
