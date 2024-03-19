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
    public class EntryFactorsController : ControllerBase
    {
        private IEntryFactorService _entryFactorService;

        public EntryFactorsController(IEntryFactorService entryFactorService)
        {
            _entryFactorService = entryFactorService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<EntryFactor>>> GetAllUserEntryFactors()
        {
            var userId = GetUserIdByClaims();

            var entryFactors = await _entryFactorService.GetAllUserEntryFactors(userId);
            if (entryFactors == null)
            {
                NotFound("User not found");
            }
            return Ok(entryFactors);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<EntryFactor>> AddEntryFactor([FromBody] EntryFactorDTO newEntryFactor)
        {
            var userId = GetUserIdByClaims();

            var entryFactor = await _entryFactorService.AddEntryFactor(userId, newEntryFactor);
            return Created($"~api/entryfactors/{entryFactor.Id}", entryFactor);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EntryFactor>> UpdateEntryFactor([FromQuery] int factorId, [FromBody] EntryFactorDTO updatedFactor)
        {
            var userId = GetUserIdByClaims();

            var dbFactor = await _entryFactorService.UpdateEntryFactor(userId, factorId, updatedFactor);
            if (dbFactor == null)
            {
                NotFound("Entry factor not found");
            }
            return Ok(dbFactor);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteEntryFactor([FromQuery] int factorId)
        {
            var userId = GetUserIdByClaims();

            var entryFactor = await _entryFactorService.DeleteEntryFactor(userId, factorId);
            if (entryFactor == null)
            {
                NotFound("Factor does not exist");
            }
            return Ok("Factor was deleted");
        }

        private int GetUserIdByClaims()
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            return userId;
        }
    }
}
