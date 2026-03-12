using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.AcountDto;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Service.Interface;

namespace MarketPlace.Service.Implemetations
{
    public class AccountService : IAccountService
    {

        private readonly IGenericRepository<Usuario> _userRepository;

        public AccountService(IGenericRepository<Usuario> userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ResultDto> LoginAsync(UserDto userDto)
        {

            var userDb = await _userRepository.FirstOrDefaultAsync(p => p.Email == userDto.Email);
            if (userDb == null)
                return new ResultDto { IsSuccess = false, Message = "User not found." };

            var verifyPassword = BCrypt.Net.BCrypt.Verify(userDto.Contraseña, userDb.Contraseña);

            if (!verifyPassword)
                return new ResultDto { IsSuccess = false, Message = "Invalid password." };

            return new ResultDto { IsSuccess = true, Message = "User logged in successfully." };

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
            catch (System.Exception)
            {

                return new ResultDto { IsSuccess = false, Message = "Error al registrar el usuario." };
            }
        }
    }
}