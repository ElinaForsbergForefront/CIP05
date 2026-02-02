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
            return allAirports.Take(effectiveLimit).ToList();
        }
    }
}
