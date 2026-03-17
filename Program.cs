using System.Text;
using MarketPlace.Data;
using MarketPlace.Repository.Implementations;
using MarketPlace.Repository.Interface;
using MarketPlace.Security;
using MarketPlace.Service.Implemetations;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;


var builder = WebApplication.CreateBuilder(args);




// 1. Configuración de Base de Datos
builder.Services.AddDbContext<MarketPlaceContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 3. Configuración de Autenticación (JWT)
var key = builder.Configuration["Jwt:Key"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
    });

// 4. Inyección de Dependencias
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<JwtService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 5. Configuración de Swagger
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

    s.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    s.OperationFilter<AuthOperationFilter>();
});

var app = builder.Build();

// ========================================================================
// ⚠️ PIPELINE DE MIDDLEWARES (EL ORDEN AQUÍ ES CRÍTICO)
// ========================================================================

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger();
    app.UseSwaggerUI(s =>
    {
        s.SwaggerEndpoint("/swagger/v1/swagger.json", "MarketPlace API v1");
        s.RoutePrefix = "swagger";
    });
}

// Paso A: Redirigir a HTTPS
app.UseHttpsRedirection();

// Paso B: Habilitar el enrutamiento (Buena práctica explícita en .NET)
app.UseRouting();

// Paso C: CORS (¡Debe ir exactamente aquí! Después de Routing y antes de Auth)
app.UseCors("AllowAll");

// Paso D: Autenticación y Autorización
app.UseAuthentication();
app.UseAuthorization();

// Paso E: Mapear los controladores
app.MapControllers();

app.Run();