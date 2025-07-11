using Xunit;
using Moq;
using DriverHub.Application.Services;
using DriverHub.Application.Services.Implementations;
using DriverHub.Domain.Repositories;
using DriverHub.Domain.Entities;
using DriverHub.API.Models.DTOs;
using Microsoft.Extensions.Configuration;

namespace DriverHub.Tests
{
    public class AuthServiceTests
    {
        private readonly Mock<IMotoristaRepository> _mockMotoristaRepository;
        private readonly Mock<IPasswordHasher> _mockPasswordHasher;
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _mockMotoristaRepository = new Mock<IMotoristaRepository>();
            _mockPasswordHasher = new Mock<IPasswordHasher>();
            _mockConfiguration = new Mock<IConfiguration>();

            // Mock IConfiguration
            var inMemorySettings = new Dictionary<string, string?> {
                {"Jwt:Key", "this_is_a_much_longer_and_more_secure_secret_key_for_jwt"}
            };

            IConfiguration configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns(configuration["Jwt:Key"]);

            _authService = new AuthService(_mockMotoristaRepository.Object, _mockPasswordHasher.Object, _mockConfiguration.Object);
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

            var registerRequest = new RegisterRequest
            {
                Email = "test@example.com",
                Password = "password123",
                Nome = "Test User"
            };

            // Act
            await _authService.RegisterAsync(registerRequest.Email, registerRequest.Password, registerRequest.Nome);

            // Assert
            _mockPasswordHasher.Verify(ph => ph.HashPassword(registerRequest.Password), Times.Once);
            _mockMotoristaRepository.Verify(repo => repo.AddAsync(It.Is<Motorista>(m => m.Email == registerRequest.Email && m.SenhaHash == "hashedPassword")), Times.Once);
        }

        [Fact]
        public async Task Register_ExistingUser_ThrowsArgumentException()
        {
            // Arrange
            _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync(new Motorista());

            var registerRequest = new RegisterRequest
            {
                Email = "existing@example.com",
                Password = "password123",
                Nome = "Existing User"
            };

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _authService.RegisterAsync(registerRequest.Email, registerRequest.Password, registerRequest.Nome));
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

            // Act
            var token = await _authService.LoginAsync("test@example.com", "password123");

            // Assert
            Assert.NotNull(token);
        }
    }
}