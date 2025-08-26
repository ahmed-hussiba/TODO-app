import TodoForm from "../../../../components/TodoForm";
import { fetchTodoById } from "../../../../lib/api";

type Props = {
  params: { id: string };
};

export default async function TodoDetailPage({ params }: Props) {
  const { id } = await params;
  const todo = id !== "new" ? await fetchTodoById(id) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 w-full max-w-lg p-4">
        <h1 className="text-2xl font-bold">
          {todo ? "Edit Task" : "New Task"}
        </h1>
        <TodoForm todo={todo} />
      </div>
    </div>
  );
}
