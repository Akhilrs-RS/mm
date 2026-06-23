using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using BCrypt.Net;
using System.IO;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // Login Request Model
        public class LoginRequest
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        // Change Password Request Model
        public class ChangePasswordRequest
        {
            public string Username { get; set; } = string.Empty;
            public string CurrentPassword { get; set; } = string.Empty;
            public string NewPassword { get; set; } = string.Empty;
        }

        // Image Metadata Response Model
        public class ImageMetadataResponse
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string ContentType { get; set; } = string.Empty;
            public string Url { get; set; } = string.Empty;
            public DateTime UploadedAt { get; set; }
        }

        // Authenticate admin user
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { success = false, message = "Username and password are required." });
            }

            var admin = await _context.AdminUsers
                .FirstOrDefaultAsync(u => u.Username.ToLower() == request.Username.ToLower());

            if (admin == null || !BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
            {
                return Unauthorized(new { success = false, message = "Invalid username or password." });
            }

            return Ok(new { success = true, username = admin.Username, message = "Login successful." });
        }

        // Update administrator password
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || 
                string.IsNullOrWhiteSpace(request.CurrentPassword) || 
                string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest(new { success = false, message = "All password fields are required." });
            }

            var admin = await _context.AdminUsers
                .FirstOrDefaultAsync(u => u.Username.ToLower() == request.Username.ToLower());

            if (admin == null || !BCrypt.Net.BCrypt.Verify(request.CurrentPassword, admin.PasswordHash))
            {
                return Unauthorized(new { success = false, message = "Current password verification failed." });
            }

            if (request.NewPassword.Length < 6)
            {
                return BadRequest(new { success = false, message = "New password must be at least 6 characters long." });
            }

            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Password updated successfully." });
        }

        // Upload new image to database
        [HttpPost("images")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { success = false, message = "Please select a valid image file." });
            }

            // Check content type to ensure it is an image
            if (!file.ContentType.StartsWith("image/"))
            {
                return BadRequest(new { success = false, message = "Uploaded file must be a valid image." });
            }

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var newImage = new AdminImage
                {
                Name = Path.GetFileName(file.FileName),
                ContentType = file.ContentType,
                ImageData = memoryStream.ToArray(),
                UploadedAt = DateTime.UtcNow
            };

            _context.AdminImages.Add(newImage);
            await _context.SaveChangesAsync();

            return Ok(new { 
                success = true, 
                message = "Image uploaded and stored in database successfully.",
                imageId = newImage.Id 
            });
        }

        // List all stored images (excluding raw bytes for faster load times)
        [HttpGet("images")]
        public async Task<IActionResult> GetImages()
        {
            var request = HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}";

            var images = await _context.AdminImages
                .OrderByDescending(img => img.UploadedAt)
                .Select(img => new ImageMetadataResponse
                {
                    Id = img.Id,
                    Name = img.Name,
                    ContentType = img.ContentType,
                    Url = $"{baseUrl}/api/admin/images/{img.Id}",
                    UploadedAt = img.UploadedAt
                })
                .ToListAsync();

            return Ok(images);
        }

        // Fetch binary image content
        [HttpGet("images/{id}")]
        public async Task<IActionResult> GetImageStream(int id)
        {
            var image = await _context.AdminImages.FindAsync(id);
            if (image == null)
            {
                return NotFound(new { success = false, message = "Image not found." });
            }

            return File(image.ImageData, image.ContentType);
        }

        // Delete image from database
        [HttpDelete("images/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.AdminImages.FindAsync(id);
            if (image == null)
            {
                return NotFound(new { success = false, message = "Image not found." });
            }

            _context.AdminImages.Remove(image);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Image deleted from database successfully." });
        }
    }
}
