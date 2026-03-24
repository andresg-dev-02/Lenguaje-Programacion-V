using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.SaleDto;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Service.Implemetations
{
    public class HistorySaleService : IHistorySaleService
    {
        private readonly IGenericRepository<Historialventum> _historySaleRepository;
        private readonly ILogger<HistorySaleService> _logger;
        public HistorySaleService(IGenericRepository<Historialventum> historySaleRepository, ILogger<HistorySaleService> logger)
        {
            _historySaleRepository = historySaleRepository;
            _logger = logger;
        }
        public async Task<ResultDto> CreateHistorySaleAsync(Historialventum historySale)
        {
            var result = await _historySaleRepository.AddAsync(historySale);

            if (!result.IsSuccess)
                return new ResultDto { IsSuccess = false, Message = "Error al crear el historial de venta." };
            return new ResultDto { IsSuccess = true, Message = "Historial de venta creado exitosamente." };
        }

        public async Task<ResultDto> GetHistorySaleAsync(int idCustomer)
        {
            _logger.LogInformation($"[HistorySaleService] GetHistorySaleAsync: {JsonSerializer.Serialize(idCustomer)}");
            var historySale = await _historySaleRepository.GetDbSet().Where(h => h.Usuarioid == idCustomer).ToListAsync();
            _logger.LogInformation($"[HistorySaleService] GetHistorySaleAsync: {JsonSerializer.Serialize(historySale)}");
            if (historySale == null)
                return new ResultDto { IsSuccess = false, Message = "Historial de venta no encontrado." };
            return new ResultDto { IsSuccess = true, Message = "Historial de venta encontrado.", Data = historySale };
        }
    }
}