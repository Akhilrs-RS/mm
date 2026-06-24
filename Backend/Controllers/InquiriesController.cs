using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InquiriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var inquiries = await _context.Inquiries.OrderByDescending(i => i.CreatedAt).ToListAsync();
            return Ok(inquiries);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Inquiry inquiry)
        {
            if (inquiry == null || string.IsNullOrWhiteSpace(inquiry.CustomerName) || 
                string.IsNullOrWhiteSpace(inquiry.Email) || string.IsNullOrWhiteSpace(inquiry.Message))
            {
                return BadRequest(new { message = "Customer Name, Email, and Message are required." });
            }

            inquiry.CreatedAt = DateTime.UtcNow;
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Inquiry submitted successfully.", id = inquiry.Id });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _context.Inquiries.FindAsync(id);
            if (existing == null) return NotFound(new { message = "Inquiry not found." });

            _context.Inquiries.Remove(existing);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Inquiry deleted successfully." });
        }
    }
}
