using System;
using System.Collections.Generic;
using System.Text;

namespace Flightfront.domain.Metar
{
    public class MetarWind
    {
        public String Direction { get; set; } = "-";
        public String Speed { get; set; } = "-";
        public String Gusts { get; set; } = "-";
    }
}
