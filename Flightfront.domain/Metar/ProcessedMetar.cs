using System;
using System.Collections.Generic;
using System.Text;

namespace Flightfront.domain.Metar
{
    public class ProcessedMetar
    {
        public String ICAO { get; set; } = "-";
        public DateTime Time { get; set; }
        public MetarWind Wind { get; set; } = new MetarWind();
        public String Visibility { get; set; } = "-";
        public String Weather { get; set; } = "-";
        public MetarClouds[] Clouds { get; set; } = Array.Empty<MetarClouds>();
        public MetarTemperature Temperature { get; set; } = new MetarTemperature();
        public String AirPressure { get; set; } = "-";
    }
}
