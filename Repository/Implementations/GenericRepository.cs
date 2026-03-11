using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MarketPlace.Data;
using MarketPlace.Dtos;
using MarketPlace.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Repository.Implementations
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly MarketPlaceContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(MarketPlaceContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }


        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<ResultDto> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            var result = await _context.SaveChangesAsync();
            return result > 0 ? new ResultDto { IsSuccess = true, Message = "Entity added successfully" } : new ResultDto { IsSuccess = false, Message = "Entity not added" };
        }

        
        public async Task<ResultDto> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
           var result = await _context.SaveChangesAsync();

            return result > 0 ? new ResultDto { IsSuccess = true, Message = "Entity updated successfully" } : new ResultDto { IsSuccess = false, Message = "Entity not updated" };
        }

        public async Task<ResultDto> DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            var entity = await _dbSet.FirstOrDefaultAsync(predicate);
            if (entity == null)
            {
                return new ResultDto { IsSuccess = false, Message = "Entity not found" };
            }
            _dbSet.Remove(entity);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? new ResultDto { IsSuccess = true, Message = "Entity deleted successfully" } : new ResultDto { IsSuccess = false, Message = "Entity not deleted" };
        }

       public DbSet<T> GetDbSet() => _dbSet;
       
         public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().AnyAsync(predicate);
        }
    }
}