using Microsoft.Extensions.Configuration;

namespace TdA_26_Random.Application.Services;

public class JWTService
{
    private readonly IConfiguration _configuration;

    public JWTService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(string usedId, string email, IEnumerable<string> roles)
    {
        return ""; // TODO:
    }
}