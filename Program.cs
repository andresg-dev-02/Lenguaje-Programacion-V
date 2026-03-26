using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MarketPlace.Data;
using MarketPlace.Models;
using MarketPlace.Repository.Implementations;
using MarketPlace.Repository.Interface;
using MarketPlace.Security;
using MarketPlace.Security.Interface;
using MarketPlace.Service.Implemetations;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MarketPlaceContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var key = builder.Configuration["Jwt:Key"] ?? throw new Exception("CRITICAL: 'Jwt:Key' no encontrado en la configuración.");


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                var tokenPrincipalId = context.Principal.FindFirstValue(JwtRegisteredClaimNames.Jti);
                var refreshTokenRepository = context.HttpContext.RequestServices.GetRequiredService<IGenericRepository<Refreshtoken>>();
                var tokenDB = await refreshTokenRepository.FirstOrDefaultAsync(t => t.Tokenprincipalid == tokenPrincipalId);
                if (tokenDB == null || tokenDB.Expiration < DateTime.Now || tokenDB.Isrevoked == true)
                    context.Fail("Invalid token");
            }
        };
    });

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IHistorySaleService, HistorySaleService>();


builder.Services.AddControllers();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("admin", policy =>
        policy.RequireRole("admin"));

    options.AddPolicy("comprador", policy =>
        policy.RequireRole("comprador"));

    options.AddPolicy("AdminOComprador", policy => 
        policy.RequireRole("admin", "comprador"));
});
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(s =>
{
    s.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MarketPlace API",
        Version = "v1",
        Description = "MarketPlace API"
    });

    s.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token"
    });

    s.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = []
    });

    s.OperationFilter<AuthOperationFilter>();
});

var app = builder.Build();

// 2. EL ORDEN CORRECTO DE MIDDLEWARES PARA ARREGLAR CORS
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger();
    app.UseSwaggerUI(s =>
    {
        s.SwaggerEndpoint("/swagger/v1/swagger.json", "MarketPlace API v1");
        s.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.UseRouting();

// CORS DEBE IR AQUÍ (Entre Routing y Authentication)
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();