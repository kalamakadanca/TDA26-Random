using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.Application.Interfaces;

public interface ICourseService
{
    Task<bool> CreateCourse(Course course);
    Task<IEnumerable<Course>> GetAllCourses();
    Task<Course?> GetCourseInfoWithUuid(string uuid);
    Task<bool> DeleteCourseWithUUID(string uuid);
    Task<List<Module>> GetModulesForCourse(string uuid);
    Task<bool> CreateModuleWithUuid(string courseUuid, string title, List<string> text);
    
    
}