using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using SmartSchedulerApi;
using SmartSchedulerApi.Services;
using System;
using System.Text.Json;

namespace SmartSchedulerApi.Controllers
{
    [ApiController]
    [Route("api/v1/projects/{projectId}/[controller]")]
    public class ScheduleController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(string projectId, [FromBody] ScheduleRequest request)
        {
            if (request == null || !request.Tasks.Any())
            {
                return BadRequest("Tasks cannot be empty.");
            }

            var recommendedOrder = TopologicalSort.SortTasks(request.Tasks, out var errors);

            if (recommendedOrder == null)
            {
                return BadRequest(errors);
            }
            Console.WriteLine(JsonSerializer.Serialize(
            new ScheduleResponse { RecommendedOrder = recommendedOrder },
            new JsonSerializerOptions { WriteIndented = true }
        ));
          return Ok(new ScheduleResponse { RecommendedOrder = recommendedOrder });
        }

        [HttpGet("info")]
        public IActionResult GetScheduleInfo(string projectId)
        {
            var exampleInput = new ScheduleRequest
            {
                Tasks = new List<TaskItem>
                {
                    new TaskItem { Title = "Design API", EstimatedHours = 5, DueDate = new DateTime(2025, 10, 25), Dependencies = new List<string>() },
                    new TaskItem { Title = "Implement Backend", EstimatedHours = 12, DueDate = new DateTime(2025, 10, 28), Dependencies = new List<string> { "Design API" } },
                    new TaskItem { Title = "Build Frontend", EstimatedHours = 10, DueDate = new DateTime(2025, 10, 30), Dependencies = new List<string> { "Design API" } },
                    new TaskItem { Title = "End-to-End Test", EstimatedHours = 8, DueDate = new DateTime(2025, 10, 31), Dependencies = new List<string> { "Implement Backend", "Build Frontend" } }
                }
            };

            var exampleOutput = new ScheduleResponse
            {
                RecommendedOrder = new List<string> { "Design API", "Implement Backend", "Build Frontend", "End-to-End Test" }
            };

            return Ok(new
            {
                description = $"Information and examples for the /api/v1/projects/{projectId}/schedule POST endpoint.",
                examplePostInput = exampleInput,
                examplePostOutput = exampleOutput
            });
        }
    }
}
