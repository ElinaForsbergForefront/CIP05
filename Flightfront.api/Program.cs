using Flightfront.api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<MetarService>((sp, client) =>
{
    var config = sp.GetRequiredService<IConfiguration>();

    client.BaseAddress = new Uri(config["CheckWx:BaseUrl"]!);
    client.DefaultRequestHeaders.Add("X-API-Key", config["CheckWx:ApiKey"]);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
