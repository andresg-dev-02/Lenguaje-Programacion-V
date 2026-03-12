using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using MarketPlace.Dtos.AcountDto;

namespace MarketPlace.Service.Interface
{
    public interface IAccountService
    {
        Task<ResultDto> RegisterAsync(UserRegisterDto userRegisterDto);
        Task<ResultDto> LoginAsync(UserDto userDto);
        Task<ResultDto> LogoutAsync();
    }
}