using System;
using System.Collections.Generic;
using System.Text;


namespace Flightfront.application.Features.Metar.Decode.Util
{
    public class DecoderUtil
    {
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


        public static String TranslateWeather(String weather)
        {
            // Example: -RA, +SN, FG
            return weather;
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

        public static String TranslateClouds(String cloudCondition)
        {
            // Example: FEW007, BKN014CB
            String amount = cloudCondition.Substring(0, 3);
            String height = cloudCondition.Substring(3, 3);
            String type = cloudCondition.Length > 6 ? cloudCondition.Substring(6) : "-";
            return "Amount: " + amount + ", Height: " + height + " feet, Type: " + type;
        }

    }
}
