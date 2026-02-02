using System;
using System.Collections.Generic;
using System.Text;

namespace FlightFront.Application.Airports.Queries.SearchAirports
{
    public record AirportDto(
     string Icao,
     string Name,
     string? Municipality,
     string? Country
    );
}
