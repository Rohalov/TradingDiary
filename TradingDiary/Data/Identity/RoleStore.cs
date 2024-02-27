using Microsoft.AspNetCore.Identity;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Identity
{
    public class RoleStore : IRoleStore<ApplicationRole>
    {
        private readonly RoleTable roleTable;

        public RoleStore(RoleTable roleTable)
        {
            this.roleTable = roleTable;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return await roleTable.CreateAsync(role);
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return await roleTable.DeleteAsync(role);
        }

        public void Dispose()
        {
            roleTable.Dispose();
            GC.SuppressFinalize(this); ;
        }

        public async Task<ApplicationRole?> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            return await roleTable.FindByIdAsync(roleId);
        }

        public async Task<ApplicationRole?> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            return await roleTable.FindByNameAsync(normalizedRoleName);
        }

        public async Task<string?> GetNormalizedRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return await roleTable.GetNormalizedRoleNameAsync(role);
        }

        public async Task<string> GetRoleIdAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return await roleTable.GetRoleIdAsync(role);
        }

        public async Task<string?> GetRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return await roleTable.GetRoleNameAsync(role);
        }

        public async Task SetNormalizedRoleNameAsync(ApplicationRole role, string? normalizedName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            await roleTable.SetNormalizedRoleNameAsync(role, normalizedName);
        }

        public async Task SetRoleNameAsync(ApplicationRole role, string? roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            await roleTable.SetRoleNameAsync(role, roleName);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return await roleTable.UpdateAsync(role);
        }
    }
}
