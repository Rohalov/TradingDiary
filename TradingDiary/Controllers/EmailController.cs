using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.Entities;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public EmailController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> SendResetPasswordMessage([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("User with this email does not exist");
            }

            var _config = new ConfigurationBuilder()
                .AddUserSecrets<EmailController>()
                .Build();

            string emailSender = _config["BrevoApi:SenderEmail"];
            string nameSender = _config["BrevoApi:SenderName"];

            string subject = "Reset password";

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            Uri.TryCreate($"http://localhost:5173/resetpassword/{resetToken.Replace('/','%')}", UriKind.Absolute, out Uri uriResult);

            var  resetUrl = uriResult.ToString();
            string htmlContent = $"<html><body><h1>Запит на зміну пароля</h1><p>Вітаю,{user.UserName}<p>" +
                $"<p>Ми отримали запит на зміну паролю від твого аккаунту. Якщо ви не надсилали запит на зміну пароля, проігноруйте цей електронний лист, у вашому обліковому записі не буде внесено жодних змін. </p>" +
                $"<p>Щоб змінити пароль, перейдіть за посиланням нижче:</p><p>{resetUrl}</p></body></html>";

            EmailSender.SendEmail(nameSender, emailSender, user.UserName, email, subject, htmlContent);
            return Ok("Email send");
        }
    }
}
