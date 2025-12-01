using Microsoft.EntityFrameworkCore;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.Infrastructure.Persistance;

public class AppDbContext : DbContext
{
    public DbSet<Course> Courses { get; set; }
    public DbSet<Chapter> Chapters { get; set; }

// TODO: Dodělat další soubory, kvízy

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(c => c.Uuid);

            entity.Property(c => c.Uuid)
                .IsRequired();
        });


        modelBuilder.Entity<Chapter>(entity =>
        {
            entity.HasKey(ch => ch.Uuid);
            
            entity.HasOne(ch => ch.Course)
                .WithMany(c => c.Chapters)
                .HasForeignKey(c => c.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}