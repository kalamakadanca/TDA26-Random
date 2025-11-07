using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.WebApi.Controllers;

[ApiController]
[Route("/api/auth/")]
public class AuthController(SignInManager<User> signInManager, UserManager<User> userManager) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password)) return BadRequest("You have entered wrong arguments!");

        var res = await signInManager.PasswordSignInAsync(request.Email, request.Password, true, false);

        if (res.Succeeded)
        {
            return Ok();
        }

        return BadRequest("Login was unsuccessful");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password)) return BadRequest("You have entered wrong arguments!");

        var user = new User() { Email = request.Email, UserName = request.Email };

        var res = await userManager.CreateAsync(user, request.Password);

        if (res.Succeeded)
        {
            signInManager.SignInAsync(user, true);
            
            return Ok();
        }

        return BadRequest("Something went wrong");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return Ok();
    }
    
    [HttpGet("me")]
    public async Task<IActionResult> Me() // Check if is authorized
    {
        return NoContent();
    }
}