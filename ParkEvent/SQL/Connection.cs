using ParkEvent.Business;
using Microsoft.Data.SqlClient;

namespace ParkEvent.SQL
{
    public class Connection
    {
        public List<User> GetAllUsers()
        {
            List<User> users = new List<User>();
            using(SqlConnection connection = new SqlConnection(Database_Querys.DatabaseConnectionString()))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(Database_Querys.GetAllUsers(), connection);
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        int id = reader.GetInt32(0);
                        string name = reader.GetString(1);
                        User user = new User(id,name); // Assuming User has a property Id
                        users.Add(user);
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine("SQL error: " + ex.Message);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Unexpected error: " + ex.Message);
                }
            }
            return users;
        }
    }
}
