namespace PortfolioApi.Models;

public class ProfileInfo
{
    public int Id { get; set; }
    public string FullName { get; set; } = "M. Junaid Ahmed";
    public string Title { get; set; } = "Senior Full-Stack Engineer & Solutions Architect";
    public string Tagline { get; set; } = "Building scalable cloud web applications with .NET & Angular";
    public string Bio { get; set; } = "Passionate full-stack developer with 5+ years of experience crafting enterprise web solutions, microservices, and modern user experiences.";
    public string AvatarUrl { get; set; } = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
    public string ResumeUrl { get; set; } = "#";
    public string ContactEmail { get; set; } = "junaid.ahmed@example.com";
    public string Phone { get; set; } = "+1 (555) 019-2834";
    public string Location { get; set; } = "San Francisco, CA / Remote";
    public string GitHubUrl { get; set; } = "https://github.com";
    public string LinkedInUrl { get; set; } = "https://linkedin.com";
    public string TwitterUrl { get; set; } = "https://twitter.com";
    public bool AvailableForHire { get; set; } = true;
}
