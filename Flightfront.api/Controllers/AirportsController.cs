using FlightFront.Application.Airports.Queries.SearchAirports;
using Microsoft.AspNetCore.Mvc;

namespace Flightfront.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AirportsController : ControllerBase
{
    private readonly SearchAirportsQueryHandler _queryHandler;

    public AirportsController(SearchAirportsQueryHandler queryHandler)
    {
        _queryHandler = queryHandler;
    }

    [HttpGet("search")]
    public async Task<ActionResult<IReadOnlyList<AirportDto>>> Search([FromQuery] string? searchTerm)
    {
        var query = new SearchAirportsQuery(searchTerm);
        var airports = await _queryHandler.Handle(query);

        return Ok(airports);
    }
}
