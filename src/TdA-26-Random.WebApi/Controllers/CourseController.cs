using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using TdA_26_Random.Application.Interfaces;
using TdA_26_Random.Domain.Entities;
using TdA_26_Random.WebApi.Models.Requests;

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

        var course = await courseService.GetCourseInfoWithUuid(uuid);

        return course is null ? NotFound() : Ok(course);
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
        if (string.IsNullOrEmpty(uuid)) return BadRequest();

        var res = await courseService.DeleteCourseWithUUID(uuid);

        return res ? Ok() : Problem();
    }

    [HttpGet("modules/{uuid}")]
    public async Task<IActionResult> GetModulesForCourseWithUuid(string uuid)
    {
        var res = await courseService.GetModulesForCourse(uuid);

        return res is null
            ? Problem("An error occured while adding module")
            : Ok(res);
    }

    [HttpPost("modules")]
    public async Task<IActionResult> CreateModuleForCourse(AddModuleModel model)
    {
        var res = await courseService.CreateModuleWithUuid(model.Uuid, model.Title, model.Text);

        return res ? Ok("Module has been added") : Problem("Something went wrong while adding module");
    }
}