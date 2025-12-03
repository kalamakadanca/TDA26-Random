using Microsoft.EntityFrameworkCore;
using TdA_26_Random.Application.Interfaces;
using TdA_26_Random.Domain.Entities;
using TdA_26_Random.Infrastructure.Persistance;

namespace TdA_26_Random.Application.Services;

public class CourseService(AppDbContext context) : ICourseService
{
    public async Task<bool> CreateCourse(Course course)
    {
        if (!string.IsNullOrEmpty(course.Title))
        {
            context.Courses.Add(course);
            await context.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<IEnumerable<Course>> GetAllCourses()
    {
        return await context.Courses.ToListAsync();
    }

    public async Task<Course?> GetCourseWithUUID(string uuid)
    {
        return await context.Courses.Include(c => c.Modules).FirstOrDefaultAsync(c => c.Uuid == uuid);
    }
}