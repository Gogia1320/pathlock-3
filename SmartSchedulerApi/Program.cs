using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http.Json;
using System.Text.Json; // Added this line

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add HttpClient service for internal API call
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors();
app.UseAuthorization();
app.MapControllers();


// ✅ Root endpoint – automatically calls your schedule API
app.MapGet("/", async (IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();

    // Example projectId
    var projectId = "1";

    // Example input data
    var requestBody = new
    {
        tasks = new[]
        {
            new { title = "Design API", estimatedHours = 5, dueDate = "2025-10-25", dependencies = new string[] { } },
            new { title = "Implement Backend", estimatedHours = 12, dueDate = "2025-10-28", dependencies = new[] { "Design API" } },
            new { title = "Build Frontend", estimatedHours = 10, dueDate = "2025-10-30", dependencies = new[] { "Design API" } },
            new { title = "End-to-End Test", estimatedHours = 8, dueDate = "2025-10-31", dependencies = new[] { "Implement Backend", "Build Frontend" } }
        }
    };

    // 👇 Change the URL below to match your actual base address and port
    var apiUrl = $"http://localhost:5298/api/v1/projects/{projectId}/schedule";

    // Send POST request to your real API
    var response = await client.PostAsJsonAsync(apiUrl, requestBody);

    // Get the API response content
    var result = await response.Content.ReadAsStringAsync();
    // Console.WriteLine(result); // Removed this line

    // Parse the result string into a JSON object
    var actualOutput = JsonSerializer.Deserialize<object>(result);

    return Results.Json(new
    {
        description = "Smart Scheduler API - Automatically plans and orders project tasks based on dependencies, deadlines, and estimated effort.",
        endpoint = "POST /api/v1/projects/{projectId}/schedule",
        exampleInput = requestBody,
        exampleOutput = actualOutput
    });
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
