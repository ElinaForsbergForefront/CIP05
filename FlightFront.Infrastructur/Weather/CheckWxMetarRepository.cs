using FlightFront.Application.Weather.Interfaces;
using FlightFront.Application.Weather.Queries.GetMetar;
using System.Net.Http.Json;

namespace FlightFront.Infrastructure.Weather
{
    public class CheckWxMetarRepository : IMetarRepository
    {
        private readonly HttpClient _httpClient;

        public CheckWxMetarRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<MetarDto?> GetByIcaoCode(string icaoCode)
        {
            var response = await _httpClient.GetFromJsonAsync<CheckWxResponse>(
                $"metar/{icaoCode.ToUpper()}"
            );

            if (response?.Data?.Count > 0)
                return new MetarDto(response.Data[0]);

            return null;
        }

        private record CheckWxResponse(List<string> Data);
    }
}
