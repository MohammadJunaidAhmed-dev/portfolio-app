using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ProfileController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ProfileInfo>> GetProfile()
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync();
        if (profile == null)
        {
            profile = new ProfileInfo();
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
        }
        return profile;
    }

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileInfo profile)
    {
        var existing = await _context.Profiles.FirstOrDefaultAsync();
        if (existing == null)
        {
            _context.Profiles.Add(profile);
        }
        else
        {
            existing.FullName = profile.FullName;
            existing.Title = profile.Title;
            existing.Tagline = profile.Tagline;
            existing.Bio = profile.Bio;
            existing.AvatarUrl = profile.AvatarUrl;
            existing.ResumeUrl = profile.ResumeUrl;
            existing.ContactEmail = profile.ContactEmail;
            existing.Phone = profile.Phone;
            existing.Location = profile.Location;
            existing.GitHubUrl = profile.GitHubUrl;
            existing.LinkedInUrl = profile.LinkedInUrl;
            existing.TwitterUrl = profile.TwitterUrl;
            existing.AvailableForHire = profile.AvailableForHire;
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
