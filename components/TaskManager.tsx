"use client";

import { useRef, useState } from "react";
import { Modal } from "./Modal";
import { Task } from "@/generated/prisma/client";
import { FaPlus, FaFilePen } from "react-icons/fa6";
import { DeleteButton } from "./DeleteButton";

export function TaskManager({ tasks }: { tasks: Task[] }) {
    const ref = useRef<HTMLDialogElement>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setTimeout(() => ref.current?.showModal(), 0);
    };

    const handleCreate = () => {
        setSelectedTask(null);
        ref.current?.showModal();
    };

    return (
        <>
            <Modal
                key={selectedTask?.id ?? "new"}
                dialogRef={ref}
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {tasks.map((task) => (
                    <article
                        key={task.id}
                        className="bg-surface border-border flex h-[16rem] flex-col gap-2 rounded-xl border p-4"
                    >
                        <div className="flex flex-1 flex-col gap-2">
                            <h2 className="font-display font-semibold">
                                {task.title}
                            </h2>
                            <p className="text-muted line-clamp-3 text-sm">
                                {task.description}
                            </p>
                            <p className="text-muted text-xs">
                                {task.date
                                    ? new Date(task.date).toLocaleDateString()
                                    : "No date"}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                    task.isCompleted
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                }`}
                            >
                                {task.isCompleted ? "Completed" : "Incomplete"}
                            </span>

                            <div className="text-muted flex items-center gap-3">
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="hover:text-foreground transition"
                                    aria-label="Edit task"
                                >
                                    <FaFilePen size={15} />
                                </button>
                                <DeleteButton taskId={task.id} />
                            </div>
                        </div>
                    </article>
                ))}

                <button
                    onClick={handleCreate}
                    className="border-border text-muted hover:bg-nav-hover flex h-[16rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed transition"
                >
                    <FaPlus size={20} />
                    <span className="text-sm">New Task</span>
                </button>
            </div>
        </>
    );
}
