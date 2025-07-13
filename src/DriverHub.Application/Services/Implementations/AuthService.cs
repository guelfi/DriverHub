using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using DriverHub.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace DriverHub.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IMotoristaRepository _motoristaRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(IMotoristaRepository motoristaRepository, IPasswordHasher passwordHasher, ITokenService tokenService, ILogger<AuthService> logger)
        {
            _motoristaRepository = motoristaRepository;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task RegisterAsync(string email, string password, string nome, string sobrenome)
        {
            var existingMotorista = await _motoristaRepository.GetByEmailAsync(email);
            if (existingMotorista != null)
            {
                throw new ArgumentException("Email já está em uso.");
            }

            var hashedPassword = _passwordHasher.HashPassword(password);
            var parts = hashedPassword.Split(':');
            var hash = parts[0];
            var salt = parts[1];

            var motorista = new Motorista
            {
                Id = Guid.NewGuid(),
                Nome = nome,
                Sobrenome = sobrenome,
                Email = email,
                SenhaHash = hash,
                Sal = salt,
                NumeroCelular = string.Empty,
                AluguelSemanalVeiculo = 0,
                DiasTrabalhadosPorSemana = 0,
                AutonomiaVeiculoKmPorLitro = 0,
                DataCadastro = DateTimeOffset.UtcNow,
                Role = Role.Motorista
            };

            await _motoristaRepository.AddAsync(motorista);
        }

        public async Task RegisterAdminAsync(string email, string password, string nome, string sobrenome)
        {
            var existingAdmin = await _motoristaRepository.GetByRoleAsync(Role.Admin);
            if (existingAdmin != null)
            {
                throw new InvalidOperationException("Já existe um usuário administrador. Não é permitido criar mais de um administrador via este método.");
            }

            var existingMotorista = await _motoristaRepository.GetByEmailAsync(email);
            if (existingMotorista != null)
            {
                throw new ArgumentException("Email já está em uso.");
            }

            var hashedPassword = _passwordHasher.HashPassword(password);
            var parts = hashedPassword.Split(':');
            var hash = parts[0];
            var salt = parts[1];

            var motorista = new Motorista
            {
                Id = Guid.NewGuid(),
                Nome = nome,
                Sobrenome = sobrenome,
                Email = email,
                SenhaHash = hash,
                Sal = salt,
                NumeroCelular = string.Empty,
                AluguelSemanalVeiculo = 0,
                DiasTrabalhadosPorSemana = 0,
                AutonomiaVeiculoKmPorLitro = 0,
                DataCadastro = DateTimeOffset.UtcNow,
                Role = Role.Admin // Definir a role como Admin
            };

            await _motoristaRepository.AddAsync(motorista);
            _logger.LogInformation("Primeiro usuário administrador registrado com sucesso: {Email}", email);
        }

        public async Task<string?> LoginAsync(string email, string password)
        {
            var motorista = await _motoristaRepository.GetByEmailAsync(email);
            if (motorista == null)
            {
                return null;
            }

            if (!_passwordHasher.VerifyPassword(password, motorista.SenhaHash, motorista.Sal))
            {
                return null;
            }

            return _tokenService.GenerateToken(motorista);
        }
    }
}