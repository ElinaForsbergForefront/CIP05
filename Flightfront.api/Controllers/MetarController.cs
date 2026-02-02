using FlightFront.Application.Weather.Queries.GetMetar;
using FlightFront.Application.Weather.Queries.DecodeMetar;
using Microsoft.AspNetCore.Mvc;

namespace Flightfront.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MetarController : ControllerBase
{
    private readonly GetMetarQueryHandler _queryHandler;
    private readonly DecodeMetarQueryHandler _decodeHandler;

    public MetarController(
        GetMetarQueryHandler queryHandler,
        DecodeMetarQueryHandler decodeHandler)
    {
        _queryHandler = queryHandler;
        _decodeHandler = decodeHandler;
    }

    [HttpGet("{icao}")]
    public async Task<ActionResult<MetarDto>> GetByIcaoCode(string icao)
    {
        var query = new GetMetarQuery(icao);
        var metar = await _queryHandler.HandleAsync(query);

        if (metar is null)
            return NotFound(new { message = $"Ingen METAR hittades för {icao}" });

        return Ok(metar);
    }

    [HttpPost("decode")]
    public async Task<ActionResult<DecodedMetarDto>> DecodeMetar([FromBody] string metar)
    {
        var query = new DecodeMetarQuery(metar);
        var decodedMetar = await _decodeHandler.HandleAsync(query);

        if (decodedMetar is null)
            return NotFound(new { message = "Kunde inte tolka METAR" });

        return Ok(decodedMetar);
    }
}