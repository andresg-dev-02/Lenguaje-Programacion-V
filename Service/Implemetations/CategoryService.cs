using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.CategoriesDto;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Service.Interface;

namespace MarketPlace.Service.Implemetations
{
    public class CategoryService : ICategoryService
    {
        private readonly IGenericRepository<Categoria> _categoryRepository;

        public CategoryService(IGenericRepository<Categoria> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<ResultDto> CreateCategoryAsync(CategoryDto Category)
        {
            var categoryDb = await _categoryRepository.FirstOrDefaultAsync(p => p.Nombre == Category.Nombre);
            if (categoryDb == null)
                return new ResultDto { IsSuccess = false, Message = "Category name not found." };

            var category = new Categoria
            {
                Nombre = Category.Nombre,
                Descripcion = Category.Descripcion,
            };

            return await _categoryRepository.AddAsync(category);
        }

        public async Task<ResultDto> DeleteCategoryAsync(int id)
        {
            var categoryDb = await _categoryRepository.FirstOrDefaultAsync(p => p.Id == id);
            if (categoryDb == null)
                return new ResultDto { IsSuccess = false, Message = "Category not found." };

            return await _categoryRepository.DeleteAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<CategoriesDto>> GetAllCategoriessAsync()
        {
            var categoriesDb = await _categoryRepository.GetAllAsync();
            return categoriesDb.Select(p => new CategoriesDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
            });
        }

        public async Task<ResultDto> GetCategoryByIdAsync(int id)
        {
            var categoryDb = await _categoryRepository.FirstOrDefaultAsync(p => p.Id == id);
            if (categoryDb == null)
                return new ResultDto { IsSuccess = false, Message = "Category not found." };

            return new ResultDto { IsSuccess = true, Message = "Category found." , Data = categoryDb};
        }

        public async Task<ResultDto> UpdateCategoryAsync(int id, CategoryDto Category)
        {
            var categoryDb = await _categoryRepository.FirstOrDefaultAsync(p => p.Id == id);
            if (categoryDb == null)
                return new ResultDto { IsSuccess = false, Message = "Category not found." };

            categoryDb.Nombre = Category.Nombre;
            categoryDb.Descripcion = Category.Descripcion;

            return await _categoryRepository.UpdateAsync(categoryDb);
        }
    }
}