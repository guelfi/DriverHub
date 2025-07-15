using Xunit;
using Moq;
using DriverHub.Application.Services;
using DriverHub.Application.Services.Implementations;
using DriverHub.Domain.Repositories;
using DriverHub.Domain.Entities;
using Microsoft.Extensions.Logging;
using DriverHub.Application.DTOs;
using DriverHub.Application.Common;

namespace DriverHub.Tests
{
    public class AuthServiceTests
    {
        private readonly Mock<IMotoristaRepository> _mockMotoristaRepository;
        private readonly Mock<IAdminRepository> _mockAdminRepository;
        private readonly Mock<IPasswordHasher> _mockPasswordHasher;
        private readonly Mock<ITokenService> _mockTokenService;
        private readonly Mock<ILogger<AuthService>> _mockLogger;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _mockMotoristaRepository = new Mock<IMotoristaRepository>();
            _mockAdminRepository = new Mock<IAdminRepository>();
            _mockPasswordHasher = new Mock<IPasswordHasher>();
            _mockTokenService = new Mock<ITokenService>();
            _mockLogger = new Mock<ILogger<AuthService>>();

            _authService = new AuthService(
                _mockMotoristaRepository.Object,
                _mockAdminRepository.Object,
                _mockPasswordHasher.Object,
                _mockTokenService.Object,
                _mockLogger.Object);
        }

