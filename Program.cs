using MarketPlace.Data;
using MarketPlace.Repository.Implementations;
using MarketPlace.Repository.Interface;
using MarketPlace.Service.Implemetations;
using MarketPlace.Service.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MarketPlaceContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductService, ProductService>();


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen( s =>
{
    s.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MarketPlace API",
        Version = "v1",
        Description = "MarketPlace API", 
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI( s =>
    {
        s.SwaggerEndpoint("/swagger/v1/swagger.json", "MarketPlace API v1");
        s.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};



app.Run();
