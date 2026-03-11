using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MarketPlace.Dtos;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Repository.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<ResultDto> AddAsync(T entity);
        Task<ResultDto> UpdateAsync(T entity);
        Task<ResultDto> DeleteAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
        DbSet<T> GetDbSet();
    }
}