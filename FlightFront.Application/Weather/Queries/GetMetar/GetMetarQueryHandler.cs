using FlightFront.Application.Weather.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightFront.Application.Weather.Queries.GetMetar
{
    public class GetMetarQueryHandler
    {
        private readonly IMetarRepository _repository;

        public GetMetarQueryHandler(IMetarRepository repository)
        {
            _repository = repository;
        }

        public async Task<MetarDto?> HandleAsync(GetMetarQuery query)
        {
            return await _repository.GetByIcaoCode(query.IcaoCode);
        }
    }
}
