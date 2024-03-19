using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TradingDiary.Data;
using TradingDiary.Models.Entities;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradingPairsController : ControllerBase
    {
        private ApplicationDbContext _context;

        public TradingPairsController(ApplicationDbContext context) 
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<TradingPair>>> GetAllTradingPairs()
        {
            var pairs = await _context.TradingPairs.ToListAsync();
            return Ok(pairs);
        }
    }
}
