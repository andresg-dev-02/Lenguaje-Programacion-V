using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Models;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MarketPlace.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
       


        // POST api/producto
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Producto product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _productService.CreateProductAsync(product);
            return Ok(new { message = result });
        }

        // PUT api/producto/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Producto product)
        {
            if (id != product.Id)
                return BadRequest(new { message = "The URL ID does not match the body ID." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _productService.UpdateProductAsync(product);
            return Ok(new { message = result });
        }

        // DELETE api/producto/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _productService.DeleteProductAsync(id);
            return Ok(new { message = result });
        }
    }
}