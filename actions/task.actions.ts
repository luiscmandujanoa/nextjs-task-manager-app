"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTasks(filter?: {
    isCompleted?: boolean;
    isImportant?: boolean;
}) {
    const { userId } = await auth();
    if (!userId) throw new Error("No autorizado");

    const tasks = await prisma.task.findMany({
        where: { userId, ...filter },
    });

    return tasks;
}

export async function createTask(prevState: unknown, formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("No autorizado");

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const completed = formData.get("completed") === "on";
        const important = formData.get("important") === "on";

        await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            },
        });

        revalidatePath("/");
        return { success: true, message: "Task created successfully" };
    } catch (error) {
        return { success: false, message: "Error creating task" };
    }
}

export async function updateTask(
    taskId: string,
    prevState: unknown,
    formData: FormData,
) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("No autorizado");

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const completed = formData.get("completed") === "on";
        const important = formData.get("important") === "on";

        await prisma.task.update({
            where: { id: taskId, userId },
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
            },
        });

        revalidatePath("/");
        return { success: true, message: "Task updated successfully" };
    } catch (error) {
        return { success: false, message: "Error updating task" };
    }
}

export async function deleteTask(prevState: unknown, formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("No autorizado");

        const taskId = formData.get("taskId") as string;

        await prisma.task.delete({
            where: { id: taskId, userId },
        });

        revalidatePath("/");
        return { success: true, message: "Task deleted successfully" };
    } catch (error) {
        return { success: false, message: "Error deleting task" };
    }
}
