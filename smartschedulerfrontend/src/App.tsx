import React, { useState } from "react";
import TaskInputForm from "./TaskInputForm";
import "./App.css";

interface TaskItem {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

interface ScheduleResponse {
  recommendedOrder: string[];
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedOrder, setRecommendedOrder] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScheduleTasks = async (tasks: TaskItem[]) => {
    setLoading(true);
    setRecommendedOrder(null);
    setError(null);

    try {
      const projectId = "1";
      const response = await fetch(
        `http://localhost:5298/api/v1/projects/${projectId}/schedule`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tasks }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.join(", ") || "Failed to schedule tasks");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 mb-8 tracking-tight">
          Smart Scheduler
        </h1>

        {/* Task Input Form */}
        <TaskInputForm onScheduleTasks={handleScheduleTasks} />

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-8">
            <p className="text-indigo-300 font-medium animate-pulse">
              Scheduling tasks...
            </p>
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-400 mx-auto mt-3"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-900/30 border border-red-600/50 text-red-300 px-5 py-4 rounded-xl backdrop-blur-md shadow-lg">
            <h3 className="font-semibold text-lg mb-1">Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Recommended Order */}
        {recommendedOrder && recommendedOrder.length > 0 && (
          <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Recommended Task Order
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-200">
              {recommendedOrder.map((taskTitle, index) => (
                <li
                  key={index}
                  className="px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-all duration-300"
                >
                  {taskTitle}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* No Recommendations */}
        {recommendedOrder && recommendedOrder.length === 0 && !loading && !error && (
          <div className="mt-6 p-6 bg-yellow-900/30 border border-yellow-600/50 text-yellow-300 rounded-xl shadow-md text-center backdrop-blur-md">
            <p>No valid task order generated. Please review your input.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
