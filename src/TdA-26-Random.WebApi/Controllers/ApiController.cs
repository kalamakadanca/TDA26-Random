﻿using Microsoft.AspNetCore.Mvc;

namespace TdA_26_Random.WebApi.Controllers;

[ApiController]
[Route("/api/")]
public class ApiController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetOrganization()
    {
        return Ok("{ \"organization\": \"Student Cyber Games\" }");
    }
}