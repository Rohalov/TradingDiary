using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Identity
{
    public class RoleTable
    {
        private readonly ApplicationDbContext _context;

        public RoleTable(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationRole role)
        {
            role.NormalizedName = role.Name.ToUpper();
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationRole role)
        {
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            return IdentityResult.Success;
        }

        public async void Dispose()
        {
            await _context.DisposeAsync();
        }

        public async Task<ApplicationRole?> FindByIdAsync(string roleId)
        {
            var role = await _context.Roles.FindAsync(int.Parse(roleId));
            return role;
        }

        public async Task<string?> GetNormalizedRoleNameAsync(ApplicationRole role)
        {
            return await Task.FromResult(role.NormalizedName);
        }

        public async Task<ApplicationRole?> FindByNameAsync(string normalizedRoleName)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.NormalizedName == normalizedRoleName);
            return role;
        }

        public async Task<string> GetRoleIdAsync(ApplicationRole role)
        {
            return await Task.FromResult(Convert.ToString(role.Id));
        }

        public async Task<string?> GetRoleNameAsync(ApplicationRole role)
        {
            return await Task.FromResult(role.Name);
        }

        public async Task SetNormalizedRoleNameAsync(ApplicationRole role, string? normalizedName)
        {
            var roleDB = await _context.Roles.FirstOrDefaultAsync(r => r.Name == role.Name);
            if (roleDB != null)
            {
                roleDB.NormalizedName = normalizedName;
                await _context.SaveChangesAsync();
            }
        }

        public async Task SetRoleNameAsync(ApplicationRole role, string roleName)
        {
            var roleDB = await FindByIdAsync(role.Id.ToString());
            if (roleDB != null)
            {
                roleDB.Name = roleName;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationRole role)
        {
            _context.Update(role);
            var affectedRows = await _context.SaveChangesAsync();
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError()
                {
                    Description = $"Could not update role {role.Name}."
                });
        }
    }
}
