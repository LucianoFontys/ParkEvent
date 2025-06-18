using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using ParkEvent.SQL;
using ParkEvent.Business;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ParkEvent.Pages
{
    public class EventManagerModel : PageModel
    {
        private readonly IConfiguration _configuration;

        public EventManagerModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Required]
        public List<User> Users { get; set; } = new List<User>();

        public void OnGet()
        {
            try
            {
                Users = new List<User>();

                string connectionString = _configuration.GetConnectionString("DefaultConnection");


                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string sql = "SELECT Id, Firstname FROM dbo.[User];";
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int id = reader.GetInt32(0);
                                string name = reader.GetString(1);
                                Users.Add(new User(id, name));
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }  
        }
    }
}
