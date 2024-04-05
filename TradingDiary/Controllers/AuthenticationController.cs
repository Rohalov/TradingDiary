using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TradingDiary.Services;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService, IMapper mapper)
        {
            _authenticationService = authenticationService;
        }


        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = await _authenticationService.Register(request);
            if (user == null)
            {
                return BadRequest("User already exists");
            }
            return Created($"~api/users/{user.Id}", $"User {user.UserName} successfully created");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Login([FromBody] UserDTO request)
        {
            var jwtToken = await _authenticationService.Login(request);
            if (jwtToken == null)
            {
                return NotFound("User not found.");
            }
            return Ok(jwtToken);
        }

        [HttpPut("jwt-token")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CheckToken()
        {
            string token = this.Request.Headers["Authorization"];
            if (token == null)
            {
                return BadRequest();
            }
            token = token.Substring("Bearer ".Length);
            var jwtToken = await  _authenticationService.CheckToken(token);
            return Ok(jwtToken);
        }
    }
}
