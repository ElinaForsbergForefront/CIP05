using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Flightfront.Application.Features.Metar.Decode.Util;
using Flightfront.domain.Metar;

namespace Flightfront.Application.Features.Metar.Decode
{
    public class MetarDecoder
    {
        public async Task<ProcessedMetar> getDecodedMetar(string metar)

        {
            var data = new ProcessedMetar();

            // remove everything after BECMG or TEMPO
            if (metar.Contains(" BECMG "))
            {
                metar = metar.Substring(0, metar.IndexOf(" BECMG "));
            }
            else if (metar.Contains(" TEMPO "))
            {
                metar = metar.Substring(0, metar.IndexOf(" TEMPO "));
            }

            var segments = metar.Split(' ');
            foreach (var segment in segments)
            {
                switch (GetSegmentType(segment))
                {
                    case SegmentType.Metar:
                        // Ignore
                        break;
                    case SegmentType.Station:
                        data.Station = (segment);
                        break;
                    case SegmentType.Time:
                        data.Time = DecoderUtil.TranslateTime(segment);
                        break;
                    case SegmentType.Wind:
                        data.Wind =  DecoderUtil.TranslateWind(segment);
                        break;
                    case SegmentType.Auto:
                        // Ignore
                        break;
                    case SegmentType.Visibility:
                        data.Visibility = DecoderUtil.TranslateVisibility(segment);
                        break;
                    case SegmentType.Clouds:
                        data.Clouds = data.Clouds.Concat(new[] { DecoderUtil.TranslateClouds(segment) }).ToArray();
                        break;
                    case SegmentType.Temperature:
                        data.Temperature = DecoderUtil.TranslateTemperatureDewPoint(segment);
                        break;
                    case SegmentType.AirPressure:
                        data.AirPressure = DecoderUtil.TranslateAirPressure(segment);
                        break;
                    case SegmentType.Weather:
                        data.Weather = DecoderUtil.TranslateWeather(segment);
                        break;
                    default:
                        // Unknown segment, ignore
                        break;
                }
            }

            return await Task.FromResult(new ProcessedMetar
            {
                Station = data.Station,
                Time = data.Time,
                Wind = data.Wind,   
                Visibility = data.Visibility,
                Weather = data.Weather,
                Clouds = data.Clouds,
                Temperature = data.Temperature,
                AirPressure = data.AirPressure
            });

        }


        // SEGMENT TYPE MOVED WHERE PLZ HELISH
        private enum SegmentType
        {
            Metar,
            Station,
            Time,
            Wind,
            Auto,
            Visibility,
            Clouds,
            Temperature,
            AirPressure,
            Weather,
            Unknown
        }

        private static SegmentType GetSegmentType(string segment)
        {
            if (segment == "METAR")
                return SegmentType.Metar;

            if (segment == "AUTO")
                return SegmentType.Auto;

            if (segment.EndsWith("Z") && segment.Length == 7)
                return SegmentType.Time;

            if (segment.EndsWith("KT"))
                return SegmentType.Wind;

            if (segment.Length == 4 && Char.IsDigit(segment[0]) && Char.IsDigit(segment[1]) && Char.IsDigit(segment[2]) && Char.IsDigit(segment[3]))
                return SegmentType.Visibility;

            if (segment.StartsWith("FEW") || segment.StartsWith("SCT") || segment.StartsWith("BKN") || segment.StartsWith("OVC"))
                return SegmentType.Clouds;

            if (segment.Contains("/"))
                return SegmentType.Temperature;

            if (segment.StartsWith("Q") || segment.StartsWith("A"))
                return SegmentType.AirPressure;

            if (segment.StartsWith("-") || segment.StartsWith("+") || segment.Length == 1)
                return SegmentType.Weather;

            if (segment.Length == 4 && Char.IsLetter(segment[0]) && Char.IsLetter(segment[1]) && Char.IsLetter(segment[2]) && Char.IsLetter(segment[3]))
                return SegmentType.Station;

            return SegmentType.Unknown;
        }

    }
}
