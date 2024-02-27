using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradesController : ControllerBase
    {
        private ITradeService _tradeService;

        public TradesController(ITradeService tradeService)
        {
            _tradeService = tradeService;
        }

        [HttpGet]
        [Route("GetAllUserTrades")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Trade>>> GetAllUserTrades()
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var trades = await _tradeService.GetAllUserTrades(userId);
            if (trades == null)
            {
                NotFound("User not found");
            }
            return Ok(trades);
        }

        [HttpPost]
        [Route("AddTrade")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Trade>> AddTrade(TradeDTO newTrade)
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var trade = await _tradeService.AddTrade(userId, newTrade);
            return Created($"~api/trades/{trade.Id}", trade);
        }

        [HttpPut]
        [Route("UpdateTrade")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Trade>> UpdateTrade(int id, TradeDTO updatedTrade)
        {
            var dbtrade = await _tradeService.UpdateTrade(id, updatedTrade);
            if (dbtrade == null)
            {
                NotFound("Trade not found");
            }
            return Ok(dbtrade);
        }

        [HttpDelete]
        [Route("DeleteTrade")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteTrade(int id)
        {
            var trade = await _tradeService.DeleteTrade(id);
            if (trade == null)
            {
                NotFound("Trade does not exist");
            }
            return Ok("Trade was deleted");
        }

        [HttpPost]
        [Route("CountRiskReward")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> CountRiskReward(CounterData data)
        {
            var rr = await _tradeService.CountRiskReward(data);
            return Ok(rr);
        }

        [HttpPost]
        [Route("GetStatistic")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TradesStaticticModel>> GetStatictic(DateTimeOffset from, DateTimeOffset to)
        {
            var userId = Convert.ToInt32(User.FindFirst
               (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var result = await _tradeService.GetStatictic(userId, from, to);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }
    }
}
