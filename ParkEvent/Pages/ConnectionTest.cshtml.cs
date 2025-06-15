using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;

namespace ParkEvent.Pages
{
    public class ConnectionTestModel : PageModel
    {
        private readonly ILogger<ConnectionTestModel> _logger;

        public string ConnectionMessage { get; private set; }

        public ConnectionTestModel(ILogger<ConnectionTestModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            string connectionString = "Server=mssqlstud.fhict.local;Database=dbi417189_groupp;User Id=dbi417189_groupp;Password=Maandag1404!;TrustServerCertificate=true;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    ConnectionMessage = "✅ Connection successful.";
                }
                catch (SqlException ex)
                {
                    ConnectionMessage = "❌ SQL error: " + ex.Message;
                    _logger.LogError(ex, "SQL error during database connection.");
                }
                catch (Exception ex)
                {
                    ConnectionMessage = "❌ Unexpected error: " + ex.Message;
                    _logger.LogError(ex, "Unexpected error during database connection.");
                }
                finally
                {
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        connection.Close();
                    }
                }
            }
        }
    }
}
