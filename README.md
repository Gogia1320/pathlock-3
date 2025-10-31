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
Core Functionality
* Add tasks with title, estimated hours, due date, and dependencies
* Schedule tasks automatically based on dependency constraints

Algorithmic Logic
* Implements Topological Sorting to find an optimal order for task completion
* Detects circular dependencies and invalid inputs
* Returns a recommended task sequence for efficient project execution

Architecture Highlights
* Backend: ASP.NET Core Web API with modular service-based design
* Frontend: React + TypeScript + TailwindCSS using Vite for blazing-fast builds
* Communication: JSON-based API interaction

## Technologies Used
1. Backend
* ASP.NET Core (.NET 8)
* C#
* Swagger for API testing
* Dependency Injectio

2. Frontend
* React 18
* TypeScript
* TailwindCSS
* Vite (for development/build)
* Axios (for API calls)

## Setup and Installation
Prerequisites
Make sure you have the following installed:
* .NET 8 SDK
* Node.js (v18+)
* npm (comes with Node)

## Backend Setup
                  ```
         # Navigate to backend folder
         cd SmartSchedulerApi
         
         # Restore dependencies
         dotnet restore
         
         # Build the project
         dotnet build
         
         # Run the API
         dotnet run
         
* By default, the backend runs at:
https://localhost:5298
* You can test APIs through Swagger:
https://localhost:5298/swagge
## Frontend Setup
         ```
         #Navigate to frontend folder
         cd smartschedulerfrontend
         
         # Install dependencies
         npm install
         
         # Run development server
         npm run dev
The frontend runs at:
http://localhost:5173

## Connecting Frontend & Backend
         ```
         const response = await fetch("http://localhost:5298/api/v1/projects/123/schedule", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ tasks }),
         });

## API Overview
Endpoint
| Method | Endpoint                                | Description                           |
| ------ | --------------------------------------- | ------------------------------------- |
| POST   | `/api/v1/projects/{projectId}/schedule` | Computes optimal task execution order |

## Request Body Example
         ```
         {
           "tasks": [
             {
               "title": "Design Database Schema",
               "estimatedHours": 8,
               "dueDate": "2025-11-05T00:00:00Z",
               "dependencies": []
             },
             {
               "title": "Build API Endpoints",
               "estimatedHours": 12,
               "dueDate": "2025-11-08T00:00:00Z",
               "dependencies": ["Design Database Schema"]
             },
             {
               "title": "Integrate Frontend",
               "estimatedHours": 10,
               "dueDate": "2025-11-10T00:00:00Z",
               "dependencies": ["Build API Endpoints"]
             }
           ]
         }

## Response Example
         ```
         {
           "recommendedOrder": [
             "Design Database Schema",
             "Build API Endpoints",
             "Integrate Frontend"
           ]
         }

## Frontend Components
| Component               | Description                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| **TaskInputForm.tsx**   | Allows users to add task details (title, hours, dependencies, due date) and trigger scheduling |
| **App.tsx**             | Displays results fetched from the API                                                          |
| **main.tsx**            | Entry point of the app, renders App component                                                  |
| **App.css / index.css** | Custom and Tailwind styling for UI                                                             |

## Backend Components
| File                      | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| **ScheduleController.cs** | API endpoint for scheduling tasks                               |
| **TopologicalSort.cs**    | Core scheduling logic (dependency resolution)                   |
| **Models.cs**             | Defines TaskItem, ScheduleRequest, and ScheduleResponse classes |
| **Program.cs**            | App configuration and middleware setup                          |
| **appsettings.json**      | Basic configuration and logging setup                           |


## Algorithm Summary (Topological Sort)
The backend uses a Topological Sort (Kahn’s Algorithm) approach:
1. Build a dependency graph from tasks.
2. Compute in-degrees for each node.
3. Process nodes with zero dependencies first.
4. Generate ordered list ensuring all prerequisites are respected.
5. Detect and handle cyclic dependencies (invalid schedules).

## Configuration Files
| File                         | Description                       |
| ---------------------------- | --------------------------------- |
| **SmartSchedulerApi.csproj** | Backend project dependencies      |
| **SmartSchedulerApi.http**   | Test API requests directly in IDE |
| **appsettings.json**         | Configurations for environment    |
| **vite.config.ts**           | Vite dev/build configuration      |
| **tailwind.config.js**       | Tailwind styling config           |
| **package.json**             | Frontend scripts and dependencies |

## Example Flow
1. Run backend using:
   dotnet run
2. Run frontend using:
   npm run dev
3. Open browser at http://localhost:5173
4. Add tasks with dependencies
5. Click “Schedule Tasks”
6. View the Recommended Task Order returned from backend
