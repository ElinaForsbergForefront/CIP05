using System;
using System.Collections.Generic;
using System.Text;

namespace FlightFront.Application.Weather.Queries.DecodeMetar
{
    public record DecodedMetarDto(
        string RawMetar,
        string Icao,
        DateTime Time,
        MetarWindDto Wind,
        int Visibility,
        string Weather,
        MetarCloudsDto[] Clouds,
        MetarTemperatureDto Temperature,
        string AirPressure
    );

    public record MetarWindDto(
        string Direction,
        string Speed,
        string Gusts
    );

    public record MetarCloudsDto(
        string CloudCover,
        int CloudHeight,
        string CloudType
    );

    public record MetarTemperatureDto(
        string Temperature,
        string DewPoint
    );
}
