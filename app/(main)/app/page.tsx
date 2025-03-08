import { Metadata } from "next";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { toggleTaskStatus, deleteTask } from "@/actions/task-actions";
import { TaskForm } from "@/components/task-form";

export const metadata: Metadata = {
  title: "Dashboard | Task Manager",
  description: "Task Manager Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return null;
  }
  
  // Find or create user based on email
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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get yesterday's date at midnight for comparison
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Filter tasks by creation date
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  const yesterdayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === yesterday.getTime();
  });

  const olderTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() < yesterday.getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="progress-steps animate-fade-in">
        <div className="progress-step progress-step-active"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 animate-slide-up">
        <DashboardCard
          title="Total Tasks"
          value={totalTasks.toString()}
          description="Total number of tasks"
          delay={0}
        />
        <DashboardCard
          title="Completed Tasks"
          value={completedTasks.toString()}
          description="Number of completed tasks"
          delay={100}
        />
        <DashboardCard
          title="Pending Tasks"
          value={pendingTasks.toString()}
          description="Number of pending tasks"
          delay={200}
        />
      </div>
      
      <div className="space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Create New Task</h2>
        </div>
        
        <TaskForm />
        
        {todayTasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">TODAY</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {todayTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>
        )}
        
        {yesterdayTasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">YESTERDAY</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {yesterdayTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  delay={index * 50 + 100}
                />
              ))}
            </div>
          </div>
        )}
        
        {olderTasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">OLDER</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {olderTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  delay={index * 50 + 200}
                />
              ))}
            </div>
          </div>
        )}
        
        {tasks.length === 0 && (
          <div className="task-card text-center py-12 animate-pulse-subtle">
            <p className="text-muted-foreground">No tasks found. Create your first task above.</p>
          </div>
        )}
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

function DashboardCard({
  title,
  value,
  description,
  delay = 0
}: {
  title: string;
  value: string;
  description: string;
  delay?: number;
}) {
  return (
    <div 
      className="task-card animate-pulse-subtle" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
