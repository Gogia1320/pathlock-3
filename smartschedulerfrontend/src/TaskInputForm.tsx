import React, { useState, useEffect } from 'react';

interface TaskItem {
    title: string;
    estimatedHours: number;
    dueDate: string;
    dependencies: string[];
}

interface TaskInputFormProps {
    onScheduleTasks: (tasks: TaskItem[]) => void;
}

const TaskInputForm: React.FC<TaskInputFormProps> = ({ onScheduleTasks }) => {
    const [tasks, setTasks] = useState<TaskItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [
            { title: '', estimatedHours: 0, dueDate: '', dependencies: [] }
        ];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleTaskChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTasks = [...tasks];
        if (event.target.name === "dependencies") {
            newTasks[index][event.target.name] = event.target.value.split(',')
                .map(dep => dep.trim())
                .filter(dep => dep !== '');
        } else if (event.target.name === "estimatedHours") {
            newTasks[index][event.target.name] = parseInt(event.target.value) || 0;
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
        if (tasks.length > 1) {
            const newTasks = tasks.filter((_, i) => i !== index);
            setTasks(newTasks);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const validTasks = tasks.filter(task => task.title.trim() !== '');
        if (validTasks.length === 0) {
            alert('Please add at least one task with a title');
            return;
        }
        onScheduleTasks(validTasks);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-700">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
                        Task Scheduler
                    </h1>
                    <span className="text-sm font-semibold px-4 py-2 bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                        {tasks.length} {tasks.length > 1 ? 'Tasks' : 'Task'}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-100">
                                    Task #{index + 1}
                                </h2>
                                {tasks.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTask(index)}
                                        className="text-red-400 hover:text-red-500 transition"
                                        title="Remove this task"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-300 font-medium mb-1">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={task.title}
                                        onChange={(e) => handleTaskChange(index, e)}
                                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        placeholder="e.g., Design API Schema"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 font-medium mb-1">
                                        Estimated Hours
                                    </label>
                                    <input
                                        type="number"
                                        name="estimatedHours"
                                        value={task.estimatedHours}
                                        onChange={(e) => handleTaskChange(index, e)}
                                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        placeholder="e.g., 5"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 font-medium mb-1">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={task.dueDate}
                                        onChange={(e) => handleTaskChange(index, e)}
                                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 font-medium mb-1">
                                        Dependencies
                                    </label>
                                    <input
                                        type="text"
                                        name="dependencies"
                                        value={task.dependencies.join(', ')}
                                        onChange={(e) => handleTaskChange(index, e)}
                                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        placeholder="Task A, Task B"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Separate multiple tasks with commas
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 justify-between pt-4">
                        <button
                            type="button"
                            onClick={addTask}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
                        >
                            Add Task
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
                        >
                            Generate Schedule
                        </button>
                    </div>

                    <p className="text-center text-gray-400 text-sm font-light mt-6">
                        {tasks.length === 1
                            ? 'Add more tasks to define dependencies.'
                            : 'The schedule will prioritize tasks based on dependencies and deadlines.'}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default TaskInputForm;
