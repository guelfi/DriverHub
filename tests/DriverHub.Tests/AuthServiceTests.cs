using Xunit;
using Moq;
using DriverHub.Application.Services;
using DriverHub.Application.Services.Implementations;
using DriverHub.Domain.Repositories;
using DriverHub.Domain.Entities;
using DriverHub.API.Models.DTOs;

namespace DriverHub.Tests
{
    public class AuthServiceTests
    {
        [Fact]
        public async Task Register_ValidUser_ReturnsSuccess()
        {
            // Arrange
            var mockMotoristaRepository = new Mock<IMotoristaRepository>();
            var mockPasswordHasher = new Mock<IPasswordHasher>();

            mockPasswordHasher.Setup(ph => ph.HashPassword(It.IsAny<string>()))
                              .Returns("hashedPassword:salt"); // Changed to match format

            mockMotoristaRepository.Setup(repo => repo.AddAsync(It.IsAny<Motorista>()))
                                   .Returns(Task.CompletedTask);

            mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync((Motorista)null!); // Simulate no existing user

            var authService = new AuthService(mockMotoristaRepository.Object, mockPasswordHasher.Object);

            var registerRequest = new RegisterRequest
            {
                Email = "test@example.com",
                Password = "password123",
                Nome = "Test User"
            };

            // Act
            await authService.RegisterAsync(registerRequest.Email, registerRequest.Password, registerRequest.Nome);

            // Assert
            mockPasswordHasher.Verify(ph => ph.HashPassword(registerRequest.Password), Times.Once);
            mockMotoristaRepository.Verify(repo => repo.AddAsync(It.Is<Motorista>(m => m.Email == registerRequest.Email && m.SenhaHash == "hashedPassword")), Times.Once);
        }

        [Fact]
        public async Task Register_ExistingUser_ThrowsArgumentException()
        {
            // Arrange
            var mockMotoristaRepository = new Mock<IMotoristaRepository>();
            var mockPasswordHasher = new Mock<IPasswordHasher>();

            mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(It.IsAny<string>()))
                                   .ReturnsAsync(new Motorista()); // Simulate existing user

            var authService = new AuthService(mockMotoristaRepository.Object, mockPasswordHasher.Object);

            var registerRequest = new RegisterRequest
            {
                Email = "existing@example.com",
                Password = "password123",
                Nome = "Existing User"
            };

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => authService.RegisterAsync(registerRequest.Email, registerRequest.Password, registerRequest.Nome));
            mockPasswordHasher.Verify(ph => ph.HashPassword(It.IsAny<string>()), Times.Never);
            mockMotoristaRepository.Verify(repo => repo.AddAsync(It.IsAny<Motorista>()), Times.Never);
        }
    }
}