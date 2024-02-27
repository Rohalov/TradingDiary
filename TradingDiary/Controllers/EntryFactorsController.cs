using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Services;

namespace TradingDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryFactorsController : ControllerBase
    {
        private IEntryFactorService _entryFactorService;

        public EntryFactorsController(IEntryFactorService entryFactorService)
        {
            _entryFactorService = entryFactorService;
        }

        [HttpGet]
        [Route("GetAllUserEntryFactors")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<EntryFactor>>> GetAllUserEntryFactors()
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            
            var entryFactors = await _entryFactorService.GetAllUserEntryFactors(userId);
            if (entryFactors == null)
            {
                NotFound("User not found");
            }
            return Ok(entryFactors);      
        }

        [HttpPost]
        [Route("AddEntryFactor")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<EntryFactor>> AddEntryFactor(EntryFactorDTO newEntryFactor)
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var entryFactor = await _entryFactorService.AddEntryFactor(userId, newEntryFactor);
            return Created($"~api/entryfactors/{entryFactor.Id}", entryFactor);
        }

        [HttpPut]
        [Route("UpdateEntryFactor")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EntryFactor>> UpdateEntryFactor(int factorId, EntryFactorDTO updatedFactor)
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var dbFactor = await _entryFactorService.UpdateEntryFactor(userId, factorId, updatedFactor);
            if (dbFactor == null)
            {
                NotFound("Entry factor not found");
            }
            return Ok(dbFactor);
        }

        [HttpDelete]
        [Route("DeleteEntryFactor")]
        [Authorize(Policy = "RequireUserRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteEntryFactor(int factorId)
        {
            var userId = Convert.ToInt32(User.FindFirst
                (System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var entryFactor = await _entryFactorService.DeleteEntryFactor(userId, factorId);
            if (entryFactor == null)
            {
                NotFound("Factor does not exist");
            }
            return Ok("Factor was deleted");
        }
    }
}
