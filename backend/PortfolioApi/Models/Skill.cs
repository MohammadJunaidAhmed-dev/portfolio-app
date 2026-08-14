namespace PortfolioApi.Models;

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = "Frontend"; // Frontend, Backend, Database, Cloud & DevOps, Tools
    public string IconName { get; set; } = "code";
    public int ProficiencyPercentage { get; set; } = 80;
    public int YearsOfExperience { get; set; } = 3;
    public int DisplayOrder { get; set; } = 0;
}
