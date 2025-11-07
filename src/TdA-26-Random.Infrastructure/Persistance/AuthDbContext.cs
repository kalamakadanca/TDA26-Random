using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TdA_26_Random.Domain.Entities;

namespace TdA_26_Random.Infrastructure.Persistance;

public class AuthDbContext : IdentityDbContext<User>
{
    
}