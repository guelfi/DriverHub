using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using DriverHub.Infrastructure.Data;
using DriverHub.Infrastructure.Repositories;
using DriverHub.Domain.Repositories;
using DriverHub.Application.Services.Implementations;
using DriverHub.Application.Services;
using DriverHub.Application.DTOs;
using Microsoft.Extensions.Logging;

namespace DriverHub.AdminTool
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var serviceProvider = ConfigureServices();
            using var scope = serviceProvider.CreateScope();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

            if (args.Length > 0 && args[0].ToLower() == "list-admins")
            {
                await ListAdmins(scope, logger);
            }
            else if (args.Length >= 4)
            {
                await RegisterAdmin(scope, args, logger);
            }
            else
            {
                logger.LogWarning("Comando inválido. Uso:");
                logger.LogInformation("Para registrar um administrador: dotnet run -- <email> <senha> <nome> <sobrenome>");
                logger.LogInformation("Para listar administradores:    dotnet run -- list-admins");
            }
        }

        private static async Task RegisterAdmin(IServiceScope scope, string[] args, ILogger<Program> logger)
        {
            var email = args[0];
            var password = args[1];
            var nome = args[2];
            var sobrenome = args[3];

            var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();

            var registerDto = new RegisterDto
            {
                Email = email,
                Password = password,
                Nome = nome,
                Sobrenome = sobrenome
            };

            logger.LogInformation("Registrando admin com email: {Email}, senha (raw): {Password}", email, password);
            var result = await authService.RegisterAdminAsync(registerDto);

            if (result.IsSuccess)
            {
                logger.LogInformation("Usuário administrador '{Email}' registrado com sucesso.", email);
            }
            else
            {
                logger.LogError("Erro ao registrar o usuário administrador: {Error}", result.Error);
            }
        }

        private static async Task ListAdmins(IServiceScope scope, ILogger<Program> logger)
        {
            var adminRepository = scope.ServiceProvider.GetRequiredService<IAdminRepository>();
            
            try
            {
                var admins = await adminRepository.GetAllAsync();

                if (admins.Any())
                {
                    logger.LogInformation("Usuários administradores encontrados:");
                    foreach (var admin in admins)
                    {
                        logger.LogInformation("  - ID: {Id}, Nome: {Nome} {Sobrenome}, Email: {Email}", admin.Id, admin.Nome, admin.Sobrenome, admin.Email);
                    }
                }
                else
                {
                    logger.LogInformation("Nenhum usuário administrador encontrado.");
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Ocorreu um erro ao listar os administradores: {Message}", ex.Message);
            }
        }

        private static IServiceProvider ConfigureServices()
        {
            var services = new ServiceCollection();

            // Configuração
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();

            services.AddSingleton<IConfiguration>(configuration);

            // DbContext
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")).UseSnakeCaseNamingConvention();
            });

            // Repositórios
            services.AddScoped<IMotoristaRepository, MotoristaRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();

            // Serviços de Aplicação
            services.AddScoped<IPasswordHasher, PasswordHasher>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthService, AuthService>();

            // Logging
            services.AddLogging(configure => configure.AddConsole());

            return services.BuildServiceProvider();
        }
    }
}
