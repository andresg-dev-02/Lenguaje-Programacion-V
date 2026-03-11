using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.CategoriesDto;
using MarketPlace.Service.Interface;

namespace MarketPlace.Service.Implemetations
{
    public class CategoryService : ICategoryService
    {
        public Task<ResultDto> CreateCategoryAsync(CategoryDto Category)
        {
            throw new NotImplementedException();
        }

        public Task<ResultDto> DeleteCategoryAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CategoriesDto>> GetAllCategoriessAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ResultDto> GetCategoryByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ResultDto> UpdateCategoryAsync(int id, CategoryDto Category)
        {
            throw new NotImplementedException();
        }
    }
}