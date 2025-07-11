using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using DriverHub.Application.Services;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public AuthService(IMotoristaRepository motoristaRepository, IPasswordHasher passwordHasher, IConfiguration configuration)
        {
            _motoristaRepository = motoristaRepository;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
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

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured.");
            var key = Encoding.ASCII.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("email", motorista.Email) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}