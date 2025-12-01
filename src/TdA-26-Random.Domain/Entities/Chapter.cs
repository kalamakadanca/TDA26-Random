namespace TdA_26_Random.Domain.Entities;

public class Chapter
{
    public string Uuid { get; set; } = Guid.NewGuid().ToString();

    public string CourseId { get; set; }
    public Course Course { get; set; }
}