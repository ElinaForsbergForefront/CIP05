using System;
using System.Collections.Generic;
using System.Text;
using FlightFront.Application.Airports.Interfaces;

namespace FlightFront.Application.Airports.Queries.SearchAirports
{
    public class SearchAirportsQueryHandler
    {
        private const int MaxResults = 50;
        private readonly IAirportsRepository _airportsRepository;

        public SearchAirportsQueryHandler(IAirportsRepository airportsRepository)
        {
            _airportsRepository = airportsRepository;
        }

        public async Task<IReadOnlyList<AirportDto>> Handle(SearchAirportsQuery query)
        {
            var allAirports = await _airportsRepository.GetAllAsync();

            if (string.IsNullOrWhiteSpace(query.SearchTerm))
                return allAirports.Take(MaxResults).ToList();

            var searchTerm = query.SearchTerm.Trim();
            var matchingAirports = allAirports
                .Where(airport => MatchesSearchTerm(airport, searchTerm))
                .Take(MaxResults)
                .ToList();

            return matchingAirports;
        }

        private static bool MatchesSearchTerm(AirportDto airport, string searchTerm)
        {
            return airport.Icao.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                   airport.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                   (airport.Municipality?.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ?? false) ||
                   (airport.Country?.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ?? false);
        }
    }
}
