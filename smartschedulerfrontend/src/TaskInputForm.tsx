import React, { useState } from 'react';

interface TaskItem {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

interface TaskInputFormProps {
  onScheduleTasks: (tasks: TaskItem[]) => void;
}

// Modern, glassmorphic UI with animated background
const TaskInputForm: React.FC<TaskInputFormProps> = ({ onScheduleTasks }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { title: '', estimatedHours: 0, dueDate: '', dependencies: [] }
  ]);

  const handleTaskChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newTasks = [...tasks];
    if (event.target.name === "dependencies") {
      newTasks[index][event.target.name] = event.target.value
        .split(',')
        .map(dep => dep.trim())
        .filter(dep => dep !== '');
    } else if (event.target.name === "estimatedHours") {
      newTasks[index][event.target.name] = parseInt(event.target.value);
    } else {
      const key = event.target.name as 'title' | 'dueDate';
      newTasks[index][key] = event.target.value;
    }
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { title: '', estimatedHours: 0, dueDate: '', dependencies: [] }]);
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onScheduleTasks(tasks);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-indigo-800 via-purple-600 to-pink-700 animate-gradient-x"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 space-y-10 max-w-2xl w-full mx-auto p-10 glass-morph rounded-3xl shadow-2xl border border-white/20"
      >
        <h2 className="text-center mb-8 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-400 to-emerald-300 drop-shadow-lg tracking-tight">
          ✨ Modern Task Scheduler
        </h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="relative group bg-white/10 border border-pink-300/30 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] glass-inner"
          >
            {/* Glassmorphic inner glow */}
            <div className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-blur duration-300 blur-2xl -z-10 glass-bg"></div>

            <h3 className="font-extrabold text-2xl text-indigo-100 mb-4 tracking-tight">
              🧱 Task {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-indigo-300 text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={(e) => handleTaskChange(index, e)}
                  className="w-full glass-input py-2 px-3 placeholder-indigo-100/70"
                  placeholder="e.g., Design Database"
                  required
                />
              </div>
              <div>
                <label className="block text-indigo-300 text-sm font-bold mb-2">Estimated Hours</label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={task.estimatedHours}
                  onChange={(e) => handleTaskChange(index, e)}
                  className="w-full glass-input py-2 px-3 placeholder-indigo-100/70"
                  placeholder="e.g., 8"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-indigo-300 text-sm font-bold mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={(e) => handleTaskChange(index, e)}
                  className="w-full glass-input py-2 px-3"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-indigo-300 text-sm font-bold mb-2">
                  Dependencies (comma-separated)
                </label>
                <input
                  type="text"
                  name="dependencies"
                  value={task.dependencies.join(', ')}
                  onChange={(e) => handleTaskChange(index, e)}
                  className="w-full glass-input py-2 px-3 placeholder-indigo-100/70"
                  placeholder="e.g., Task A, Task B"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeTask(index)}
              className="mt-6 px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-md shadow-md hover:scale-110 glow-btn focus:ring-2 focus:ring-red-400"
            >
              🗑 Remove Task
            </button>
          </div>
        ))}

        {/* Stylish button row */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <button
            type="button"
            onClick={addTask}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-xl neon-btn hover:scale-105 shadow-xl transition-all duration-300"
          >
            ➕ Add Task
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl neon-btn2 hover:scale-105 shadow-xl transition-all duration-300"
          >
            ✨ Schedule My Tasks
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInputForm;
