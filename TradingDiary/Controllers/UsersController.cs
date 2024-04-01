using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.Entities;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("add-user-to-role")]
        //[Authorize(Policy = "RequireAdminRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddUserToRole([FromQuery] string userName, [FromQuery] string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return BadRequest("Role does not exist");
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            return Ok(result);
        }


        [HttpDelete]
        [Route("remove-user-from-role")]
        //[Authorize(Policy = "RequireAdminRole")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemoveUserFromRole([FromQuery] string userName, [FromQuery] string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return BadRequest("Role does not exist");
            }

            await _userManager.RemoveFromRoleAsync(user, roleName);
            return NoContent();
        }
    }
}
