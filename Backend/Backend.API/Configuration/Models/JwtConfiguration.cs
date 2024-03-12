namespace Backend.API.Configuration.Models
{
    public class JwtConfiguration
    {
        public required string Key { get; set; }
        public required string RefreshKey { get; set; }
        public required string Issuer { get; set; }
        public required string Audience { get; set; }
    }
}
