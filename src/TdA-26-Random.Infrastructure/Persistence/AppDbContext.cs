using Microsoft.EntityFrameworkCore;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.Infrastructure.Persistance;

public class AppDbContext : DbContext
{
    public DbSet<Course> Courses { get; set; }
    public DbSet<Chapter> Chapters { get; set; }

// TODO: Dodělat další tabulky

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chapter>()
            .HasOne<Course>()
            .WithMany()
            .HasForeignKey(c => c.CourseId);
    }
}