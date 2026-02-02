using Flightfront.domain.Metar;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text;


namespace Flightfront.Application.Features.Metar.Decode.Util
{
    public class DecoderUtil
    {
        public static DateTime TranslateTime(String time)
        {
            String day = time.Substring(0, 2);
            String month = DateTime.Now.Month.ToString("D2");
            String year = DateTime.Now.Year.ToString();
            String hour = time.Substring(2, 2);
            String minute = time.Substring(4, 2);

            String dateString = $"{year}{month}{day}{hour}{minute}";

            DateTime formattedDate = DateTime.ParseExact(dateString, "yyyyMMddHHmm", null);
            return formattedDate;
        }

        public static int TranslateVisibility(String visibility)
        {
            int.TryParse(visibility, out int meters);
            return meters;
        }

        public static MetarWind TranslateWind(String wind)
        {
            var result = new MetarWind();
            // Example: 21009G19KT or 27005KT
            String direction = wind.Substring(0, 3);
            String speedPart = wind.Substring(3);
            String speed = "";
            String gusts = "";
            
            if (speedPart.Contains("G"))
            {
                var speedGustParts = speedPart.Split('G');
                speed = RemoveLeadingZeros(speedGustParts[0]);
                gusts = RemoveLeadingZeros(speedGustParts[1].Replace("KT", ""));
            }
            else
            {
                speed = RemoveLeadingZeros(speedPart.Replace("KT", ""));
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
            var parts = tempDewPoint.Split('/');
            if (parts.Length == 2)
            {
                String temperatureRaw = parts[0];
                String dewPointRaw = parts[1];
                
                // Handle temperature
                String temperature;
                if (temperatureRaw.StartsWith("M"))
                {
                    temperature = "-" + RemoveLeadingZeros(temperatureRaw.Substring(1));
                }
                else
                {
                    temperature = RemoveLeadingZeros(temperatureRaw);
                }
                
                // Handle dew point
                String dewPoint;
                if (dewPointRaw.StartsWith("M"))
                {
                    dewPoint = "-" + RemoveLeadingZeros(dewPointRaw.Substring(1));
                }
                else
                {
                    dewPoint = RemoveLeadingZeros(dewPointRaw);
                }
                
                return new MetarTemperature
                {
                    Temperature = temperature,
                    DewPoint = dewPoint
                };
            }
            
            return new MetarTemperature
            {
                Temperature = tempDewPoint,
                DewPoint = "-"
            };
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
            int cloudHeight = Int32.TryParse(height, out var temp) ? temp * 100 : 0;
            String type = cloudCondition.Length > 6 ? cloudCondition.Substring(6) : "-";
            return ( new MetarClouds
            {
                CloudCover = cover,
                CloudHeight = cloudHeight,
                CloudType = type
            });
                
        }

        private static string RemoveLeadingZeros(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;

            // Handle edge case: "00" should become "0", not empty string
            if (int.TryParse(value, out var number))
                return number.ToString();

            return value;
        }
    }
}
