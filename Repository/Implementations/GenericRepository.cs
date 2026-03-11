using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MarketPlace.Data;
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

        public async Task<string> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            var result = await _context.SaveChangesAsync();
            return result > 0 ? "Entity added successfully" : "Entity not added";
        }

        public async Task<string> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
           var result = await _context.SaveChangesAsync();

            return result > 0 ? "Entity updated successfully" : "Entity not updated";
        }

        public async Task<string> DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            var entity = await _dbSet.FirstOrDefaultAsync(predicate);
            if (entity == null)
            {
                return "Entity not found";
            }
            _dbSet.Remove(entity);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? "Entity deleted successfully" : "Entity not deleted";
        }

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