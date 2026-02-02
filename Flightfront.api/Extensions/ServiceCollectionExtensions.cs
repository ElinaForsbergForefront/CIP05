using FlightFront.Application.Airports.Interfaces;
using FlightFront.Application.Airports.Queries.GetAllAirports;
using FlightFront.Application.Airports.Queries.SearchAirports;
using FlightFront.Application.Weather.Interfaces;
using FlightFront.Application.Weather.Queries.DecodeMetar;
using FlightFront.Application.Weather.Queries.GetMetar;
using FlightFront.Infrastructure.Airports;
using FlightFront.Infrastructure.Weather;

namespace Flightfront.api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<GetAllAirportsQueryHandler>();
        services.AddScoped<SearchAirportsQueryHandler>();
        services.AddScoped<GetMetarQueryHandler>();
        services.AddScoped<DecodeMetarQueryHandler>();

        return services;
    }

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Airports Repository
        services.AddHttpClient<IAirportsRepository, CsvAirportsRepository>();

        // Weather Repository
        services.AddHttpClient<IMetarRepository, CheckWxMetarRepository>((sp, client) =>
        {
            var baseUrl = configuration["CheckWx:BaseUrl"] 
                ?? throw new InvalidOperationException("CheckWx:BaseUrl is not configured");
            var apiKey = configuration["CheckWx:ApiKey"] 
                ?? throw new InvalidOperationException("CheckWx:ApiKey is not configured");

            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Add("X-API-Key", apiKey);
        });

        return services;
    }
}
