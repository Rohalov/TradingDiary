using Microsoft.AspNetCore.Mvc;

namespace TradingDiary.Controllers
{
    public static class ControllerBaseExtention
    {
        public static int GetUserIdByClaims(this ControllerBase controllerBase)
        {
            var userId = Convert.ToInt32(controllerBase.User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            return userId;
        }
    }
}
