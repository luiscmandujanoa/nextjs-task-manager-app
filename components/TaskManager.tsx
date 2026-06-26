"use client";

import { useRef, useState } from "react";
import { Modal } from "./Modal";
import { Task } from "@/generated/prisma/client";
import { FaPlus } from "react-icons/fa6";
import { deleteTask } from "@/actions/task.actions";

export function TaskManager({ tasks }: { tasks: Task[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    ref.current?.showModal();
  };

  const handleCreate = () => {
    setSelectedTask(null);
    ref.current?.showModal();
  };

  return (
    <>
      {/* <button onClick={() => ref.current?.showModal()}>+</button> */}
      <Modal
        key={selectedTask?.id ?? "new"}
        dialogRef={ref}
        task={selectedTask}
      />

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map((currentTask) => {
          const deleteTaskWithId = deleteTask.bind(null, currentTask.id);

          return (
            <div
              key={currentTask.id}
              className="bg-borderColor2 border-borderColor2 flex h-[16rem] flex-col gap-[0.5rem] rounded-lg border-2 px-[1rem] py-[1.2rem]"
            >
              <h1>{currentTask.title}</h1>
              <p>{currentTask.description}</p>
              <p>{currentTask.date}</p>
              <div className="flex justify-between">
                <button>
                  {currentTask.isCompleted ? "Completed" : "Incomplete"}
                </button>
                <div className="flex space-x-3">
                  <button onClick={() => handleEdit(currentTask)}>Edit</button>
                  <form action={deleteTaskWithId}>
                    <button type="submit">Delete</button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleCreate}
          className="text-colorGrey2 hover:bg-colorGrey5 flex h-[16rem] items-center justify-center gap-[0.5rem] rounded-lg hover:cursor-pointer"
        >
          <FaPlus />
          New Task
        </button>
      </div>
    </>
  );
}
