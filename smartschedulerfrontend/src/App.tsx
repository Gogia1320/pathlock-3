import React, { useState } from 'react';
import TaskInputForm from './TaskInputForm';

interface TaskItem {
    title: string;
    estimatedHours: number;
    dueDate: string;
    dependencies: string[];
}

interface ScheduleResponse {
    recommendedOrder: string[];
}

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendedOrder, setRecommendedOrder] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleScheduleTasks = async (tasks: TaskItem[]) => {
        setLoading(true);
        setRecommendedOrder(null);
        setError(null);

        try {
            const projectId = "1"; // You can make this dynamic if needed
            const response = await fetch(`http://localhost:5298/api/v1/projects/${projectId}/schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks }),
            });

            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.join(', ') || 'Failed to schedule tasks');
            }

            const data: ScheduleResponse = await response.json();
            setRecommendedOrder(data.recommendedOrder);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Smart Scheduler</h1>
            <div className="max-w-xl mx-auto">
                <TaskInputForm onScheduleTasks={handleScheduleTasks} />

                {loading && (
                    <div className="text-center mt-4">
                        <p className="text-blue-500 font-semibold">Scheduling tasks...</p>
                        {/* Basic loading spinner */}
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mt-2"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                {recommendedOrder && recommendedOrder.length > 0 && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-3">Recommended Task Order:</h2>
                        <ol className="list-decimal list-inside">
                            {recommendedOrder.map((taskTitle, index) => (
                                <li key={index} className="py-1 border-b border-green-200 last:border-b-0">{taskTitle}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {recommendedOrder && recommendedOrder.length === 0 && !loading && !error && (
                    <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg shadow-md text-center">
                        <p>No tasks were recommended. Check your input.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
