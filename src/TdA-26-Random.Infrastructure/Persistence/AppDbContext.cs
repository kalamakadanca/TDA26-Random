using Microsoft.EntityFrameworkCore;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.Infrastructure.Persistance;

public class AppDbContext : DbContext
{
    public DbSet<Course> Courses { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
}