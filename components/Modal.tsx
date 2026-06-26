"use client";

import { RefObject, useActionState, useEffect } from "react";
import { createTask, updateTask } from "@/actions/task.actions";
import { Task } from "@/generated/prisma/client";

export function Modal({
  dialogRef,
  task,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  task: Task | null;
}) {
  const isEditing = !!task;
  const action = isEditing ? updateTask.bind(null, task.id) : createTask;

  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      dialogRef.current?.close();
    }
  }, [state]);

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-md rounded-xl bg-zinc-700 p-6 text-white shadow-xl backdrop:bg-black/50"
    >
      <div className="item-center mb-6 flex justify-between">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edit Task" : "Create a Task"}
        </h2>
        <button
          onClick={() => dialogRef.current?.close()}
          className="text-zinc-400 transition hover:text-white"
        >
          Cerrar
        </button>
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-zinc-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            defaultValue={task?.title ?? ""}
            className="rounded-lg bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm text-zinc-400">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            rows={4}
            defaultValue={task?.description ?? ""}
            className="resize-none rounded-lg bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm text-zinc-400">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            defaultValue={
              task?.date ? new Date(task.date).toISOString().split("T")[0] : ""
            }
            className="rounded-lg bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-zinc-800 px-3 py-2">
          <label htmlFor="completed" className="text-sm">
            Completed
          </label>
          <input
            id="completed"
            type="checkbox"
            name="completed"
            defaultChecked={task?.isCompleted ?? false}
            className="h-4 w-4 accent-zinc-500"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-zinc-800 px-3 py-2">
          <label htmlFor="important" className="text-sm">
            Important
          </label>
          <input
            id="important"
            type="checkbox"
            name="important"
            defaultChecked={task?.isImportant ?? false}
            className="h-4 w-4 accent-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-zinc-500 py-2 text-sm font-medium transition hover:bg-zinc-900"
        >
          {isEditing ? "Update Task" : "Create Task"}
        </button>
      </form>
    </dialog>
  );
}
