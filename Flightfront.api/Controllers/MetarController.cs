using FlightFront.Application.Weather.Queries.GetMetar;
using Microsoft.AspNetCore.Mvc;
using Flightfront.Application.Features.Metar.Decode;
namespace Flightfront.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MetarController : ControllerBase
{
    private readonly GetMetarQueryHandler _queryHandler;

    public MetarController(GetMetarQueryHandler handler)
    {
        _queryHandler = handler;
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
    public async Task<IActionResult> GetMetar([FromBody] string metar)
    {
        var decoder = new MetarDecoder();
        var decodedMetar = await decoder.getDecodedMetar(metar);

        if (decodedMetar is null)
            return NotFound("Kunde inte tolka METAR");

        return Ok(decodedMetar);
    }
}