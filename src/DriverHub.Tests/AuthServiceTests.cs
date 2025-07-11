using Xunit;
using Moq;
using DriverHub.Application.Services;
using DriverHub.Application.Services.Implementations;
using DriverHub.Domain.Repositories;
using DriverHub.Domain.Entities;
using Microsoft.Extensions.Logging; // Adicionado para ILogger

namespace DriverHub.Tests
{
    public class AuthServiceTests
    {
        private readonly Mock<IMotoristaRepository> _mockMotoristaRepository;
        private readonly Mock<IPasswordHasher> _mockPasswordHasher;
        private readonly Mock<ITokenService> _mockTokenService; // Adicionado
        private readonly Mock<ILogger<AuthService>> _mockLogger; // Adicionado
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _mockMotoristaRepository = new Mock<IMotoristaRepository>();
            _mockPasswordHasher = new Mock<IPasswordHasher>();
            _mockTokenService = new Mock<ITokenService>(); // Inicializado
            _mockLogger = new Mock<ILogger<AuthService>>(); // Inicializado

            _authService = new AuthService(
                _mockMotoristaRepository.Object,
                _mockPasswordHasher.Object,
                _mockTokenService.Object, // Passado para o construtor
                _mockLogger.Object); // Passado para o construtor
        }

        [Fact]
        public async Task Register_ValidUser_ReturnsSuccess()
        {
            // Arrange
            _mockPasswordHasher.Setup(ph => ph.HashPassword(It.IsAny<string>()))
                              .Returns("hashedPassword:salt");

            _mockMotoristaRepository.Setup(repo => repo.AddAsync(It.IsAny<Motorista>()))
                                   .Returns(Task.CompletedTask);

            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync((Motorista)null!);

            // Act
            await _authService.RegisterAsync("test@example.com", "password123", "Test User");

            // Assert
            _mockPasswordHasher.Verify(ph => ph.HashPassword("password123"), Times.Once);
            _mockMotoristaRepository.Verify(repo => repo.AddAsync(It.Is<Motorista>(m => m.Email == "test@example.com" && m.SenhaHash == "hashedPassword")), Times.Once);
        }

        [Fact]
        public async Task Register_ExistingUser_ThrowsArgumentException()
        {
            // Arrange
            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync(new Motorista());

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _authService.RegisterAsync("existing@example.com", "password123", "Existing User"));
            _mockPasswordHasher.Verify(ph => ph.HashPassword(It.IsAny<string>()), Times.Never);
            _mockMotoristaRepository.Verify(repo => repo.AddAsync(It.IsAny<Motorista>()), Times.Never);
        }

        [Fact]
        public async Task Login_ValidCredentials_ReturnsJwtToken()
        {
            // Arrange
            var motorista = new Motorista { Email = "test@example.com", SenhaHash = "hashedPassword", Sal = "salt" };
            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync("test@example.com")).ReturnsAsync(motorista);
            _mockPasswordHasher.Setup(ph => ph.VerifyPassword("password123", "hashedPassword", "salt")).Returns(true);
            _mockTokenService.Setup(ts => ts.GenerateToken(It.IsAny<Motorista>())).Returns("mocked_jwt_token"); // Mock para GenerateToken

            // Act
            var token = await _authService.LoginAsync("test@example.com", "password123");

            // Assert
            Assert.NotNull(token);
            Assert.Equal("mocked_jwt_token", token);
        }
    }
}