using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace TdA_26_Random.Domain.Entities;

public class Course
{
    [Key]
    public string Uuid { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; }
    public string? Description { get; set; }
    public List<Module>? Modules { get; set; }
}