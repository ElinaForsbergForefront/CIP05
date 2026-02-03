namespace FlightFront.Application.Tests
{
    using Flightfront.Application.Features.Metar.Decode;
    using NUnit.Framework;

    public class Tests
    {
        private MetarDecoder _metarDecoder;

        [SetUp]
        public void Setup()
        {
            _metarDecoder = new MetarDecoder();
        }

        [Test]
        public void TestValidMetarWithMetarKeyword()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034 RMK AO2 SLP279 T10441172";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.ICAO, Is.EqualTo("KJFK"));
            Assert.That(result.Wind.Direction, Is.EqualTo("310"));
            Assert.That(result.Wind.Speed, Is.EqualTo("08"));
        }

        [Test]
        public void TestValidMetarWithSpeciKeyword()
        {
            // Arrange
            string metar = "SPECI KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.ICAO, Is.EqualTo("KJFK"));
        }

        [Test]
        public void TestInvalidMetarWithoutMetarOrSpeci()
        {
            // Arrange
            string metar = "KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034";

            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(() => _metarDecoder.getDecodedMetar(metar));
        }

        [Test]
        public void TestMetarWithVariableWind()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z VRB05KT 10SM FEW250 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Wind.Direction, Is.EqualTo("Variable"));
            Assert.That(result.Wind.Speed, Is.EqualTo("05"));
        }

        [Test]
        public void TestMetarWithWindGusts()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008G19KT 10SM FEW250 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Wind.Speed, Is.EqualTo("08"));
            Assert.That(result.Wind.Gusts, Is.EqualTo("19"));
        }

        [Test]
        public void TestMetarWithMultipleClouds()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW100 SCT200 BKN300 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Clouds.Length, Is.GreaterThanOrEqualTo(3));
            Assert.That(result.Clouds[0].CloudCover, Is.EqualTo("Few"));
            Assert.That(result.Clouds[1].CloudCover, Is.EqualTo("Scattered"));
            Assert.That(result.Clouds[2].CloudCover, Is.EqualTo("Broken"));
        }

        [Test]
        public void TestMetarWithTemperatureDewPoint()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 15/10 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Temperature.Temperature, Is.EqualTo("15"));
            Assert.That(result.Temperature.DewPoint, Is.EqualTo("10"));
        }

        [Test]
        public void TestMetarWithNegativeTemperature()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Temperature.Temperature, Is.EqualTo("M04"));
            Assert.That(result.Temperature.DewPoint, Is.EqualTo("-17"));
        }

        [Test]
        public void TestMetarWithWeather()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM -RA FEW250 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Weather, Is.EqualTo("Light Rain"));
        }

        [Test]
        public void TestMetarWithAirPressureQ()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 M04/M17 Q1015";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.AirPressure, Is.EqualTo("1015"));
        }

        [Test]
        public void TestMetarWithAirPressureA()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.AirPressure, Is.EqualTo("3034"));
        }

        [Test]
        public void TestMetarWithBecmgRemoved()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034 BECMG 4000 -RA";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Weather, Is.Not.EqualTo("Light Rain"));
        }

        [Test]
        public void TestMetarWithTempoRemoved()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM FEW250 M04/M17 A3034 TEMPO 2000 -SN";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Weather, Is.Not.EqualTo("Light Snow"));
        }

        [Test]
        public void TestMetarWithOvercastClouds()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM OVC050CB M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Clouds.Length, Is.GreaterThan(0));
            Assert.That(result.Clouds[0].CloudCover, Is.EqualTo("Overcast"));
            Assert.That(result.Clouds[0].CloudHeight, Is.EqualTo(5000));
            Assert.That(result.Clouds[0].CloudType, Is.EqualTo("CB"));
        }

        [Test]
        public void TestMetarWithSnow()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 10SM +SN BKN050 M04/M17 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Weather, Is.EqualTo("Heavy Snow"));
        }

        [Test]
        public void TestMetarWithFog()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT 5SM FG BKN050 05/04 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Weather, Is.EqualTo("Fog"));
        }

        [Test]
        public void TestMetarWithCAVOK()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 31008KT CAVOK 15/10 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Visibility, Is.EqualTo(9999));
        }

        [Test]
        public void TestMetarWithVariableWindOnly()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z VRB03KT CAVOK 15/10 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Wind.Direction, Is.EqualTo("Variable"));
            Assert.That(result.Wind.Speed, Is.EqualTo("03"));
            Assert.That(result.Wind.Gusts, Is.EqualTo("-"));
        }

        [Test]
        public void TestMetarWithVariableWindHighSpeed()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z VRB15KT 10SM OVC100 20/15 A3034";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Wind.Direction, Is.EqualTo("Variable"));
            Assert.That(result.Wind.Speed, Is.EqualTo("15"));
        }

        [Test]
        public void TestMetarWithExtremeWindSpeed()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 090120KT 10SM FEW100 25/20 A3020";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Wind.Speed, Is.EqualTo("120"));
        }

        [Test]
        public void TestMetarWithCalmWind()
        {
            // Arrange
            string metar = "METAR KJFK 121251Z 00000KT 10SM FEW050 10/05 A3000";

            // Act
            var result = _metarDecoder.getDecodedMetar(metar).Result;

            // Assert
            Assert.That(result.Wind.Direction, Is.EqualTo("000"));
            Assert.That(result.Wind.Speed, Is.EqualTo("00"));
        }
    }
}
