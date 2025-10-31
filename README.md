## Smart Scheduler API
* The Smart Scheduler App is an intelligent task management and scheduling system built using ASP.NET Core (.NET 8) for the backend and React + TypeScript + TailwindCSS (Vite) for the frontend.
* It enables users to input multiple tasks with dependencies, estimated hours, and due dates, and then uses a Topological Sort algorithm on the backend to recommend an optimized task execution order.

## Folder Structure Overview
         ```
        ├── SmartSchedulerApi/                 # Backend (.NET 8 Web API)
        │   ├── Controllers/                   # API endpoints (Task Scheduling)
        │   │   └── ScheduleController.cs
        │   ├── Services/                      # Core logic for task ordering
        │   │   └── TopologicalSort.cs
        │   ├── Models.cs                      # Models: TaskItem, ScheduleRequest, ScheduleResponse
        │   ├── Program.cs                     # Entry point for API
        │   ├── appsettings.json               # Configuration file
        │   ├── SmartSchedulerApi.csproj       # .NET project file
        │   └── SmartSchedulerApi.http         # API testing file (for VS/HTTP clients)
        │
        └── smartschedulerfrontend/            # Frontend (React + TypeScript + Vite)
            ├── src/
            │   ├── App.tsx                    # Main App component
            │   ├── TaskInputForm.tsx          # UI for adding tasks and scheduling
            │   ├── main.tsx                   # Application entry point
            │   ├── assets/                    # Static assets
            │   ├── App.css / index.css        # Styling
            ├── vite.config.ts                 # Vite configuration
            ├── tailwind.config.js             # TailwindCSS setup
            └── package.json                   # Dependencies and scripts

## Features


