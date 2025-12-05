namespace TdA_26_Random.Domain.Entities;

public class Module
{
    public string Uuid { get; set; } = Guid.NewGuid().ToString();
    public string CourseId { get; set; }
    public Course Course { get; set; }

    public required string Title { get; set; }
    public required string[] Text { get; set; }
    
    
}