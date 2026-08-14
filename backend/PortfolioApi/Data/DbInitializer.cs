using PortfolioApi.Models;

namespace PortfolioApi.Data;

public static class DbInitializer
{
    public static void Initialize(PortfolioDbContext context)
    {
        context.Database.EnsureCreated();

        // 1. Seed Admin User
        if (!context.Users.Any())
        {
            var admin = new AdminUser
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                LastLogin = DateTime.UtcNow
            };
            context.Users.Add(admin);
        }

        // 2. Seed Profile Info
        if (!context.Profiles.Any())
        {
            var profile = new ProfileInfo
            {
                FullName = "M. Junaid Ahmed",
                Title = "Full-Stack Engineer & System Architect",
                Tagline = "Architecting modern web platforms with Angular & .NET Core",
                Bio = "Full-stack software developer specializing in high-performance cloud applications, scalable microservices, and interactive Angular interfaces. Driven by elegant design systems and modern web technologies.",
                AvatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
                ResumeUrl = "https://example.com/resume.pdf",
                ContactEmail = "mjunaid.dev@example.com",
                Phone = "+1 (555) 234-5678",
                Location = "San Francisco, CA",
                GitHubUrl = "https://github.com",
                LinkedInUrl = "https://linkedin.com",
                TwitterUrl = "https://twitter.com",
                AvailableForHire = true
            };
            context.Profiles.Add(profile);
        }

        // 3. Seed Skills Matrix
        if (!context.Skills.Any())
        {
            var skills = new List<Skill>
            {
                // Frontend
                new Skill { Name = "Angular (v17/18/19)", Category = "Frontend", IconName = "code", ProficiencyPercentage = 95, YearsOfExperience = 5, DisplayOrder = 1 },
                new Skill { Name = "TypeScript / JavaScript", Category = "Frontend", IconName = "terminal", ProficiencyPercentage = 95, YearsOfExperience = 6, DisplayOrder = 2 },
                new Skill { Name = "HTML5 & Modern CSS / SCSS", Category = "Frontend", IconName = "layout", ProficiencyPercentage = 90, YearsOfExperience = 6, DisplayOrder = 3 },
                new Skill { Name = "RxJS & Angular Signals", Category = "Frontend", IconName = "zap", ProficiencyPercentage = 92, YearsOfExperience = 4, DisplayOrder = 4 },

                // Backend
                new Skill { Name = "C# & .NET 8 / 9 Web API", Category = "Backend", IconName = "server", ProficiencyPercentage = 92, YearsOfExperience = 5, DisplayOrder = 5 },
                new Skill { Name = "Entity Framework Core", Category = "Backend", IconName = "database", ProficiencyPercentage = 90, YearsOfExperience = 5, DisplayOrder = 6 },
                new Skill { Name = "RESTful APIs & GraphQL", Category = "Backend", IconName = "globe", ProficiencyPercentage = 94, YearsOfExperience = 5, DisplayOrder = 7 },
                new Skill { Name = "Node.js & Express", Category = "Backend", IconName = "cpu", ProficiencyPercentage = 85, YearsOfExperience = 4, DisplayOrder = 8 },

                // Databases & Cloud
                new Skill { Name = "SQL Server & PostgreSQL", Category = "Databases & Cloud", IconName = "database", ProficiencyPercentage = 88, YearsOfExperience = 5, DisplayOrder = 9 },
                new Skill { Name = "SQLite & Redis Caching", Category = "Databases & Cloud", IconName = "layers", ProficiencyPercentage = 85, YearsOfExperience = 4, DisplayOrder = 10 },
                new Skill { Name = "Docker & Kubernetes", Category = "Databases & Cloud", IconName = "box", ProficiencyPercentage = 82, YearsOfExperience = 3, DisplayOrder = 11 },
                new Skill { Name = "Azure & Google Cloud Platform", Category = "Databases & Cloud", IconName = "cloud", ProficiencyPercentage = 80, YearsOfExperience = 3, DisplayOrder = 12 }
            };
            context.Skills.AddRange(skills);
        }

