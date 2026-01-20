using Flightfront.domain.Metar;
using System.Net.Http.Json;

namespace Flightfront.api.Services
{
    public class MetarService
    {
        private readonly HttpClient _httpClient;

        public MetarService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string?> GetRawMetarAsync(string icao)
        {
            var response = await _httpClient.GetFromJsonAsync<CheckWxResponse>(
                $"metar/{icao.ToUpper()}"
            );

            if (response?.Data?.Count > 0)
                return response.Data[0];

            return null;
        }

        private class CheckWxResponse
        {
            public List<string> Data { get; set; } = [];
        }
    }
}
