using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace TdA_26_Random.WebApi.Controllers;

[ApiController]
[Route("/api/auth/")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        return NoContent();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        return NoContent();
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me() // Check if is authorized
    {
        return NoContent();
    }
}