        [Fact]
        public async Task RegisterMotorista_ValidUser_ReturnsSuccess()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "test@example.com", Password = "password123", Nome = "Test", Sobrenome = "User" };
            _mockPasswordHasher.Setup(ph => ph.HashPassword(It.IsAny<string>()))
                              .Returns(("hashedPassword", "salt"));

            _mockMotoristaRepository.Setup(repo => repo.AddAsync(It.IsAny<Motorista>()))
                                   .Returns(Task.CompletedTask);

            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync((Motorista)null!);

            // Act
            var result = await _authService.RegisterMotoristaAsync(registerDto);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("Motorista registrado com sucesso.", result.Value);
            _mockPasswordHasher.Verify(ph => ph.HashPassword("password123"), Times.Once);
            _mockMotoristaRepository.Verify(repo => repo.AddAsync(It.Is<Motorista>(m => m.Email == "test@example.com" && m.SenhaHash == "hashedPassword")), Times.Once);
        }

        [Fact]
        public async Task RegisterMotorista_ExistingUser_ReturnsFailure()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "existing@example.com", Password = "password123", Nome = "Existing", Sobrenome = "User" };
            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync(new Motorista());

            // Act
            var result = await _authService.RegisterMotoristaAsync(registerDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email de motorista já está em uso.", result.Error);
            _mockPasswordHasher.Verify(ph => ph.HashPassword(It.IsAny<string>()), Times.Never);
            _mockMotoristaRepository.Verify(repo => repo.AddAsync(It.IsAny<Motorista>()), Times.Never);
        }

        [Fact]
        public async Task LoginMotorista_ValidCredentials_ReturnsLoginResponseDto()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "password123" };
            var motorista = new Motorista { Id = Guid.NewGuid(), Email = "test@example.com", Nome = "Test", Sobrenome = "User", SenhaHash = "hashedPassword", Sal = "salt" };
            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync("test@example.com")).ReturnsAsync(motorista);
            _mockPasswordHasher.Setup(ph => ph.VerifyPassword("password123", "hashedPassword", "salt")).Returns(true);
            _mockTokenService.Setup(ts => ts.GenerateToken(motorista.Id, "Motorista")).Returns("mocked_jwt_token");

            // Act
            var result = await _authService.LoginMotoristaAsync(loginDto);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.NotNull(result.Value);
            Assert.Equal("mocked_jwt_token", result.Value.Token);
            Assert.Equal("Test", result.Value.Nome);
            Assert.Equal("User", result.Value.Sobrenome);
        }

        [Fact]
        public async Task LoginMotorista_InvalidCredentials_ReturnsFailure()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "wrongpassword" };
            var motorista = new Motorista { Id = Guid.NewGuid(), Email = "test@example.com", Nome = "Test", Sobrenome = "User", SenhaHash = "hashedPassword", Sal = "salt" };
            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync("test@example.com")).ReturnsAsync(motorista);
            _mockPasswordHasher.Setup(ph => ph.VerifyPassword("wrongpassword", "hashedPassword", "salt")).Returns(false);

            // Act
            var result = await _authService.LoginMotoristaAsync(loginDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email ou senha do motorista inválidos.", result.Error);
            _mockTokenService.Verify(ts => ts.GenerateToken(It.IsAny<Guid>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task RegisterAdmin_ValidAdmin_ReturnsSuccess()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "admin@example.com", Password = "adminPassword", Nome = "Admin", Sobrenome = "User" };
            _mockPasswordHasher.Setup(ph => ph.HashPassword(It.IsAny<string>()))
                              .Returns(("hashedPassword", "salt"));
            _mockAdminRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                .ReturnsAsync((Admin)null!); // Nenhum admin existe
            _mockAdminRepository.Setup(repo => repo.AddAsync(It.IsAny<Admin>()))
                                .Returns(Task.CompletedTask);

            // Act
            var result = await _authService.RegisterAdminAsync(registerDto);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("Administrador registrado com sucesso.", result.Value);
            _mockAdminRepository.Verify(repo => repo.AddAsync(It.Is<Admin>(a => a.Email == "admin@example.com" && a.SenhaHash == "hashedPassword")), Times.Once);
            _mockLogger.Verify(l => l.Log(LogLevel.Information, It.IsAny<EventId>(), It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Administrador admin@example.com registrado com sucesso.")), null, It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Once);
        }

        [Fact]
        public async Task RegisterAdmin_ExistingAdmin_ReturnsFailure()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "admin@example.com", Password = "adminPassword", Nome = "Admin", Sobrenome = "User" };
            _mockAdminRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                .ReturnsAsync(new Admin()); // Admin já existe

            // Act
            var result = await _authService.RegisterAdminAsync(registerDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email de administrador já está em uso.", result.Error);
            _mockAdminRepository.Verify(repo => repo.AddAsync(It.IsAny<Admin>()), Times.Never);
            _mockLogger.Verify(l => l.Log(LogLevel.Information, It.IsAny<EventId>(), It.IsAny<It.IsAnyType>(), It.IsAny<Exception>(), It.IsAny<Func<It.IsAnyType, Exception, string>>()), Times.Never);
        }

        [Fact]
        public async Task LoginAdmin_ValidCredentials_ReturnsLoginResponseDto()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "admin@example.com", Password = "adminPassword" };
            var admin = new Admin { Id = Guid.NewGuid(), Email = "admin@example.com", Nome = "Admin", Sobrenome = "User", SenhaHash = "hashedPassword", Sal = "salt" };
            _mockAdminRepository.Setup(repo => repo.GetByEmailAsync("admin@example.com")).ReturnsAsync(admin);
            _mockPasswordHasher.Setup(ph => ph.VerifyPassword("adminPassword", "hashedPassword", "salt")).Returns(true);
            _mockTokenService.Setup(ts => ts.GenerateToken(admin.Id, "Admin")).Returns("mocked_admin_jwt_token");

            // Act
            var result = await _authService.LoginAdminAsync(loginDto);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.NotNull(result.Value);
            Assert.Equal("mocked_admin_jwt_token", result.Value.Token);
            Assert.Equal("Admin", result.Value.Nome);
            Assert.Equal("User", result.Value.Sobrenome);
        }

        [Fact]
        public async Task LoginAdmin_InvalidCredentials_ReturnsFailure()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "admin@example.com", Password = "wrongpassword" };
            var admin = new Admin { Id = Guid.NewGuid(), Email = "admin@example.com", Nome = "Admin", Sobrenome = "User", SenhaHash = "hashedPassword", Sal = "salt" };
            _mockAdminRepository.Setup(repo => repo.GetByEmailAsync("admin@example.com")).ReturnsAsync(admin);
            _mockPasswordHasher.Setup(ph => ph.VerifyPassword("wrongpassword", "hashedPassword", "salt")).Returns(false);

            // Act
            var result = await _authService.LoginAdminAsync(loginDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email ou senha do administrador inválidos.", result.Error);
            _mockTokenService.Verify(ts => ts.GenerateToken(It.IsAny<Guid>(), It.IsAny<string>()), Times.Never);
        }
    }
}