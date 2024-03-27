using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "RequireAdminRole")]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public RolesController(RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("create-role")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ApplicationRole>>> CreateRole([FromQuery] string name)
        {
            var roleExist = await _roleManager.FindByNameAsync(name);
            if (roleExist != null)
            {
                return BadRequest("Role already exist");
            }

            var roleResult = await _roleManager.CreateAsync(
                _mapper.Map<ApplicationRole>(new RoleDTO { Name = name }));
            if (!roleResult.Succeeded)
            {
                return BadRequest($"Role {name} has not been added successfully");
            }

            var role = await _roleManager.FindByNameAsync(name);
            return Created($"~api/items/{role.Id}", role);
        }

        [HttpDelete]
        [Route("delete-role")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationRole>> DeleteRole([FromQuery] string name)
        {
            var role = await _roleManager.FindByNameAsync(name);
            if (role == null)
            {
                return NotFound("Role does not exist");
            }

            var roleResult = await _roleManager.DeleteAsync(role);
            if (!roleResult.Succeeded)
            {
                return BadRequest($"Role {name} has not been deleted successfully");
            }

            return Ok(role);
        }

        [HttpPost]
        [Route("add-user-to-role")]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
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

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            return Ok(result);
        }
    }
}
