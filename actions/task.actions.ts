"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  const { userId } = await auth();
  console.log("--------userId: ", userId);

  if (!userId) throw new Error("No autorizado");

  const tasks = await prisma.task.findMany({
    where: { userId },
  });

  return tasks;
}

export async function createTask(prevState: unknown, formData: FormData) {
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
  return { success: true };
}

export async function updateTask(
  taskId: string,
  prevState: unknown,
  formData: FormData,
) {
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
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("No autorizado");

  await prisma.task.delete({
    where: { id: taskId, userId },
  });

  revalidatePath("/");
}
