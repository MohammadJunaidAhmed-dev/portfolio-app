namespace PortfolioApi.Models;

public class Experience
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty; // Role or Degree
    public string Company { get; set; } = string.Empty; // Company or School
    public string Location { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty; // e.g. "2024 - Present"
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = "Work"; // Work or Education
    public bool IsCurrent { get; set; } = false;
    public int DisplayOrder { get; set; } = 0;
}
