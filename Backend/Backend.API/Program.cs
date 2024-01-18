using Backend.API.Configuration;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace Backend.API
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Dependencies Injection
            builder.Services.InstallServices(builder.Configuration, typeof(IServiceInstaller).Assembly);

            var app = builder.Build();

            app.UseCors("corspolicy");

            app.UseWebSockets();
            app.MapGraphQL();

            app.Run();
        }
    }
}
