using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.AcountDto;
using MarketPlace.Models;

namespace MarketPlace.Security.Interface
{
    public interface IJwtService
    {
        Task<ResultDto> RefreshTokenAsync(string refreshToken);
        string GenerateToken(Usuario user, out string TokenPrincipalId);
        string GenerateRefreshToken();
    }
}