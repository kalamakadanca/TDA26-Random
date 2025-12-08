using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TdA_26_Random.Application.Interfaces;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.WebApi.Controllers;

[Authorize]
[ApiController]
[Route("/api/courses/")]
public class CourseController(ICourseService courseService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        return Ok(await courseService.GetAllCourses());
    }

    [HttpGet("{uuid}")]
    public async Task<IActionResult> GetCourseWithUuid(string uuid)
    {
        if (string.IsNullOrEmpty(uuid)) return BadRequest();

        var course = await courseService.GetCourseWithUUID(uuid);

        return course is null ? NotFound() : Ok(course);
    }

    [HttpGet("{uuid}")]
    public async Task<IActionResult> GetModulesForCourseWithUuid(string uuid)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] string title)
    {
        if (string.IsNullOrEmpty(title)) return BadRequest();

        Course course = new Course { Title = title };

        bool created = await courseService.CreateCourse(course);

        return created ? Ok(course.Uuid) : Problem();
    }

    [HttpDelete("{uuid}")]
    public async Task<IActionResult> DeleteCourse(string uuid)
    {
        if(string.IsNullOrEmpty(uuid)) return BadRequest();

        var res = await courseService.DeleteCourseWithUUID(uuid);

        return res ? Ok() : Problem();
    }
}