using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.CategoriesDto;

namespace MarketPlace.Service.Interface
{
    public interface ICategoryService
    {
         Task<IEnumerable<CategoriesDto>> GetAllCategoriessAsync();
        Task<ResultDto> GetCategoryByIdAsync(int id);
        Task<ResultDto> CreateCategoryAsync(CategoryDto Category);
        Task<ResultDto> UpdateCategoryAsync(int id,CategoryDto Category);
        Task<ResultDto> DeleteCategoryAsync(int id);
    }
}