using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using DriverHub.Application.Services;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using DriverHub.Application.DTOs;
using DriverHub.Application.Common;
using System.Collections.Generic;

namespace DriverHub.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IMotoristaRepository _motoristaRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            IMotoristaRepository motoristaRepository,
            IAdminRepository adminRepository, 
            IPasswordHasher passwordHasher, 
            ITokenService tokenService, 
            ILogger<AuthService> logger)
        {
            _motoristaRepository = motoristaRepository;
            _adminRepository = adminRepository;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<Result<string>> RegisterMotoristaAsync(RegisterDto registerDto)
        {
            var existingMotorista = await _motoristaRepository.GetByEmailAsync(registerDto.Email);
            if (existingMotorista != null)
            {
                return Result<string>.Failure("Email de motorista já está em uso.");
            }

            var (hash, salt) = _passwordHasher.HashPassword(registerDto.Password);

            var motorista = new Motorista
            {
                Id = Guid.NewGuid(),
                Nome = registerDto.Nome,
                Sobrenome = registerDto.Sobrenome,
                Email = registerDto.Email,
                SenhaHash = hash,
                Sal = salt,
                NumeroCelular = string.Empty, // Pode ser preenchido depois
                DataCadastro = DateTimeOffset.UtcNow
            };

            await _motoristaRepository.AddAsync(motorista);
            _logger.LogInformation("Motorista {Email} registrado com sucesso.", registerDto.Email);
            return Result<string>.Success(motorista.Id.ToString());
        }

        public async Task<Result<LoginResponseDto>> LoginMotoristaAsync(LoginDto loginDto)
        {
            var motorista = await _motoristaRepository.GetByEmailAsync(loginDto.Email);
            if (motorista == null || !_passwordHasher.VerifyPassword(loginDto.Password, motorista.SenhaHash, motorista.Sal))
            {
                return Result<LoginResponseDto>.Failure("Email ou senha do motorista inválidos.");
            }

            var token = _tokenService.GenerateToken(motorista.Id, "Motorista");
            var response = new LoginResponseDto { Token = token, Nome = motorista.Nome, Sobrenome = motorista.Sobrenome };
            
            _logger.LogInformation("Motorista {Email} logado com sucesso.", loginDto.Email);
            return Result<LoginResponseDto>.Success(response);
        }

        public async Task<Result<string>> RegisterAdminAsync(RegisterDto registerDto)
        {
            var existingAdmin = await _adminRepository.GetByEmailAsync(registerDto.Email);
            if (existingAdmin != null)
            {
                return Result<string>.Failure("Email de administrador já está em uso.");
            }

            var (hash, salt) = _passwordHasher.HashPassword(registerDto.Password);

            var admin = new Admin
            {
                Id = Guid.NewGuid(),
                Nome = registerDto.Nome,
                Sobrenome = registerDto.Sobrenome,
                Email = registerDto.Email,
                SenhaHash = hash,
                Sal = salt,
                DataCadastro = DateTimeOffset.UtcNow
            };

            await _adminRepository.AddAsync(admin);
            _logger.LogInformation("Administrador {Email} registrado com sucesso.", registerDto.Email);
            return Result<string>.Success("Administrador registrado com sucesso.");
        }

        public async Task<Result<LoginResponseDto>> LoginAdminAsync(LoginDto loginDto)
        {
            var admin = await _adminRepository.GetByEmailAsync(loginDto.Email);
            if (admin == null)
            {
                _logger.LogWarning("Tentativa de login de administrador falhou: Email {Email} não encontrado.", loginDto.Email);
                return Result<LoginResponseDto>.Failure("Email ou senha do administrador inválidos.");
            }

            _logger.LogInformation("Admin encontrado: Email={Email}, StoredHash={StoredHash}, StoredSalt={StoredSalt}", admin.Email, admin.SenhaHash, admin.Sal);
            _logger.LogInformation("Verificando senha para {Email}. Senha recebida (primeiros 5 chars): {PasswordPrefix}", loginDto.Email, loginDto.Password.Substring(0, Math.Min(loginDto.Password.Length, 5)));
            _logger.LogInformation("Hash armazenado: {StoredHash}, Salt armazenado: {StoredSalt}", admin.SenhaHash, admin.Sal);

            if (!_passwordHasher.VerifyPassword(loginDto.Password, admin.SenhaHash, admin.Sal))
            {
                _logger.LogWarning("Tentativa de login de administrador falhou: Senha incorreta para o email {Email}.", loginDto.Email);
                return Result<LoginResponseDto>.Failure("Email ou senha do administrador inválidos.");
            }

            var token = _tokenService.GenerateToken(admin.Id, "Admin");
            var response = new LoginResponseDto { Token = token, Nome = admin.Nome, Sobrenome = admin.Sobrenome };

            _logger.LogInformation("Administrador {Email} logado com sucesso.", loginDto.Email);
            return Result<LoginResponseDto>.Success(response);
        }

        public async Task<Result<int>> GetMotoristCountAsync()
        {
            var count = await _motoristaRepository.GetMotoristCountAsync();
            return Result<int>.Success(count);
        }

        public async Task<Result<PaginatedResult<Motorista>>> GetAllMotoristasAsync(int pageNumber, int pageSize)
        {
            var (motoristas, totalCount) = await _motoristaRepository.GetAllAsync(pageNumber, pageSize);
            return Result<PaginatedResult<Motorista>>.Success(new PaginatedResult<Motorista>(motoristas, totalCount, pageNumber, pageSize));
        }
    }
}
