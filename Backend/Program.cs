using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using BCrypt.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger/OpenAPI support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS to allow access from frontend local dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure EF Core database connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    );
});

var app = builder.Build();

// Enable CORS
app.UseCors("AllowFrontend");

// Swagger documentation
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Auto-verify and create database and tables on startup + seed default admin user
try
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
        // This will create the database and tables if they do not exist
        dbContext.Database.EnsureCreated();
        Console.WriteLine("MySQL database and tables initialized successfully.");

        // Seed default administrator if table is empty
        if (!dbContext.AdminUsers.Any())
        {
            var defaultAdmin = new AdminUser
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                CreatedAt = DateTime.UtcNow
            };
            dbContext.AdminUsers.Add(defaultAdmin);
            dbContext.SaveChanges();
            Console.WriteLine("Database seeded: Default admin created successfully. (Username: admin, Password: admin123)");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred while initializing the database: {ex.Message}");
}

app.UseAuthorization();

app.MapControllers();

// Launch on port 5005
app.Run("http://localhost:5005");
