import { TaskManager } from "@/components/TaskManager";
import { getTasks } from "@/actions/task.actions";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div>
      <h1 className="text-xl font-bold">ALL TASKS</h1>

      <TaskManager tasks={tasks} />
    </div>
  );
}
