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
        [Route("CreateRole")]
        //[Authorize(Policy = "RequireAdminRole")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ApplicationRole>>> CreateRole(string name)
        {
            var roleExist = await _roleManager.FindByNameAsync(name);
            if (roleExist == null)
            {
                var roleResult = await _roleManager.CreateAsync(
                    _mapper.Map<ApplicationRole>(new RoleDTO { Name = name }));

                if (roleResult.Succeeded)
                {
                    var role = await _roleManager.FindByNameAsync(name);
                    return Created($"~api/items/{role.Id}", role);
                }
                else
                {
                    return BadRequest($"Role {name} has not been added successfully");
                }
            }
            return BadRequest("Role already exist");
        }

        [HttpDelete]
        [Route("DeleteRole")]
        //[Authorize(Policy = "RequireAdminRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationRole>> DeleteRole(string name)
        {
            var role = await _roleManager.FindByNameAsync(name);
            if (role != null)
            {
                var roleResult = await _roleManager.DeleteAsync(role);

                if (roleResult.Succeeded)
                {
                    return Ok(role);
                }
                else
                {
                    return BadRequest($"Role {name} has not been deleted successfully");
                }
            }
            return NotFound("Role does not exist");
        }

        [HttpPost]
        [Route("AddUserToRole")]
        //[Authorize(Policy = "RequireAdminRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddUserToRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role != null && user != null)
            {
                var result = await _userManager.AddToRoleAsync(user, roleName);
                return Ok(result);
            }
            else if (role == null)
            {
                return BadRequest("Role does not exist");
            }
            else
            {
                return BadRequest("User does not exist");
            }
        }


        [HttpDelete]
        [Route("RemoveUserFromRole")]
        //[Authorize(Policy = "RequireAdminRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemoveUserFromRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role != null && user != null)
            {
                var result = await _userManager.RemoveFromRoleAsync(user, roleName);
                return Ok(result);
            }
            else if (role == null)
            {
                return BadRequest("Role does not exist");
            }
            else
            {
                return BadRequest("User does not exist");
            }
        }
    }
}
