using Flightfront.domain.Metar;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text;


namespace Flightfront.Application.Features.Metar.Decode.Util
{
    public class DecoderUtil
    {
        public static String TranslateTime(String time)
        {
            String day = time.Substring(0, 2);
            String hour = time.Substring(2, 2);
            String minute = time.Substring(4, 2);
            return day + hour + minute;
        }

        public static String TranslateVisibility(String visibility)
        {
            if (visibility.Length == 4 && int.TryParse(visibility, out int Meters))
            {
                return Meters.ToString();
            }
            return visibility;
        }

        public static MetarWind TranslateWind(String wind)
        {
            var result = new MetarWind();
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
            result.Direction = direction;
            result.Speed = speed;
            if (!string.IsNullOrEmpty(gusts))
            {
                result.Gusts = gusts;
            }
            return result;
        }


        public static MetarTemperature TranslateTemperatureDewPoint(String tempDewPoint)
        {
            var parts = tempDewPoint.Split('%');
            if (parts.Length == 2)
            {
                String temperature = parts[0];
                String half = parts[1];
                String dewPoint = "";

                //WILL BE MOVED
                if (half.Contains("M"))
                {
                    dewPoint = "-";
                    dewPoint += half.Substring(half.Length-2);
                }
                else
                {
                    dewPoint += half.Substring(half.Length - 2);
                }
                return ( new MetarTemperature
                {
                    Temperature = temperature,
                    DewPoint = dewPoint
                });
            }
            return ( new MetarTemperature
            {
                Temperature = tempDewPoint,
                DewPoint = "-"
            });
        }


        public static String TranslateWeather(String weather)
        {
            // BEHÖVER VI ALLA TYP 30 VÄDERKODER? PLZ NO
            // WILL BE MOVED
            switch (weather)
            {
                case "-RA":
                    return "Light Rain";
                case "+RA":
                    return "Heavy Rain";
                case "RA":
                    return "Rain";
                case "-SN":
                    return "Light Snow";
                case "+SN":
                    return "Heavy Snow";
                case "SN":
                    return "Snow";
                case "FG":
                    return "Fog";
                case "BR":
                    return "Mist";
                case "DZ":
                    return "Drizzle";
                case "TS":
                    return "Thunderstorm";
                default:
                    return "-";
            }
        }

        public static String TranslateAirPressure(String airPressure)
        {
            if (airPressure.StartsWith("Q"))
            {
                String pressureValue = airPressure.Substring(1);
                return pressureValue;
            }
            else if (airPressure.StartsWith("A"))
            {
                String pressureValue = airPressure.Substring(1);
                return pressureValue;
            }
            return airPressure;
        }

        public static MetarClouds TranslateClouds(String cloudCondition)
        {
            //HAVE TO GET DIFFERENT TYPES ASWELL :(((((
            // WILL BE MOVED
            String cover = cloudCondition.Substring(0, 3);
            switch (cover)
            {
                case "FEW":
                    cover = "Few";
                    break;
                case "SCT":
                    cover = "Scattered";
                    break;
                case "BKN":
                    cover = "Broken";
                    break;
                case "OVC":
                    cover = "Overcast";
                    break;
                default:
                    cover = "-";
                    break;
            }
            String height = cloudCondition.Substring(3, 3);
            String type = cloudCondition.Length > 6 ? cloudCondition.Substring(6) : "-";
            return ( new MetarClouds
            {
                CloudCover = cover,
                CloudHeight = height,
                CloudType = type
            });
                
        }

    }
}
