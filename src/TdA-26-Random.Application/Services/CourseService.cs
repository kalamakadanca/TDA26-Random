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

    public async Task<Course?> GetCourseWithUuid(string uuid)
    {
        return await context.Courses.Include(c => c.Modules).FirstOrDefaultAsync(c => c.Uuid == uuid);
    }

    public async Task<bool> DeleteCourseWithUUID(string uuid)
    {
        var course = await context.Courses.FirstOrDefaultAsync(c => c.Uuid == uuid);

        if (course is not null)
        {
            context.Courses.Remove(course);
            await context.SaveChangesAsync();
            return true;
        }

        return false;
    }


    public async Task<List<Module>> GetModulesForCourse(string uuid)
    {
        var course = await context.Courses.Include(c => c.Modules).FirstOrDefaultAsync(c => c.Uuid == uuid);

        return course?.Modules ?? new List<Module>();
    }

    public async Task<bool> CreateModuleWithUuid(string courseUuid, string title, List<string> text)
    {
        try
        {
            var module = new Module() { Title = title, Text = text };

            var course = await context.Courses.Include(c => c.Modules).FirstOrDefaultAsync(c => c.Uuid == courseUuid);

            if (course is null) return false;

            course.Modules.Add(module);

            await context.SaveChangesAsync();

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"ERROR: {e.Message}");
            return false;
        }
    }
}