using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.Application.Interfaces;

public interface ICourseService
{
    Task<bool> CreateCourse(Course course);
    Task<IEnumerable<Course>> GetAllCourses();
    Task<Course?> GetCourseWithUUID(string uuid);
    
}