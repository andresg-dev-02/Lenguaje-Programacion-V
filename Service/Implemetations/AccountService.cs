using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.AcountDto;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Security;
using MarketPlace.Security.Interface;
using MarketPlace.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Service.Implemetations
{
    public class AccountService : IAccountService
    {

        private readonly IGenericRepository<Usuario> _userRepository;
        private readonly IJwtService _jwtService;

        private readonly IConfiguration _configuration;

        private readonly IGenericRepository<Refreshtoken> _refreshTokenRepository;

        public AccountService(IGenericRepository<Usuario> userRepository, IJwtService jwtService, IConfiguration configuration, IGenericRepository<Refreshtoken> refreshTokenRepository)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _configuration = configuration;
            _refreshTokenRepository = refreshTokenRepository;
        }
        public async Task<ResultDto> LoginAsync(UserDto userDto)
        {

            var userDb = await _userRepository.GetDbSet().AsNoTracking().Include(r => r.Rol).FirstOrDefaultAsync(p => p.Email == userDto.Email);
            if (userDb == null)
                return new ResultDto { IsSuccess = false, Message = "User not found." };


            var verifyPassword = BCrypt.Net.BCrypt.Verify(userDto.Contraseña, userDb.Contraseña);

            if (!verifyPassword)
                return new ResultDto { IsSuccess = false, Message = "Invalid password." };

            var token = _jwtService.GenerateToken(userDb, out string TokenPrincipalId);
            var refreshToken = _jwtService.GenerateRefreshToken();

            await _refreshTokenRepository.AddAsync(new Refreshtoken
            {
                Userid = userDb.Id,
                Token = refreshToken,
                Tokenprincipalid = TokenPrincipalId,
                Expiration = DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpireMinutes"]!)),
                Isrevoked = false
            });

            return new ResultDto
            {
                IsSuccess = true,
                Message = "User logged in successfully.",
                Data = new { token, refreshToken }
            };

        }
        public async Task<ResultDto> LogoutAsync(string refreshToken)
        {
            var tokenDB = await _refreshTokenRepository.FirstOrDefaultAsync(t => t.Token == refreshToken);
            if (tokenDB != null)
            {
                tokenDB.Isrevoked = true;
                await _refreshTokenRepository.UpdateAsync(tokenDB);
                return new ResultDto { IsSuccess = true, Message = "User logged out successfully." };
            }
            return new ResultDto { IsSuccess = false, Message = "Token not found." };
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