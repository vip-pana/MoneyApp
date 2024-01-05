namespace Backend.Core.Entities
{
    public class User : BaseEntity
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

    }
}
