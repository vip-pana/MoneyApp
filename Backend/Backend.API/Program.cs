using Backend.API.Configuration;

namespace Backend.API
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var corsPolicy = builder.Configuration.GetValue<string>("corspolicy");

            // Dependencies Injection
            builder.Services.InstallServices(builder.Configuration, typeof(IServiceInstaller).Assembly);

            var app = builder.Build();

            if (!string.IsNullOrWhiteSpace(corsPolicy)) app.UseCors(corsPolicy);

            app.UseWebSockets();
            app.MapGraphQL();

            app.Run();
        }
    }
}
