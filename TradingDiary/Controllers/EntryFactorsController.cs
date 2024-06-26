﻿using Microsoft.AspNetCore.Authorization;
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
            var userId = this.GetUserIdByClaims();

            var entryFactors = await _entryFactorService.GetAllUserEntryFactors(userId);
            if (entryFactors == null)
            {
                return NotFound("User not found");
            }
            return Ok(entryFactors);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<EntryFactor>> AddEntryFactor([FromBody] EntryFactorDTO newEntryFactor)
        {
            var userId = this.GetUserIdByClaims();

            var entryFactor = await _entryFactorService.AddEntryFactor(userId, newEntryFactor);
            return Created($"~api/entryfactors/{entryFactor.Id}", entryFactor);
        }

        [HttpPut("{factorId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EntryFactor>> UpdateEntryFactor([FromRoute] int factorId, [FromBody] EntryFactorDTO updatedFactor)
        {
            var userId = this.GetUserIdByClaims();

            var dbFactor = await _entryFactorService.UpdateEntryFactor(userId, factorId, updatedFactor);
            if (dbFactor == null)
            {
                return NotFound("Entry factor not found");
            }
            return Ok(dbFactor);
        }

        [HttpDelete("{factorId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteEntryFactor([FromRoute] int factorId)
        {
            var userId = this.GetUserIdByClaims();

            var entryFactor = await _entryFactorService.DeleteEntryFactor(userId, factorId);
            if (entryFactor == null)
            {
                return NotFound("Factor does not exist");
            }
            return Ok(entryFactor);
        }
    }
}
