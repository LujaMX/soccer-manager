using Microsoft.EntityFrameworkCore;
using SoccerApi.Models;

namespace SoccerApi.Data
{
    public class SoccerDbContext : DbContext
    {
        public SoccerDbContext(DbContextOptions<SoccerDbContext> options)
            : base(options)
        {
        }

        //Reaalizamos la conversión de las entidades League y Team de la base de datos a objetos de C# para poder manipularlos en el código
        public DbSet<League> League { get; set; }

        public DbSet<Team> Team { get; set; }
        public DbSet<LeagueTeam> LeagueTeam { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<LeagueTeam>()
                .HasKey(x => new { x.LeagueId, x.TeamId });
        }
    }
}