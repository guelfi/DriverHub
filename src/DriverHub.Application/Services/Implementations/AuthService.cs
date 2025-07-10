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

        public async Task<string> RegisterMotoristaAsync(string nome, string email, string senha, string numeroCelular, decimal aluguelSemanalVeiculo, int diasTrabalhadosPorSemana, decimal autonomiaVeiculoKmPorLitro)
        {
            var existingMotorista = await _motoristaRepository.GetByEmailAsync(email);
            if (existingMotorista != null)
            {
                throw new ArgumentException("Email já está em uso.");
            }

            var hashedPassword = _passwordHasher.HashPassword(senha);
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
                NumeroCelular = numeroCelular,
                AluguelSemanalVeiculo = aluguelSemanalVeiculo,
                DiasTrabalhadosPorSemana = diasTrabalhadosPorSemana,
                AutonomiaVeiculoKmPorLitro = autonomiaVeiculoKmPorLitro,
                DataCadastro = DateTimeOffset.UtcNow,
                Role = Role.Motorista
            };

            await _motoristaRepository.AddAsync(motorista);

            return motorista.Id.ToString();
        }

        public async Task<string> LoginMotoristaAsync(string email, string senha)
        {
            var motorista = await _motoristaRepository.GetByEmailAsync(email);
            if (motorista == null)
            {
                throw new ArgumentException("Credenciais inválidas.");
            }

            if (!_passwordHasher.VerifyPassword(senha, motorista.SenhaHash, motorista.Sal))
            {
                throw new ArgumentException("Credenciais inválidas.");
            }

            return motorista.Id.ToString();
        }
    }
}