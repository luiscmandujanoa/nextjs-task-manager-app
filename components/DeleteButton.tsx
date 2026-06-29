"use client";

import { useFormStatus } from "react-dom";
import { FaTrash } from "react-icons/fa6";
import { deleteTask } from "@/actions/task.actions";
import { toast } from "sonner";

function TrashButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            aria-label="Delete task"
            className="text-muted transition hover:text-red-400 disabled:opacity-50"
        >
            <FaTrash size={15} />
        </button>
    );
}

export function DeleteButton({ taskId }: { taskId: string }) {
    const handleAction = async (formData: FormData) => {
        const result = await deleteTask(null, formData);
        if (result?.success) {
            toast.success(result.message);
        } else {
            toast.error(result?.message ?? "Error deleting task");
        }
    };

    return (
        <form action={handleAction} className="flex items-center">
            <input type="hidden" name="taskId" value={taskId} />
            <TrashButton />
        </form>
    );
}
