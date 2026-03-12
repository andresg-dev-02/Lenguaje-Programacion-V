using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.AcountDto;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Security;
using MarketPlace.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Service.Implemetations
{
    public class AccountService : IAccountService
    {

        private readonly IGenericRepository<Usuario> _userRepository;
        private readonly JwtService _jwtService;

        public AccountService(IGenericRepository<Usuario> userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }
        public async Task<ResultDto> LoginAsync(UserDto userDto)
        {

            var userDb = await _userRepository.GetDbSet().AsNoTracking().Include(r => r.Rol).FirstOrDefaultAsync(p => p.Email == userDto.Email);
            if (userDb == null)
                return new ResultDto { IsSuccess = false, Message = "User not found." };

           
            var verifyPassword = BCrypt.Net.BCrypt.Verify(userDto.Contraseña, userDb.Contraseña);

            if (!verifyPassword)
                return new ResultDto { IsSuccess = false, Message = "Invalid password." };

            var token = _jwtService.GenerateToken(userDb);

            return new ResultDto { 
                IsSuccess = true, 
                Message = "User logged in successfully.", 
                Data = token
            };

        }
        public async Task<ResultDto> LogoutAsync()
        {
            return new ResultDto { IsSuccess = true, Message = "User logged out successfully." };
        }

        public async Task<ResultDto> RegisterAsync(UserRegisterDto userRegisterDto)
        {
            try
            {
                var userNew = new Usuario
                {
                    Nombre = userRegisterDto.Nombre,
                    Email = userRegisterDto.Email,
                    Contraseña = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Contraseña),
                    RolId = userRegisterDto.RolId,
                    Activo = userRegisterDto.Activo,
                    CreadoEn = DateTime.Now
                };

                var result = await _userRepository.AddAsync(userNew);
                return result;
            }
            catch (Exception ex)
            {

                return new ResultDto { IsSuccess = false, Message = "Error al registrar el usuario." };
            }
        }
    }
}