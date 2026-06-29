import { TaskManager } from "@/components/TaskManager";
import { getTasks } from "@/actions/task.actions";

export default async function Home() {
    const tasks = await getTasks();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-display text-2xl font-bold">All Tasks</h1>
            <TaskManager tasks={tasks} />
        </div>
    );
}