'use server'

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

// Create a new task
export async function createTask(formData: FormData) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return { error: "You must be logged in to create a task" };
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user) {
      return { error: "User not found" };
    }
    
    const userId = user.id;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDateString = formData.get("dueDate") as string;
    
    // Validate input
    if (!title) {
      return { error: "Title is required" };
    }
    
    // Parse due date if provided
    let dueDate = undefined;
    if (dueDateString) {
      dueDate = new Date(dueDateString);
    }
    
    // Create task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        userId,
      },
    });
    
    revalidatePath('/app');
    return { success: true, task };
  } catch (error) {
    console.error("Task creation error:", error);
    return { error: "Failed to create task" };
  }
}

// Toggle task status (completed/not completed)
export async function toggleTaskStatus(formData: FormData) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return;
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user) {
      return;
    }
    
    const id = formData.get("id") as string;
    
    if (!id) {
      return;
    }
    
    // Check if task belongs to user
    const task = await prisma.task.findUnique({
      where: { id },
    });
    
    if (!task) {
      return;
    }
    
    if (task.userId !== user.id) {
      return;
    }
    
    // Toggle completed status
    await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
    
    revalidatePath('/app');
  } catch (error) {
    console.error("Task update error:", error);
  }
}

// Get all tasks for the current user
export async function getTasks() {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return { error: "You must be logged in to view tasks" };
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user) {
      return { error: "User not found" };
    }
    
    const userId = user.id;
    
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return { tasks };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { error: "Failed to fetch tasks" };
  }
}

// Update a task
export async function updateTask(taskId: string, data: {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date | null;
}) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return { error: "You must be logged in to update a task" };
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user) {
      return { error: "User not found" };
    }
    
    const userId = user.id;
    
    // Check if task belongs to user
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    
    if (!task || task.userId !== userId) {
      return { error: "Task not found or you don't have permission" };
    }
    
    // Update task
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
    
    revalidatePath('/app');
    return { success: true, task: updatedTask };
  } catch (error) {
    console.error("Task update error:", error);
    return { error: "Failed to update task" };
  }
}

// Delete a task
export async function deleteTask(formData: FormData) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return;
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user) {
      return;
    }
    
    const id = formData.get("id") as string;
    
    if (!id) {
      return;
    }
    
    // Check if task belongs to user
    const task = await prisma.task.findUnique({
      where: { id },
    });
    
    if (!task) {
      return;
    }
    
    if (task.userId !== user.id) {
      return;
    }
    
    // Delete task
    await prisma.task.delete({
      where: { id },
    });
    
    revalidatePath('/app');
  } catch (error) {
    console.error("Task deletion error:", error);
  }
}
