namespace ParkEvent.Business
{
    public class User
    {
        public int _id { get; set; }
        public string _name { get; set; }

        public User(int id, string name)
        {
            _id = id;
            _name = name;
        }
    }
}
