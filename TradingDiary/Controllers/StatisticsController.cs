using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TradingDiary.Models.Services;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireUserRole")]
    public class StatisticsController : ControllerBase
    {
        private IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet]
        [Route("for-week")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatisticsForWeek()
        {
            var userId = this.GetUserIdByClaims();

            var result = await _statisticsService.GetStatisticsForWeek(userId);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("for-month")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatisticsForMonth()
        {
            var userId = this.GetUserIdByClaims();

            var result = await _statisticsService.GetStatisticsForMonth(userId);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("all-time")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatisticsAllTime()
        {
            var userId = this.GetUserIdByClaims();

            var result = await _statisticsService.GetStatisticsAllTime(userId);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("custom")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatistics([FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var userId = this.GetUserIdByClaims();

            var result = await _statisticsService.GetCustomStatistics(userId, from, to);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }
    }
}
