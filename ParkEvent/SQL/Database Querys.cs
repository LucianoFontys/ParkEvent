using System.Data.SqlClient;
using Microsoft.Data.SqlClient;

namespace ParkEvent.SQL
{
    public class Database_Querys
    {
        public static string GetAllEvents()
        {
            return "SELECT * FROM Events";
        }
        public static string GetEventById(int eventId)
        {
            return $"SELECT * FROM Events WHERE EventId = {eventId}";
        }
        public static string InsertEvent(string eventName, string eventDate)
        {
            return $"INSERT INTO Events (EventName, EventDate) VALUES ('{eventName}', '{eventDate}')";
        }
        public static string UpdateEvent(int eventId, string eventName, string eventDate)
        {
            return $"UPDATE Events SET EventName = '{eventName}', EventDate = '{eventDate}' WHERE EventId = {eventId}";
        }
        public static string DeleteEvent(int eventId)
        {
            return $"DELETE FROM Events WHERE EventId = {eventId}";
        }

        public static string GetAllUsers()
        {
            return "SELECT * FROM Users";
        }

        public static string DatabaseConnectionString()
        {
            return "Server=mssqlstud.fhict.local;Database=dbi417189_groupp;User Id=dbi417189_groupp;Password=Maandag1404!;TrustServerCertificate=true;";
        }
    }
}
