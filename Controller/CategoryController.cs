using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.CategoriesDto;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MarketPlace.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _categoryService.GetAllCategoriessAsync();
                if (categories == null)
                {
                    return NotFound(new ResultDto { IsSuccess = false, Message = "Categories not found." });
                }
                return Ok(new ResultDto { IsSuccess = true, Message = "Categories found", Data = categories });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error." });
            }
        }

        [HttpGet("GetCategoryById/{id:int}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var result = await _categoryService.GetCategoryByIdAsync(id);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error." });
            }
        }

        

        [HttpPost]
        public async Task<ActionResult> CreateCategory(CategoryDto categoryDto)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = await _categoryService.CreateCategoryAsync(categoryDto);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error." });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateCategory(int id, CategoryDto categoryDto)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = await _categoryService.UpdateCategoryAsync(id, categoryDto);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error." });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            try
            {
                var result = await _categoryService.DeleteCategoryAsync(id);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error." });
            }
        }
    }
}