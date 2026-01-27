using System;
using System.Collections.Generic;
using System.Text;
using FlightFront.Application.Airports.Queries.SearchAirports;

namespace FlightFront.Application.Airports.Interfaces
{
    public interface IAirportsRepository
    {
        Task<IReadOnlyList<AirportDto>> GetAllAsync();
    }
}
