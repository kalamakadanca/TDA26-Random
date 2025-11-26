using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.WebApi.Controllers;

[ApiController]
[Route("/course")]
public class CourseController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        // TODO: Vrátí všechny tasky
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] Course course)
    {
        // TODO: Vytvořit kurz

        return Created();
    }
    
    
}