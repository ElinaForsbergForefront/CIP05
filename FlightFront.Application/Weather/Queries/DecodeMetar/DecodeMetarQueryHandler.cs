using Flightfront.Application.Features.Metar.Decode;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightFront.Application.Weather.Queries.DecodeMetar
{
    public class DecodeMetarQueryHandler
    {
        private readonly MetarDecoder _decoder;

        public DecodeMetarQueryHandler()
        {
            _decoder = new MetarDecoder();
        }

        public async Task<DecodedMetarDto?> HandleAsync(DecodeMetarQuery query)
        {
            var decoded = await _decoder.getDecodedMetar(query.RawMetar);

            if (decoded is null)
                return null;

            return new DecodedMetarDto(
                RawMetar: query.RawMetar,
                Icao: decoded.ICAO,
                Time: decoded.Time,
                Wind: new MetarWindDto(
                    decoded.Wind.Direction,
                    decoded.Wind.Speed,
                    decoded.Wind.Gusts
                ),
                Visibility: decoded.Visibility,
                Weather: decoded.Weather,
                Clouds: decoded.Clouds.Select(c => new MetarCloudsDto(
                    c.CloudCover,
                    c.CloudHeight,
                    c.CloudType
                )).ToArray(),
                Temperature: new MetarTemperatureDto(
                    decoded.Temperature.Temperature,
                    decoded.Temperature.DewPoint
                ),
                AirPressure: decoded.AirPressure
            );
        }
    }
}
