using FlightFront.Application.Airports.Queries.GetAllAirports;
using FlightFront.Application.Airports.Queries.SearchAirports;
using Microsoft.AspNetCore.Mvc;

namespace Flightfront.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AirportsController : ControllerBase
{
    private readonly SearchAirportsQueryHandler _queryHandler;
    private readonly GetAllAirportsQueryHandler _getAllHandler;

    public AirportsController(SearchAirportsQueryHandler queryHandler, GetAllAirportsQueryHandler getAllHandler)
    {
        _queryHandler = queryHandler;
        _getAllHandler = getAllHandler;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AirportDto>>> GetAll([FromQuery] int? limit = null)
    {
        var query = new GetAllAirportsQuery(limit);
        var result = await _getAllHandler.Handle(query);
        return Ok(result);
    }

    [HttpGet("search/{searchTerm?}")]
    public async Task<ActionResult<IReadOnlyList<AirportDto>>> Search(string? searchTerm)
    {
        var query = new SearchAirportsQuery(searchTerm);
        var airports = await _queryHandler.Handle(query);

        return Ok(airports);
    }
}
