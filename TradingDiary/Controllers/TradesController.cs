using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireUserRole")]
    public class TradesController : ControllerBase
    {
        private ITradeService _tradeService;

        public TradesController(ITradeService tradeService)
        {
            _tradeService = tradeService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Trade>>> GetAllUserTrades()
        {
            var userId = GetUserIdByClaims();

            var trades = await _tradeService.GetAllUserTrades(userId);
            if (trades == null)
            {
                NotFound("User not found");
            }
            return Ok(trades);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Trade>> AddTrade([FromBody] TradeDTO newTrade)
        {
            var userId = GetUserIdByClaims();

            var trade = await _tradeService.AddTrade(userId, newTrade);
            return Created($"~api/trades/{trade.Id}", trade);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Trade>> UpdateTrade([FromQuery] int id, [FromBody] TradeDTO updatedTrade)
        {
            var dbtrade = await _tradeService.UpdateTrade(id, updatedTrade);
            if (dbtrade == null)
            {
                NotFound("Trade not found");
            }
            return Ok(dbtrade);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteTrade([FromQuery] int id)
        {
            var trade = await _tradeService.DeleteTrade(id);
            if (trade == null)
            {
                NotFound("Trade does not exist");
            }
            return Ok("Trade was deleted");
        }

        private int GetUserIdByClaims()
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            return userId;
        }
    }
}
