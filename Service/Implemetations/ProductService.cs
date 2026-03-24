using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.SaleDto;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Service.Implemetations
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Producto> _productRepository;
        private readonly IGenericRepository<Categoria> _categoryRepository;
        private readonly IHistorySaleService _historySaleService;

        public ProductService(IGenericRepository<Producto> productRepository,IGenericRepository<Categoria> categoryRepository,IHistorySaleService historySaleService )
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _historySaleService = historySaleService;
        }

       public async Task<IEnumerable<ProductsDto>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetDbSet()
            .Include(p => p.Categoria)
            .ToListAsync();

            if (products == null)
                return Enumerable.Empty<ProductsDto>();

        
            return products.Select(p => new ProductsDto
            {
                Id = p.Id,
                Nombre = p.Nombre ?? string.Empty,
                Descripcion = p.Descripcion ?? string.Empty,
                Precio = p.Precio,
                Stock = p.Stock ?? 0,
                ImagenUrl = p.ImagenUrl ?? string.Empty,
                Activo = p.Activo ?? true,
                CategoriaNombre = p.Categoria?.Nombre ?? string.Empty
            });
            
        }

        public async Task<ResultDto> GetProductByIdAsync(int id)
        {
             var product = await _productRepository.GetDbSet()
            .Include(p => p.Categoria)
            .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return new ResultDto { IsSuccess = false, Message = "Product not found." };
            return new ResultDto
            {
                IsSuccess = true,
                Message = "Product found.",
                Data = new ProductsDto
                {
                Id = product.Id,
                Nombre = product.Nombre ?? string.Empty,
                Descripcion = product.Descripcion ?? string.Empty,
                Precio = product.Precio,
                Stock = product.Stock ?? 0,
                ImagenUrl = product.ImagenUrl ?? string.Empty,
                Activo = product.Activo ?? true,
                CategoriaNombre = product.Categoria?.Nombre ?? string.Empty
                }
            };
        }

        public async Task<ResultDto> CreateProductAsync(ProductoDto productoDto)
        {
            var categoryDb  =  await _categoryRepository.FirstOrDefaultAsync(p => p.Nombre == productoDto.CategoriaNombre);
            if (categoryDb == null)
                return new ResultDto { IsSuccess = false, Message = "name category not found." };
            var product = new Producto
            {
                Nombre = productoDto.Nombre,
                Descripcion = productoDto.Descripcion,
                Precio = productoDto.Precio,
                Stock = productoDto.Stock,
                ImagenUrl = productoDto.ImagenUrl,
                Activo = productoDto.Activo,
                CategoriaId = categoryDb?.Id ?? 0,
                CreadoEn = DateTime.Now              
            };


           return await _productRepository.AddAsync(product);
        }

        public async Task<ResultDto> UpdateProductAsync(int id,ProductoDto productoDto)
        {
             var productDb = await _productRepository.FirstOrDefaultAsync(p => p.Id == id);
            var categoryDb  =  await _categoryRepository.FirstOrDefaultAsync(p => p.Nombre == productoDto.CategoriaNombre);
            if (productDb == null)
                return new ResultDto { IsSuccess = false, Message = "Product name not found." };

            if (categoryDb == null)
                return new ResultDto { IsSuccess = false, Message = "Category name not found." };

            productDb.Nombre = productoDto.Nombre;
            productDb.Descripcion = productoDto.Descripcion;
            productDb.Precio = productoDto.Precio;
            productDb.Stock = productoDto.Stock;
            productDb.ImagenUrl = productoDto.ImagenUrl;
            productDb.Activo = productoDto.Activo;
            productDb.CategoriaId = categoryDb?.Id ?? 0;
            
            await _productRepository.UpdateAsync(productDb);
            return new ResultDto { IsSuccess = true, Message = "Product updated successfully." };

        }

        public async Task<ResultDto> DeleteProductAsync(int id)
        {
            bool exists = await _productRepository.ExistsAsync(p => p.Id == id);
            if (!exists)
                return new ResultDto { IsSuccess = false, Message = $"Product not found." };

            await _productRepository.DeleteAsync(p => p.Id == id);
            return new ResultDto { IsSuccess = true, Message = "Product deleted successfully." };
        }

        public async Task<ResultDto> ProcessSaleAsync(SaleDto saleDto)
        {
            var productDb = await _productRepository.GetDbSet().Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == saleDto.idShoe);
            if (productDb == null)
                return new ResultDto { IsSuccess = false, Message = "Product not found." };

            if (productDb.Stock < saleDto.amoutShoe)
                return new ResultDto { IsSuccess = false, Message = "Product out of stock." };

            productDb.Stock -= saleDto.amoutShoe;
            await _productRepository.UpdateAsync(productDb);
            var historySale = new Historialventum
            {
                Usuarioid = saleDto.idCustomer,
                Imagenproducto = productDb?.ImagenUrl ?? string.Empty,
                Nombreproducto = productDb?.Nombre ?? string.Empty,
                Cantidad = saleDto.amoutShoe,
                Total = productDb?.Precio * saleDto.amoutShoe ?? 0,
                Fecha = DateTime.Now
            };
            await _historySaleService.CreateHistorySaleAsync(historySale);
            return new ResultDto { IsSuccess = true, Message = "Product sold successfully." };
        }
    }
}