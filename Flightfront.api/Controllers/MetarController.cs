using Flightfront.api.Services;
using Microsoft.AspNetCore.Mvc;


using Flightfront.api.Services;
using Microsoft.AspNetCore.Mvc;
using Flightfront.application.Features.Metar.Decode;
namespace Flightfront.Api.Controllers;

[ApiController]
[Route("api/metar")]
public class MetarController : ControllerBase
{
    private readonly MetarService _metarService;

    public MetarController(MetarService metarService)
    {
        _metarService = metarService;
    }

    [HttpGet("{icao}")]
    public async Task<IActionResult> Get(string icao)
    {
        var metar = await _metarService.GetRawMetarAsync(icao);

        if (metar is null)
            return NotFound("Ingen METAR hittades");

        return Ok(new { rawMetar = metar });
    }

    [HttpGet("{METAR}")]
    public async Task<IActionResult> Decode(string metar)
    {
        var decoder = new MetarDecoder();
        var decodedMetar = await decoder.decodeMetar(metar);

        if (decodedMetar is null)
            return NotFound("Kunde inte tolka METAR");

        return Ok(decodedMetar);
    }
}