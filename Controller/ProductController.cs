using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.SaleDto;
using MarketPlace.Models;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketPlace.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IHistorySaleService _historySaleService;

        public ProductController(IProductService productService, IHistorySaleService historySaleService)
        {
            _productService = productService;
            _historySaleService = historySaleService;
        }

        [AllowAnonymous]
        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _productService.GetAllProductsAsync();
                if (products == null)
                {
                    return NotFound(new ResultDto { IsSuccess = false, Message = "Products not found" });
                }
                return Ok(new ResultDto { IsSuccess = true, Message = "Products found", Data = products });
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }

        [HttpGet("GetProductById/{id:int}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                var result = await _productService.GetProductByIdAsync(id);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductoDto productoDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _productService.CreateProductAsync(productoDto);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductoDto productoDto)
        {
            try
            {


                if (id <= 0)
                    return BadRequest(new { message = "Id is required" });

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _productService.UpdateProductAsync(id, productoDto);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _productService.DeleteProductAsync(id);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }

        [AllowAnonymous]
        [HttpPost("ProcessSale")]
        public async Task<IActionResult> ProcessSale([FromBody] SaleDto saleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _productService.ProcessSaleAsync(saleDto);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }
        [Authorize("admin")]
        [HttpGet("GetHistorySale/{idCustomer:int}")]
        public async Task<IActionResult> GetHistorySale(int idCustomer)
        {
            try
            {
                if (idCustomer <= 0)
                    return BadRequest(new { message = "Id is required" });
                var result = await _historySaleService.GetHistorySaleAsync(idCustomer);
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }

        [Authorize("admin")]
        [HttpGet("GetAllHistorySale")]
        
        public async Task<IActionResult> GetAllHistorySale()
        {
            try
            {
                var result = await _historySaleService.GetAllHistorySale();
                if (!result.IsSuccess)
                {
                    return NotFound(result);
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Internal server error" });
            }
        }
    }
}