﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.Services;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireUserRole")]
    public class CalculationsController : ControllerBase
    {
        private ICalculationService _calculationService;

        public CalculationsController(ICalculationService calculationService)
        {
            _calculationService = calculationService;
        }

        [HttpPost]
        [Route("riskreward")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> CountRiskReward([FromBody] CounterData data)
        {
            var rr = await Task.Run(() => _calculationService.CountRiskReward(data));
            return Ok(rr);
        }
    }
}
