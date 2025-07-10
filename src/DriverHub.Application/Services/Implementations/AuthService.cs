using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using DriverHub.Application.Services;
using System;
using System.Threading.Tasks;

namespace DriverHub.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IMotoristaRepository _motoristaRepository;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(IMotoristaRepository motoristaRepository, IPasswordHasher passwordHasher)
        {
            _motoristaRepository = motoristaRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task RegisterAsync(string email, string password, string nome)
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

            return motorista.Id.ToString(); // This should be a JWT token in a real application
        }
    }
}