using System;
using System.Collections.Generic;
using System.Text;

namespace Flightfront.domain.Metar
{
    public class ProcessedMetar
    {
        public String Station { get; set; } = string.Empty;
        public String Time { get; set; } = string.Empty;
        public String Wind { get; set; } = string.Empty;
        public String Visibility { get; set; } = string.Empty;
        public String Weather { get; set; } = string.Empty;
        public String[] Clouds { get; set; } = Array.Empty<String>();
        public String Temperature { get; set; } = string.Empty;
        public String AirPressure { get; set; } = string.Empty;
    }
}
