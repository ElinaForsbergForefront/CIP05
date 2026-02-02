using System;
using System.Collections.Generic;
using System.Text;

namespace Flightfront.domain.Metar
{
    public class MetarClouds
    {
        public String CloudCover { get; set; } = "-";
        public int CloudHeight { get; set; }
        public String CloudType { get; set; } = "-";
    }
}
