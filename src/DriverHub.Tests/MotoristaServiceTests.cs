using Moq;
using DriverHub.Domain.Repositories;
using DriverHub.Application.Services;
using DriverHub.Application.Services.Implementations;
using DriverHub.Domain.Entities;
using DriverHub.Application.DTOs;

namespace DriverHub.Tests;

public class MotoristaServiceTests
{
    private readonly Mock<IMotoristaRepository> _mockMotoristaRepository;
    private readonly Mock<IPasswordHasher> _mockPasswordHasher;
    private readonly IMotoristaService _motoristaService;

    public MotoristaServiceTests()
    {
        _mockMotoristaRepository = new Mock<IMotoristaRepository>();
        _mockPasswordHasher = new Mock<IPasswordHasher>();
        _motoristaService = new MotoristaService(_mockMotoristaRepository.Object, _mockPasswordHasher.Object);
    }

    [Fact]
    public async Task GetProfileAsync_MotoristaExists_ReturnsProfileDto()
    {
        // Arrange
        var motoristaId = Guid.NewGuid();
        var motorista = new Motorista 
        {
            Id = motoristaId, 
            Nome = "Test", 
            Sobrenome = "User", 
            Email = "test@example.com"
        };
        _mockMotoristaRepository.Setup(repo => repo.GetByIdAsync(motoristaId)).ReturnsAsync(motorista);

        // Act
        var result = await _motoristaService.GetProfileAsync(motoristaId.ToString());

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(motorista.Nome, result.Value.Nome);
        Assert.Equal(motorista.Sobrenome, result.Value.Sobrenome);
        Assert.Equal(motorista.Email, result.Value.Email);
    }

    [Fact]
    public async Task GetProfileAsync_MotoristaDoesNotExist_ReturnsFailure()
    {
        // Arrange
        var motoristaId = Guid.NewGuid();
        _mockMotoristaRepository.Setup(repo => repo.GetByIdAsync(motoristaId)).ReturnsAsync((Motorista)null);

        // Act
        var result = await _motoristaService.GetProfileAsync(motoristaId.ToString());

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("Motorista não encontrado.", result.Error);
    }

    [Fact]
    public async Task UpdateProfileAsync_ValidUpdate_ReturnsSuccess()
    {
        // Arrange
        var motoristaId = Guid.NewGuid();
        var motorista = new Motorista { Id = motoristaId, Nome = "Old Name", Email = "old@example.com" };
        var updateDto = new UpdateProfileDto { Nome = "New Name", Email = "new@example.com" };

        _mockMotoristaRepository.Setup(repo => repo.GetByIdAsync(motoristaId)).ReturnsAsync(motorista);
        _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(updateDto.Email)).ReturnsAsync((Motorista)null);

        // Act
        var result = await _motoristaService.UpdateProfileAsync(motoristaId.ToString(), updateDto);

        // Assert
        Assert.True(result.IsSuccess);
        _mockMotoristaRepository.Verify(repo => repo.UpdateAsync(It.Is<Motorista>(m => m.Nome == "New Name" && m.Email == "new@example.com")), Times.Once);
    }

    [Fact]
    public async Task UpdateProfileAsync_EmailInUse_ReturnsFailure()
    {
        // Arrange
        var motoristaId = Guid.NewGuid();
        var otherMotoristaId = Guid.NewGuid();
        var motorista = new Motorista { Id = motoristaId, Email = "old@example.com" };
        var otherMotorista = new Motorista { Id = otherMotoristaId, Email = "new@example.com" };
        var updateDto = new UpdateProfileDto { Email = "new@example.com" };

        _mockMotoristaRepository.Setup(repo => repo.GetByIdAsync(motoristaId)).ReturnsAsync(motorista);
        _mockMotoristaRepository.Setup(repo => repo.GetByEmailAsync(updateDto.Email)).ReturnsAsync(otherMotorista);

        // Act
        var result = await _motoristaService.UpdateProfileAsync(motoristaId.ToString(), updateDto);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("O e-mail informado já está em uso por outra conta.", result.Error);
    }

     [Fact]
    public async Task UpdateProfileAsync_PasswordUpdate_HashesPassword()
    {
        // Arrange
        var motoristaId = Guid.NewGuid();
        var motorista = new Motorista { Id = motoristaId };
        var updateDto = new UpdateProfileDto { NovaSenha = "newPassword123" };
        var hashedPassword = ("hashedPassword", "salt");

        _mockMotoristaRepository.Setup(repo => repo.GetByIdAsync(motoristaId)).ReturnsAsync(motorista);
        _mockPasswordHasher.Setup(ph => ph.HashPassword(updateDto.NovaSenha)).Returns(hashedPassword);

        // Act
        var result = await _motoristaService.UpdateProfileAsync(motoristaId.ToString(), updateDto);

        // Assert
        Assert.True(result.IsSuccess);
        _mockPasswordHasher.Verify(ph => ph.HashPassword("newPassword123"), Times.Once);
        _mockMotoristaRepository.Verify(repo => repo.UpdateAsync(It.Is<Motorista>(m => m.SenhaHash == hashedPassword.Item1 && m.Sal == hashedPassword.Item2)), Times.Once);
    }
}
