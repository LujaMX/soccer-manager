
//Realizamos la creación del modelo de datos para la entidad League, esto con base en su tabla correspondiente en la BD
namespace SoccerApi.Models
{
    public class League
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Country { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool Enabled { get; set; }
    }
}