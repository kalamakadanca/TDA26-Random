using Microsoft.EntityFrameworkCore;
using TdA_26_Random.Application.Interfaces;
using TdA_26_Random.Domain.Entities;
using TdA_26_Random.Infrastructure.Persistance;

namespace TdA_26_Random.Application.Services;

public class CourseService(AppDbContext context) : ICourseService
{
    // TODO
    public async Task<bool> CreateCourse(Course course)
    {
        if (!string.IsNullOrEmpty(course.Title) && !string.IsNullOrEmpty(course.Description))
        {
            context.Courses.Add(course);
            await context.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<IEnumerable<Course>> GetAllCourses()
    {
        return context.Courses.Include(c => c.Chapters);
    }

    public async Task<Course> GetCourseWithUUID(string uuid)
    {
        throw new NotImplementedException();
    }
}