using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Text;

namespace Flightfront.application.Metar.Decode
{
    internal class MetarDecoder
    {
        public static void decodeMetar(string metar)
        {
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
                        Console.WriteLine("Station: " + segment);
                        break;
                    case SegmentType.Time:
                        Console.WriteLine("Time: " + TranslateTime(segment));
                        break;
                    case SegmentType.Wind:
                        Console.WriteLine("wind: " + TranslateWind(segment));
                        break;
                    case SegmentType.Auto:
                        // Ignore
                        break;
                    case SegmentType.Visibility:
                        Console.WriteLine("Visibility: " + TranslateVisibility(segment));
                        break;
                    case SegmentType.Clouds:
                        Console.WriteLine("Clouds: " + TranslateClouds(segment));
                        break;
                    case SegmentType.Temperature:
                        Console.WriteLine("Temperature: " + TranslateTemperatureDewPoint(segment));
                        break;
                    case SegmentType.AirPressure:
                        Console.WriteLine("AirPressure: " + TranslateAirPressure(segment));
                        break;
                    case SegmentType.Weather:
                        Console.WriteLine("Weather: " + segment);
                        break;
                    case SegmentType.Unknown:
                        // Ignore other segments like BECMG, TEMPO, etc.
                        break;
                }
            }
            // Remove METAR or SPECI prefix
            // Extract station identifier
            // Extract observation time (day of month, hour, minute) end with 'Z'
            // Extract wind information (direction, speed, gusts, variable direction) end with 'KT'
            // extract visibility information (in meters or statute miles)
            // Extract weather phenomena (e.g., RA for rain, SN for snow)  SN -SN RA -RA FG BR
            // Extract sky conditions (e.g., FEW007, BKN014CB) end with cloud type or altitude KOLLA (FEW SCT BKN OVC) + bas
            // Extract temperature and dew point (e.g., 02/M01)
            // Extract air pressure (e.g., Q1001 or A2992) starts with Q or A
            // Ignore recent weather trends (e.g., BECMG, TEMPO)
        }

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

        public static String TranslateTime(String time)
        {
            String day = time.Substring(0, 2);
            String hour = time.Substring(2, 2);
            String minute = time.Substring(4, 2);
            return day + " day(s) " + hour + " hour(s) " + minute + " minute(s) UTC";
        }

        public static String TranslateVisibility(String visibility)
        {
            if (visibility.Length == 4 && int.TryParse(visibility, out int visMeters))
            {
                return visMeters + " meters";
            }
            return visibility;
        }

        public static String TranslateWind(String wind)
        {
            // Example: 21009G19KT or 060V130 5000
            String direction = wind.Substring(0, 3);
            String speedPart = wind.Substring(3);
            String speed = "";
            String gusts = "";
            if (speedPart.Contains("G"))
            {
                var speedGustParts = speedPart.Split('G');
                speed = speedGustParts[0];
                gusts = speedGustParts[1].Replace("KT", "");
            }
            else
            {
                speed = speedPart.Replace("KT", "");
            }
            String result = "Direction: " + direction + "°, Speed: " + speed + " KT";
            if (!string.IsNullOrEmpty(gusts))
            {
                result += ", Gusts: " + gusts + " KT";
            }
            return result;
        }

        public static String TranslateAirPressure(String airPressure)
        {
            if (airPressure.StartsWith("Q"))
            {
                String pressureValue = airPressure.Substring(1);
                return pressureValue + " hPa";
            }
            else if (airPressure.StartsWith("A"))
            {
                String pressureValue = airPressure.Substring(1);
                return pressureValue + " inHg";
            }
            return airPressure;
        }

        public static String TranslateTemperatureDewPoint(String tempDewPoint)
        {
            var parts = tempDewPoint.Split('/');
            if (parts.Length == 2)
            {
                String temperature = parts[0];
                String dewPoint = parts[1];
                return "Temperature: " + temperature + "°C, Dew Point: " + dewPoint + "°C";
            }
            return tempDewPoint;
        }

        public static String TranslateClouds(String cloudCondition)
        {
            // Example: FEW007, BKN014CB
            String amount = cloudCondition.Substring(0, 3);
            String height = cloudCondition.Substring(3, 3);
            String type = cloudCondition.Length > 6 ? cloudCondition.Substring(6) : "-";
            return "Amount: " + amount + ", Height: " + height + " feet, Type: " + type;
        }

        public static String TranslateWeather(String weather)
        {
            // Example: -RA, +SN, FG
            return weather;
        }

    }
}
