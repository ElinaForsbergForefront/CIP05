using FlightFront.Application.Weather.Queries.GetMetar;

namespace FlightFront.Application.Weather.Interfaces
{
    public interface IMetarRepository
    {
        Task<MetarDto?> GetByIcaoCode(string icaoCode);
    }
}
