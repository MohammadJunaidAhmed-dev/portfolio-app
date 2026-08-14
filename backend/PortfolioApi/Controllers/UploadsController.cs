using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
    private readonly IFileStorageService _fileStorage;

    public UploadsController(IFileStorageService fileStorage)
    {
        _fileStorage = fileStorage;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "No file uploaded" });
        }

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".pdf" };
        var ext = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtensions.Contains(ext))
        {
            return BadRequest(new { message = "Invalid file type. Allowed: jpg, jpeg, png, webp, gif, svg, pdf" });
        }

        var relativePath = await _fileStorage.SaveFileAsync(file);
        return Ok(new { url = relativePath });
    }
}
