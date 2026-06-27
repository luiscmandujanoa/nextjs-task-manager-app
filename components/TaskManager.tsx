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
        setTimeout(() => {
            ref.current?.showModal();
        }, 0);
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

            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {tasks.map((currentTask) => {
                    return (
                        <div
                            key={currentTask.id}
                            className="bg-borderColor2 border-borderColor2 flex h-[16rem] flex-col gap-[0.5rem] rounded-lg border-2 px-[1rem] py-[1.2rem]"
                        >
                            <div className="flex flex-1 flex-col space-y-5">
                                <h2 className="text-lg">{currentTask.title}</h2>
                                <p className="text-sm text-white/90">
                                    {currentTask.description}
                                </p>
                                <p>{currentTask.date}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className={`rounded-2xl px-2 py-1 ${currentTask.isCompleted ? "bg-green-500" : "bg-red-500"}`}
                                >
                                    {currentTask.isCompleted
                                        ? "Completed"
                                        : "Incomplete"}
                                </button>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleEdit(currentTask)}
                                        className="hover:cursor-pointer"
                                    >
                                        <FaFilePen />
                                    </button>
                                    <DeleteButton taskId={currentTask.id} />
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button
                    onClick={handleCreate}
                    className="text-colorGrey2 hover:bg-colorGrey5 border-borderColor2 flex h-[16rem] items-center justify-center gap-[0.5rem] rounded-lg border-1 border-dashed hover:cursor-pointer"
                >
                    <FaPlus />
                    New Task
                </button>
            </div>
        </>
    );
}
