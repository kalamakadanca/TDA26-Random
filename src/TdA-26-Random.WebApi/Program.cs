using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TdA_26_Random.Domain.Entities;
using TdA_26_Random.Infrastructure.Persistance;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<IdentityDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection"),
        b => b.MigrationsAssembly("TdA-26-Random.WebApi"));
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("TdA-26-Random.WebApi"));
});

// Konfigurace CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Development", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
    options.AddPolicy("Production", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<IdentityDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "AuthCookie";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
});

var app = builder.Build();


app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");

    if (!app.Environment.IsDevelopment())
    {
        context.Response.Headers.Append("Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;");
    }

    await next();
});


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

app.UseCors(app.Environment.IsDevelopment() ? "Development" : "Production");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.MapGet("/", () =>
{
    var html = "<h1>Hello TdA</h1>";
    return Results.Content(html, "text/html");
});

app.Run();
