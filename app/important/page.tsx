import React from "react";
import { getTasks } from "@/actions/task.actions";

async function page() {
  const tasks = await getTasks();

  return (
    <div>
      IMPORTANT TASKS
      <div>
        {tasks.map((task) => {
          return <div key={task.id}>{task.title}-1</div>;
        })}
      </div>
    </div>
  );
}

export default page;
