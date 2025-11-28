using System.ComponentModel.DataAnnotations;

namespace TdA_26_Random.Domain.Entities;

public class Course
{
    [Key]
    public string Uuid { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; }
    public string Description { get; set; }
    public List<Chapter> Chapters { get; set; }
    

    public Course(string title, string description)
    {
        Title = title;
        Description = description;
        
    }
}