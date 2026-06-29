"use client";

import { RefObject, useActionState, useEffect } from "react";
import { createTask, updateTask } from "@/actions/task.actions";
import { Task } from "@/generated/prisma/client";
import { SubmitButton } from "./SubmitButton";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";

export function Modal({
    dialogRef,
    task,
    onClose,
}: {
    dialogRef: RefObject<HTMLDialogElement | null>;
    task: Task | null;
    onClose: () => void;
}) {
    const isEditing = !!task;
    const action = isEditing ? updateTask.bind(null, task.id) : createTask;
    const [state, formAction] = useActionState(action, null);

    useEffect(() => {
        if (state?.success) {
            dialogRef.current?.close();
            toast.success(state.message);
        } else if (state?.success === false) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className="bg-surface text-foreground w-full max-w-md rounded-xl p-6 shadow-xl backdrop:bg-black/60"
        >
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                    {isEditing ? "Edit Task" : "New Task"}
                </h2>
                <button
                    onClick={() => dialogRef.current?.close()}
                    className="text-muted hover:text-foreground transition"
                    aria-label="Close modal"
                >
                    <MdClose size={20} />
                </button>
            </div>

            <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="text-muted text-sm">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter a title"
                        defaultValue={task?.title ?? ""}
                        className="bg-muted-bg focus:ring-accent rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="text-muted text-sm">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        rows={4}
                        defaultValue={task?.description ?? ""}
                        className="bg-muted-bg focus:ring-accent resize-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="date" className="text-muted text-sm">
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        defaultValue={
                            task?.date
                                ? new Date(task.date)
                                      .toISOString()
                                      .split("T")[0]
                                : ""
                        }
                        className="bg-muted-bg focus:ring-accent rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
                    />
                </div>

                <div className="bg-muted-bg flex items-center justify-between rounded-lg px-3 py-2">
                    <label htmlFor="completed" className="text-sm">
                        Completed
                    </label>
                    <input
                        id="completed"
                        type="checkbox"
                        name="completed"
                        defaultChecked={task?.isCompleted ?? false}
                        className="accent-accent h-4 w-4"
                    />
                </div>

                <div className="bg-muted-bg flex items-center justify-between rounded-lg px-3 py-2">
                    <label htmlFor="important" className="text-sm">
                        Important
                    </label>
                    <input
                        id="important"
                        type="checkbox"
                        name="important"
                        defaultChecked={task?.isImportant ?? false}
                        className="accent-accent h-4 w-4"
                    />
                </div>

                <SubmitButton
                    label={isEditing ? "Update Task" : "Create Task"}
                />
            </form>
        </dialog>
    );
}
