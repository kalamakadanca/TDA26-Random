using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using TdA_26_Random.Application.Interfaces;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.WebApi.Controllers;

[ApiController]
[Route("/course")]
public class CourseController (ICourseService courseService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        return Ok(courseService.GetAllCourses());
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] Course course)
    {
        // TODO: Vytvořit kurz

        return Created();
    }
    
    
}
