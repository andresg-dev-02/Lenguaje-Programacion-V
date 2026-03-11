using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Service.Interface;

namespace MarketPlace.Service.Implemetations
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Producto> _productRepository;

        public ProductService(IGenericRepository<Producto> productRepository)
        {
            _productRepository = productRepository;
        }

       public async Task<IEnumerable<Producto>> GetAllProductsAsync()
            => await _productRepository.GetAllAsync();

        public async Task<Producto?> GetProductByIdAsync(int id)
            => await _productRepository.FirstOrDefaultAsync(p => p.Id == id);

        public async Task<IEnumerable<Producto>> GetProductsByCategoryAsync(int categoryId)
            => await _productRepository.FindAsync(p => p.CategoriaId == categoryId);

        public async Task<IEnumerable<Producto>> GetActiveProductsAsync()
            => await _productRepository.FindAsync(p => p.Activo == true);

        public async Task<string> CreateProductAsync(Producto product)
        {
            bool exists = await _productRepository.ExistsAsync(p => p.Nombre == product.Nombre);
            if (exists)
                return "A product with that name already exists.";

            product.CreadoEn = DateTime.UtcNow;
            product.Activo ??= true;

            return await _productRepository.AddAsync(product);
        }

        public async Task<string> UpdateProductAsync(Producto product)
        {
            bool exists = await _productRepository.ExistsAsync(p => p.Id == product.Id);
            if (!exists)
                return $"Product with ID {product.Id} not found.";

            return await _productRepository.UpdateAsync(product);
        }

        public async Task<string> DeleteProductAsync(int id)
        {
            bool exists = await _productRepository.ExistsAsync(p => p.Id == id);
            if (!exists)
                return $"Product with ID {id} not found.";

            return await _productRepository.DeleteAsync(p => p.Id == id);
        }

        public async Task<bool> ProductExistsAsync(int id)
            => await _productRepository.ExistsAsync(p => p.Id == id);
    }
}