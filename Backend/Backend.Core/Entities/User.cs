namespace Backend.Core.Entities
{
    public class User : BaseEntity
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required List<Account> Accounts { get; set; }

        public User() : base()
        {
            Accounts = new List<Account>();
        }
    }
}
