using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoccerApi.Data;
using SoccerApi.Models;

namespace SoccerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeagueController : ControllerBase
    {
        private readonly SoccerDbContext _context;

        public LeagueController(SoccerDbContext context)
        {
            _context = context;
        }

        // Método GET: api/League
        [HttpGet]
        public async Task<ActionResult<IEnumerable<League>>> GetLeagues()
        {
            return await _context.League.ToListAsync();
        }

        // Método GET: api/League/5
        [HttpGet("{id}")]
        public async Task<ActionResult<League>> GetLeague(int id)
        {
            var league = await _context.League.FindAsync(id);

            if (league == null)
            {
                return NotFound();
            }

            return league;
        }

        // Método POST: api/League
        [HttpPost]
        public async Task<ActionResult<League>> CreateLeague(League league)
        {
            _context.League.Add(league);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetLeague),
                new { id = league.Id },
                league);
        }

        // PUT: api/League/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLeague(int id, League league)
        {
            if (id != league.Id)
            {
                return BadRequest();
            }

            _context.Entry(league).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeagueExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/League/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeague(int id)
        {
            var league = await _context.League.FindAsync(id);

            if (league == null)
            {
                return NotFound();
            }

            _context.League.Remove(league);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeagueExists(int id)
        {
            return _context.League.Any(e => e.Id == id);
        }
    }
}