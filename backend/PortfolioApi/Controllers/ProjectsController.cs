using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ProjectsController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects([FromQuery] string? category, [FromQuery] bool? featuredOnly)
    {
        var query = _context.Projects.AsQueryable();

        if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
        {
            query = query.Where(p => p.Category.ToLower() == category.ToLower());
        }

        if (featuredOnly == true)
        {
            query = query.Where(p => p.Featured);
        }

        return await query.OrderBy(p => p.DisplayOrder).ThenByDescending(p => p.CreatedAt).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();
        return project;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
    {
        project.CreatedAt = DateTime.UtcNow;
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] Project project)
    {
        if (id != project.Id) return BadRequest();

        var existing = await _context.Projects.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = project.Title;
        existing.ShortSummary = project.ShortSummary;
        existing.Description = project.Description;
        existing.ImageUrl = project.ImageUrl;
        existing.GitHubUrl = project.GitHubUrl;
        existing.LiveDemoUrl = project.LiveDemoUrl;
        existing.Category = project.Category;
        existing.TagsJson = project.TagsJson;
        existing.Featured = project.Featured;
        existing.DisplayOrder = project.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
