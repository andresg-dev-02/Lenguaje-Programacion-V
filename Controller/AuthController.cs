using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.AcountDto;
using MarketPlace.Security.Interface;
using MarketPlace.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MarketPlace.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IJwtService _jwtService;

        public AuthController(IAccountService accountService, IJwtService jwtService)
        {
            _accountService = accountService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {

            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                var result = await _accountService.LoginAsync(userDto);

            if (!result.IsSuccess)
                return NotFound(result);
            

                return Ok(result);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = $"Error starting session {ex.Message}" });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                var result = await _accountService.RegisterAsync(userRegisterDto);

            if (!result.IsSuccess)
                return NotFound(result);

            return Ok(result);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Error string session" });
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string refreshToken)
        {
            try
            {
                var result = await _accountService.LogoutAsync(refreshToken);

                return Ok(result);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Error string session" });
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenRequestDto refreshTokenRequestDto)
        {
           try
           {
            if(!ModelState.IsValid)
                return BadRequest(ModelState); 
            
            var result = await _jwtService.RefreshTokenAsync(refreshTokenRequestDto.RefreshToken);
            if (result.IsSuccess)
                return Ok(result);
            
            return Unauthorized(result);
           }
           catch (Exception ex)
           {
                
                return StatusCode(500, new ResultDto { IsSuccess = false, Message = "Error string session" });
           }
        }
    }
}