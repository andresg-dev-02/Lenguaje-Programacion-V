using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Models;
using MarketPlace.Repository.Interface;
using MarketPlace.Security.Interface;
using Microsoft.IdentityModel.Tokens;

namespace MarketPlace.Security
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        private readonly IGenericRepository<Refreshtoken> _refreshTokenRepository;

        private readonly IGenericRepository<Usuario> _userRepository;

        public JwtService(IConfiguration configuration, IGenericRepository<Refreshtoken> refreshTokenRepository, IGenericRepository<Usuario> userRepository)
        {
            _configuration = configuration;
            _refreshTokenRepository = refreshTokenRepository;
            _userRepository = userRepository;
        }

        public string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        public string GenerateToken(Usuario user,out string TokenPrincipalId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            TokenPrincipalId = Guid.NewGuid().ToString();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, TokenPrincipalId),
                new Claim(ClaimTypes.Name, user.Nombre),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Rol.Nombre)
            };


            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpireMinutes"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<ResultDto> RefreshTokenAsync(string refreshToken)
        {
            var tokenDB = await _refreshTokenRepository.FirstOrDefaultAsync(t => t.Token == refreshToken);
            if (tokenDB == null || tokenDB.Expiration < DateTime.Now || tokenDB.Isrevoked == true)
                return new ResultDto { IsSuccess = false, Message = "Invalid refresh token." };

            var user = await _userRepository.FirstOrDefaultAsync(u => u.Id == tokenDB.Userid);
            if (user == null)
                return new ResultDto { IsSuccess = false, Message = "User not found." };
            
            tokenDB.Isrevoked = true;
            await _refreshTokenRepository.UpdateAsync(tokenDB);

            var newToken = GenerateToken(user,out string TokenPrincipalId);
            var newRefreshToken = GenerateRefreshToken();

            await _refreshTokenRepository.AddAsync(new Refreshtoken
            {
                Userid = tokenDB.Userid,
                Token = newRefreshToken,
                Tokenprincipalid = TokenPrincipalId,
                Expiration = DateTime.Now.AddDays(7),
                Isrevoked = false
            });

            return new ResultDto { IsSuccess = true, Message = "Token refreshed successfully.", Data = new { token = newToken, refreshToken = newRefreshToken } };
        }
    }
}