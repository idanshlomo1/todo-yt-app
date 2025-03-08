"use client";

import { useState } from "react";
import { createTask } from "@/actions/task-actions";
import { useRouter } from "next/navigation";
import { Calendar, ArrowRight } from "lucide-react";

export function TaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await createTask(formData);
      
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Reset form
        setTitle("");
        setDescription("");
        setDueDate("");
        setIsLoading(false);
        router.refresh();
      }
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form action={handleAction} className="task-card space-y-4 animate-pulse-subtle">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label
            htmlFor="title"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-card/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="description"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-card/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="grid gap-2">
          <label
            htmlFor="dueDate"
            className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Calendar className="h-3.5 w-3.5" /> Due Date (Optional)
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="flex h-10 w-full rounded-md border border-input bg-card/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && (
          <div className="text-sm text-destructive animate-fade-in">
            {error}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 group"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Add Task"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
} 