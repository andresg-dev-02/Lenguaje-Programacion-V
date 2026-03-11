using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Models;

namespace MarketPlace.Service.Interface
{
    public interface IProductService
    {
        Task<IEnumerable<ProductsDto>> GetAllProductsAsync();
        Task<ResultDto> GetProductByIdAsync(int id);

        Task<ResultDto> CreateProductAsync(ProductoDto product);
        Task<ResultDto> UpdateProductAsync(int id,ProductoDto product);
        Task<ResultDto> DeleteProductAsync(int id);

    }
}