import { Metadata } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { toggleTaskStatus, deleteTask } from "@/actions/task-actions";
import { CheckCircle2, Circle, Trash2, Calendar, Clock } from "lucide-react";
import { TaskForm } from "@/components/task-form";

export const metadata: Metadata = {
  title: "Tasks | Task Manager",
  description: "Manage your tasks",
};

export default async function TasksPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return null;
  }
  
  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  
  if (!user?.id) {
    return null;
  }
  
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
      </div>
      
      <div className="progress-steps animate-fade-in">
        <div className="progress-step"></div>
        <div className="progress-step progress-step-active"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
      </div>
      
      <div className="space-y-6 animate-slide-up">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <TaskForm />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Tasks ({pendingTasks.length})</h2>
            {pendingTasks.length === 0 ? (
              <div className="task-card text-center py-8 animate-pulse-subtle">
                <p className="text-muted-foreground">No pending tasks. Create a new task above.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingTasks.map((task, index) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    delay={index * 50}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Completed Tasks ({completedTasks.length})</h2>
            {completedTasks.length === 0 ? (
              <div className="task-card text-center py-8 animate-pulse-subtle">
                <p className="text-muted-foreground">No completed tasks yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedTasks.map((task, index) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    delay={index * 50 + 100}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, delay = 0 }: { task: any, delay?: number }) {
  return (
    <div 
      className="task-card relative animate-slide-up animate-pulse-subtle" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4">
        <h3 className="font-medium text-lg mb-1">{task.title}</h3>
        {task.description && (
          <p className="text-muted-foreground text-sm line-clamp-3">{task.description}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <form action={toggleTaskStatus}>
            <input type="hidden" name="id" value={task.id} />
            <button type="submit" className="text-muted-foreground hover:text-primary transition-colors">
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
          </form>
          <span className="text-xs text-muted-foreground">
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        <form action={deleteTask}>
          <input type="hidden" name="id" value={task.id} />
          <button type="submit" className="text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </form>
      </div>
      
      {task.dueDate && (
        <div className="absolute top-6 right-6 text-xs text-muted-foreground">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
} 