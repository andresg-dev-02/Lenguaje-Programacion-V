using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Models;

namespace MarketPlace.Service.Interface
{
    public interface IProductService
    {
        Task<IEnumerable<Producto>> GetAllProductsAsync();
        Task<Producto?> GetProductByIdAsync(int id);
        Task<IEnumerable<Producto>> GetProductsByCategoryAsync(int categoryId);
        Task<IEnumerable<Producto>> GetActiveProductsAsync();
        Task<string> CreateProductAsync(Producto product);
        Task<string> UpdateProductAsync(Producto product);
        Task<string> DeleteProductAsync(int id);
        Task<bool> ProductExistsAsync(int id);
    }
}