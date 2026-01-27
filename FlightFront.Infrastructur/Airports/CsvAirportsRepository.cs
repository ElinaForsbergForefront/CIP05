using FlightFront.Application.Airports.Interfaces;
using FlightFront.Application.Airports.Queries.SearchAirports;

namespace FlightFront.Infrastructure.Airports;

public class CsvAirportsRepository : IAirportsRepository
{
    private const string CsvUrl = "https://davidmegginson.github.io/ourairports-data/airports.csv";
    private static readonly SemaphoreSlim _semaphore = new(1, 1);
    private static IReadOnlyList<AirportDto>? _airports;

    private readonly HttpClient _httpClient;

    public CsvAirportsRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IReadOnlyList<AirportDto>> GetAllAsync()
    {
        if (_airports is not null)
            return _airports;

        await _semaphore.WaitAsync();
        try
        {
            if (_airports is not null)
                return _airports;

            var csvData = await _httpClient.GetStringAsync(CsvUrl);
            _airports = CsvParser.ParseAirports(csvData);
            
            return _airports;
        }
        finally
        {
            _semaphore.Release();
        }
    }
}
