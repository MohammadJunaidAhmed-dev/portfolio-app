using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public MessagesController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<ContactMessage>> PostMessage([FromBody] ContactMessage message)
    {
        if (string.IsNullOrWhiteSpace(message.Name) || string.IsNullOrWhiteSpace(message.Email) || string.IsNullOrWhiteSpace(message.Message))
        {
            return BadRequest(new { message = "Name, Email, and Message are required fields." });
        }

        message.SentAt = DateTime.UtcNow;
        message.IsRead = false;

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, message);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactMessage>>> GetMessages()
    {
        return await _context.Messages.OrderByDescending(m => m.SentAt).ToListAsync();
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<ContactMessage>> GetMessage(int id)
    {
        var msg = await _context.Messages.FindAsync(id);
        if (msg == null) return NotFound();
        return msg;
    }

    [Authorize]
    [HttpPut("{id}/read")]
    public async Task<IActionResult> ToggleRead(int id)
    {
        var msg = await _context.Messages.FindAsync(id);
        if (msg == null) return NotFound();

        msg.IsRead = !msg.IsRead;
        await _context.SaveChangesAsync();
        return Ok(msg);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var msg = await _context.Messages.FindAsync(id);
        if (msg == null) return NotFound();

        _context.Messages.Remove(msg);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
