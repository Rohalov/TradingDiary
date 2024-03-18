using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TradingDiary.Data;
using TradingDiary.Models.Entities;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private IStatisticsService _statisticsService;

        public StatisticsController( IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet]
        [Route("GetStatisticsForWeek")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatisticsForWeek()
        {
            var userId = Convert.ToInt32(User.FindFirst
               (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var result = await _statisticsService.GetStatisticsForWeek(userId);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("GetStatisticsForMonth")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatisticsForMonth()
        {
            var userId = Convert.ToInt32(User.FindFirst
               (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var result = await _statisticsService.GetStatisticsForMonth(userId);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("GetStatisticsAllTime")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatisticsAllTime()
        {
            var userId = Convert.ToInt32(User.FindFirst
               (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var result = await _statisticsService.GetStatisticsAllTime(userId);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("GetStatistic")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StatisticModel>> GetStatistics(DateTime from, DateTime to)
        {
            var userId = Convert.ToInt32(User.FindFirst
               (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var result = await _statisticsService.GetCustomStatistics(userId, from, to);
            if (result == null)
            {
                return NotFound("Trades not found");
            }
            return Ok(result);
        }
    }
}
