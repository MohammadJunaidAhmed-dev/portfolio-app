using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExperiencesController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ExperiencesController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Experience>>> GetExperiences([FromQuery] string? type)
    {
        var query = _context.Experiences.AsQueryable();
        if (!string.IsNullOrEmpty(type))
        {
            query = query.Where(e => e.Type.ToLower() == type.ToLower());
        }
        return await query.OrderBy(e => e.DisplayOrder).ThenByDescending(e => e.Id).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Experience>> GetExperience(int id)
    {
        var exp = await _context.Experiences.FindAsync(id);
        if (exp == null) return NotFound();
        return exp;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Experience>> CreateExperience([FromBody] Experience experience)
    {
        _context.Experiences.Add(experience);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetExperience), new { id = experience.Id }, experience);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExperience(int id, [FromBody] Experience experience)
    {
        if (id != experience.Id) return BadRequest();

        var existing = await _context.Experiences.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = experience.Title;
        existing.Company = experience.Company;
        existing.Location = experience.Location;
        existing.Period = experience.Period;
        existing.Description = experience.Description;
        existing.Type = experience.Type;
        existing.IsCurrent = experience.IsCurrent;
        existing.DisplayOrder = experience.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExperience(int id)
    {
        var exp = await _context.Experiences.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Experiences.Remove(exp);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
