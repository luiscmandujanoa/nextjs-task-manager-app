import { getTasks } from "@/actions/task.actions";
import { TaskManager } from "@/components/TaskManager";

export default async function Page() {
    const tasks = await getTasks();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-display text-2xl font-bold">All Tasks</h1>
            <TaskManager tasks={tasks} />
        </div>
    );
}
