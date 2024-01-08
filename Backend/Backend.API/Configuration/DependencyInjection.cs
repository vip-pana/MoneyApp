using System.Reflection;

namespace Backend.API.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection InstallServices(this IServiceCollection services,
            IConfiguration configuration, params Assembly[] assemblies)
        {
            var serviceInstallers = assemblies.SelectMany(a => a.DefinedTypes)
                .Where(IsAssignableToType<IServiceInstaller>)
                .Select(Activator.CreateInstance)
                .Cast<IServiceInstaller>();

            foreach (IServiceInstaller serviceInstaller in serviceInstallers)
            {
                serviceInstaller.Install(services, configuration);
            }

            return services;

            static bool IsAssignableToType<T>(TypeInfo typeInfo) =>
                typeof(T).IsAssignableFrom(typeInfo) &&
                !typeInfo.IsInterface && !typeInfo.IsAbstract;
        }
    }
}
