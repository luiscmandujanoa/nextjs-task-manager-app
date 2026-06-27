import { getTasks } from "@/actions/task.actions";
import { TaskManager } from "@/components/TaskManager";
import React from "react";

async function page() {
    const tasks = await getTasks({ isCompleted: false });

    return (
        <div>
            <h1 className="text-xl font-bold">INCOMPLETE TASKS</h1>

            <TaskManager tasks={tasks} />
        </div>
    );
}

export default page;
