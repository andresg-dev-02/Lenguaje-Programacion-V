using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.SaleDto;
using MarketPlace.Models;

namespace MarketPlace.Service.Interface
{
    public interface IHistorySaleService
    {
        Task<ResultDto> CreateHistorySaleAsync(Historialventum historySale);
        Task<ResultDto> GetHistorySaleAsync(int idCustomer);
        Task<ResultDto> GetAllHistorySale();
    }
}