using Microsoft.EntityFrameworkCore;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<ContactMessage> Messages => Set<ContactMessage>();
    public DbSet<ProfileInfo> Profiles => Set<ProfileInfo>();
    public DbSet<AdminUser> Users => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Project>().HasKey(p => p.Id);
        modelBuilder.Entity<Skill>().HasKey(s => s.Id);
        modelBuilder.Entity<Experience>().HasKey(e => e.Id);
        modelBuilder.Entity<ContactMessage>().HasKey(m => m.Id);
        modelBuilder.Entity<ProfileInfo>().HasKey(pr => pr.Id);
        modelBuilder.Entity<AdminUser>().HasKey(u => u.Id);
    }
}
