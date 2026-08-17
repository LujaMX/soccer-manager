using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoccerApi.Data;
using SoccerApi.Models;

namespace SoccerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueTeamController : ControllerBase
    {
        private readonly SoccerDbContext _context;

        public LeagueTeamController(SoccerDbContext context)
        {
            _context = context;
        }

        // GET: api/LeagueTeam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeagueTeam>>> GetLeagueTeams()
        {
            return await _context.LeagueTeam.ToListAsync();
        }

        // POST: api/LeagueTeam
        [HttpPost]
        public async Task<ActionResult<LeagueTeam>> PostLeagueTeam(LeagueTeam leagueTeam)
        {
            // Verificar que la liga exista
            var leagueExists = await _context.League
                .AnyAsync(l => l.Id == leagueTeam.LeagueId);

            if (!leagueExists)
            {
                return BadRequest("La liga no existe.");
            }

            // Verificar que el equipo exista
            var teamExists = await _context.Team
                .AnyAsync(t => t.Id == leagueTeam.TeamId);

            if (!teamExists)
            {
                return BadRequest("El equipo no existe.");
            }

            // Verificar que la relación no exista
            var relationExists = await _context.LeagueTeam
                .AnyAsync(x =>
                    x.LeagueId == leagueTeam.LeagueId &&
                    x.TeamId == leagueTeam.TeamId);

            if (relationExists)
            {
                return BadRequest("El equipo ya está registrado en esta liga.");
            }

            _context.LeagueTeam.Add(leagueTeam);
            await _context.SaveChangesAsync();

            return Ok(leagueTeam);
        }

        // DELETE: api/LeagueTeam/1/3
        [HttpDelete("{leagueId}/{teamId}")]
        public async Task<IActionResult> DeleteLeagueTeam(int leagueId, int teamId)
        {
            var leagueTeam = await _context.LeagueTeam.FindAsync(leagueId, teamId);

            if (leagueTeam == null)
            {
                return NotFound("La relación no existe.");
            }

            _context.LeagueTeam.Remove(leagueTeam);
            await _context.SaveChangesAsync();

            return Ok("Equipo eliminado de la liga.");
        }
    }
}