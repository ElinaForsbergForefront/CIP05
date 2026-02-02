using FlightFront.Application.Airports.Interfaces;
using FlightFront.Application.Airports.Queries.SearchAirports;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightFront.Application.Airports.Queries.GetAllAirports
{
    public class GetAllAirportsQueryHandler
    {
        private const int MaxLimit = 150;
        private const int AirportsPerCountry = 5;

        private static readonly string[] PopularCountries =
        [
            "US", "GB", "DE", "FR", "ES", "IT", "NL", "SE", "NO", "DK",
            "FI", "IE", "CH", "AT", "BE", "PT", "GR", "CA", "AU", "JP",
            "CN", "IN", "BR", "MX", "AR", "ZA", "NZ", "SG", "TH", "AE"
        ];

        private readonly IAirportsRepository _airportsRepository;

        public GetAllAirportsQueryHandler(IAirportsRepository airportsRepository)
        {
            _airportsRepository = airportsRepository;
        }

        public async Task<IReadOnlyList<AirportDto>> Handle(GetAllAirportsQuery query)
        {
            var allAirports = await _airportsRepository.GetAllAsync();

            if (!query.Limit.HasValue)
                return allAirports;

            var effectiveLimit = Math.Min(query.Limit.Value, MaxLimit);

            var diverseAirports = new List<AirportDto>();

            foreach (var country in PopularCountries)
            {
                var countryAirports = allAirports
                    .Where(a => a.Country == country)
                    .Take(AirportsPerCountry);

                diverseAirports.AddRange(countryAirports);

                if (diverseAirports.Count >= effectiveLimit)
                    break;
            }

            return diverseAirports.Take(effectiveLimit).ToList();
        }
    }
}
