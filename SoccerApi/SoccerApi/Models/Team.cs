using System.ComponentModel.DataAnnotations;

namespace SoccerApi.Models
{
    public class Team
    {
        public int Id { get; set; }

        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 2)] 
        public string Country { get; set; }

        [Range(11, 22)]
        public int PlayersQuantity { get; set; }

        public bool Enabled { get; set; }
    }
}