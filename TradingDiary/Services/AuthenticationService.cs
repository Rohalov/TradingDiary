using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TradingDiary.Data;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public AuthenticationService(UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IConfiguration configuration, IMapper mapper,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
        }

        public async Task<string> CheckToken(string token)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtHandler.ReadToken(token) as JwtSecurityToken;
            var expirationDate = jwtToken.ValidTo;
            var now = DateTime.UtcNow;
            if (expirationDate < now)
            {
                token = await GenerateJwtToken(new ApplicationUser
                {
                    Id = Convert.ToInt32(
                        jwtToken.Claims
                            .Where(c => c.Type == ClaimTypes.NameIdentifier)
                            .Select(c => c.Value).FirstOrDefault()),
                    UserName = jwtToken.Claims
                            .Where(c => c.Type == ClaimTypes.Name)
                            .Select(c => c.Value).FirstOrDefault()
                });
            }
            return token;
        }

        public async Task<IdentityResult> Register(RegisterRequest request)
        {
            var newUser = _mapper.Map<ApplicationUser>(request);

            var nameIsUsed = await _userManager.FindByNameAsync(newUser.UserName) != null;
            if (nameIsUsed)
            {
                return IdentityResult.Failed(_userManager.ErrorDescriber.DuplicateUserName(newUser.UserName));
            }

            var emailIsUsed = await _userManager.FindByEmailAsync(newUser.Email) != null;
            if (emailIsUsed)
            {
                return IdentityResult.Failed(_userManager.ErrorDescriber.DuplicateEmail(newUser.Email));
            }

            var validate = await _userManager.PasswordValidators[0].ValidateAsync(_userManager, newUser, request.Password);
            if (!validate.Succeeded)
            {
                return validate;
            }
            var passwordHash = _userManager.PasswordHasher.HashPassword(newUser, request.Password);
            newUser.PasswordHash = passwordHash;


            var isCreated = await _userManager.CreateAsync(newUser);
            if (!isCreated.Succeeded)
            {
                return isCreated;
            }

            var createdUser = await _userManager.FindByNameAsync(newUser.UserName);
            await _userManager.AddToRoleAsync(createdUser, "User");
            await _context.UserCards.AddAsync(new UserCard { UserId = createdUser.Id });
            await _context.SaveChangesAsync();

            return IdentityResult.Success;
        }

        public async Task<string> Login(UserDTO request)
        {
            var userInDB = await _userManager.FindByNameAsync(request.UserName);
            if (userInDB == null)
            {
                return null;
            }
            if (!BCrypt.Net.BCrypt.Verify(request.Password, userInDB.PasswordHash))
            {
                return null;
            }
            var jwt = await GenerateJwtToken(userInDB);
            return jwt;
        }

        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            List<Claim> claims = await GetAllValidClaims(user);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                            _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: creds,
                expires: DateTime.Now.AddDays(1)
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }


        private async Task<List<Claim>> GetAllValidClaims(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var userRole in userRoles)
            {
                var role = await _roleManager.FindByNameAsync(userRole);
                if (role != null)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
                }
            }
            return claims;
        }
    }
}