        // 4. Seed Showcase Projects
        if (!context.Projects.Any())
        {
            var projects = new List<Project>
            {
                new Project
                {
                    Title = "Aura Analytics Engine",
                    Category = "Full Stack",
                    ShortSummary = "Real-time data visualization platform with interactive dashboards and anomaly detection.",
                    Description = "Built an enterprise analytics platform utilizing Angular 18 signals on frontend and ASP.NET Core Web API with SignalR and Entity Framework Core on backend. Reduced live metrics latency by 60%.",
                    ImageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                    GitHubUrl = "https://github.com/example/aura-analytics",
                    LiveDemoUrl = "https://aura-analytics-demo.example.com",
                    TagsJson = "[\"Angular\", \".NET 8\", \"EF Core\", \"Chart.js\", \"SignalR\"]",
                    Featured = true,
                    DisplayOrder = 1,
                    CreatedAt = DateTime.UtcNow.AddDays(-60)
                },
                new Project
                {
                    Title = "OmniStore E-Commerce Platform",
                    Category = "Full Stack",
                    ShortSummary = "Scalable multi-tenant e-commerce system with payment gateway and live inventory tracker.",
                    Description = "Architected a cloud-ready e-commerce solution featuring serverless payment processing, JWT token authentication, custom Angular glassmorphic UI, and automated inventory sync via .NET Background Services.",
                    ImageUrl = "https://images.unsplash.com/photo-1556742049-0a67ba4f3d2f?auto=format&fit=crop&q=80&w=800",
                    GitHubUrl = "https://github.com/example/omnistore",
                    LiveDemoUrl = "https://omnistore-demo.example.com",
                    TagsJson = "[\"Angular\", \"C#\", \"ASP.NET Core\", \"SQLite\", \"Stripe API\"]",
                    Featured = true,
                    DisplayOrder = 2,
                    CreatedAt = DateTime.UtcNow.AddDays(-40)
                },
                new Project
                {
                    Title = "TaskPulse Team Portal",
                    Category = "Frontend",
                    ShortSummary = "Agile kanban task management tool with drag-and-drop workspace boards.",
                    Description = "Interactive productivity suite featuring HTML5 drag-and-drop, WebSocket real-time updates, reactive Angular forms, and dark glassmorphic styling.",
                    ImageUrl = "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
                    GitHubUrl = "https://github.com/example/taskpulse",
                    LiveDemoUrl = "https://taskpulse.example.com",
                    TagsJson = "[\"Angular 18\", \"RxJS\", \"CSS Glassmorphism\", \"WebSockets\"]",
                    Featured = true,
                    DisplayOrder = 3,
                    CreatedAt = DateTime.UtcNow.AddDays(-20)
                }
            };
            context.Projects.AddRange(projects);
        }

        // 5. Seed Experience & Education Timeline
        if (!context.Experiences.Any())
        {
            var experiences = new List<Experience>
            {
                new Experience
                {
                    Title = "Lead Full-Stack Engineer",
                    Company = "Apex Cloud Technologies",
                    Location = "San Francisco, CA",
                    Period = "2023 - Present",
                    Description = "Leading a team of 6 engineers developing enterprise microservices using .NET 8 Web API and Angular SPA frontends. Built CI/CD pipelines and optimized database queries.",
                    Type = "Work",
                    IsCurrent = true,
                    DisplayOrder = 1
                },
                new Experience
                {
                    Title = "Senior Software Engineer",
                    Company = "NovaSoft Solutions",
                    Location = "Seattle, WA",
                    Period = "2021 - 2023",
                    Description = "Developed RESTful APIs with ASP.NET Core, implemented JWT authentication, and built reactive web portals in Angular.",
                    Type = "Work",
                    IsCurrent = false,
                    DisplayOrder = 2
                },
                new Experience
                {
                    Title = "B.S. in Computer Science",
                    Company = "University of Science & Technology",
                    Location = "California, USA",
                    Period = "2017 - 2021",
                    Description = "Graduated with Honors. Specialization in Software Engineering, Distributed Databases, and Web Development.",
                    Type = "Education",
                    IsCurrent = false,
                    DisplayOrder = 3
                }
            };
            context.Experiences.AddRange(experiences);
        }

        context.SaveChanges();
    }
}
