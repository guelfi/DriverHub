using Xunit;
using Moq;
using DriverHub.Application.Services.Implementations;
using DriverHub.Domain.Entities;
using DriverHub.Application.DTOs;
using DriverHub.Application.Services;
using Microsoft.Extensions.Logging;
using DriverHub.Domain.Interfaces;
using DriverHub.Application.Services.Interfaces;

namespace DriverHub.Tests
{
    public class AuthServiceTests
    {
        private readonly Mock<IMotoristaRepository> _mockMotoristaRepository;
        private readonly Mock<IPasswordHasher> _mockPasswordHasher;
        private readonly Mock<ITokenService> _mockTokenService;
        private readonly Mock<ILogger<AuthService>> _mockLogger;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _mockMotoristaRepository = new Mock<IMotoristaRepository>();
            _mockPasswordHasher = new Mock<IPasswordHasher>();
            _mockTokenService = new Mock<ITokenService>();
            _mockLogger = new Mock<ILogger<AuthService>>();

            _authService = new AuthService(
                _mockMotoristaRepository.Object,
                _mockPasswordHasher.Object,
                _mockTokenService.Object,
                _mockLogger.Object
            );
        }

        // --- Testes para o método Register ---

        [Fact]
        public async Task Register_DeveRetornarSucesso_QuandoEmailNaoExiste()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "novo@exemplo.com", Senha = "SenhaSegura123" };
            _mockMotoristaRepository.Setup(r => r.GetByEmailAsync(It.IsAny<string>()))
                                    .ReturnsAsync((Motorista)null);
            _mockPasswordHasher.Setup(h => h.HashPassword(It.IsAny<string>()))
                               .Returns("hashedPassword");

            // Act
            var result = await _authService.Register(registerDto);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.True(result.Value);
            _mockMotoristaRepository.Verify(r => r.AddAsync(It.IsAny<Motorista>()), Times.Once);
            _mockMotoristaRepository.Verify(r => r.UnitOfWork.CommitAsync(), Times.Once);
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Novo motorista registrado com sucesso: novo@exemplo.com")), // Ajuste na mensagem do log
                    null,
                    (Func<It.IsAnyType, Exception, string>)It.IsAny<object>()),
                Times.Once);
        }

        [Fact]
        public async Task Register_DeveRetornarFalha_QuandoEmailJaExiste()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "existente@exemplo.com", Senha = "SenhaSegura123" };
            _mockMotoristaRepository.Setup(r => r.GetByEmailAsync(It.IsAny<string>()))
                                    .ReturnsAsync(new Motorista("existente@exemplo.com", "hashedOldPassword"));

            // Act
            var result = await _authService.Register(registerDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email já registrado.", result.Error); // Ajuste na mensagem de erro
            Assert.False(result.Value);
            _mockMotoristaRepository.Verify(r => r.AddAsync(It.IsAny<Motorista>()), Times.Never);
            _mockMotoristaRepository.Verify(r => r.UnitOfWork.CommitAsync(), Times.Never);
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Warning,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Tentativa de registro com e-mail já cadastrado: 'existente@exemplo.com'.")), // Mantido o original, assumindo que esta mensagem estava correta
                    null,
                    (Func<It.IsAnyType, Exception, string>)It.IsAny<object>()),
                Times.Once);
        }

        // --- Testes para o método Login ---

        [Fact]
        public async Task Login_DeveRetornarToken_QuandoCredenciaisSaoValidas()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "usuario@exemplo.com", Senha = "SenhaCorreta123" };
            var motorista = new Motorista(loginDto.Email, "hashedPassword");
            _mockMotoristaRepository.Setup(r => r.GetByEmailAsync(loginDto.Email))
                                    .ReturnsAsync(motorista);
            _mockPasswordHasher.Setup(h => h.VerifyPassword("SenhaCorreta123", "hashedPassword"))
                               .Returns(true);
            _mockTokenService.Setup(t => t.GenerateToken(motorista))
                             .Returns("fakeJwtToken");

            // Act
            var result = await _authService.Login(loginDto);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("fakeJwtToken", result.Value);
            Assert.Null(result.Error);
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Login bem-sucedido para o email: usuario@exemplo.com")), // Ajuste na mensagem do log
                    null,
                    (Func<It.IsAnyType, Exception, string>)It.IsAny<object>()),
                Times.Once);
        }

        [Fact]
        public async Task Login_DeveRetornarFalha_QuandoEmailNaoExiste()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "naoexiste@exemplo.com", Senha = "SenhaIncorreta" };
            _mockMotoristaRepository.Setup(r => r.GetByEmailAsync(It.IsAny<string>()))
                                    .ReturnsAsync((Motorista)null);

            // Act
            var result = await _authService.Login(loginDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email ou senha inválidos.", result.Error); // Ajuste na mensagem de erro
            Assert.Null(result.Value);
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Warning,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Tentativa de login com credenciais inválidas para o e-mail 'naoexiste@exemplo.com'.")), // Mantido o original
                    null,
                    (Func<It.IsAnyType, Exception, string>)It.IsAny<object>()),
                Times.Once);
        }

        [Fact]
        public async Task Login_DeveRetornarFalha_QuandoSenhaIncorreta()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "usuario@exemplo.com", Senha = "SenhaIncorreta" };
            var motorista = new Motorista(loginDto.Email, "hashedPassword");
            _mockMotoristaRepository.Setup(r => r.GetByEmailAsync(loginDto.Email))
                                    .ReturnsAsync(motorista);
            _mockPasswordHasher.Setup(h => h.VerifyPassword("SenhaIncorreta", "hashedPassword"))
                               .Returns(false);

            // Act
            var result = await _authService.Login(loginDto);

            // Assert
            Assert.False(result.IsSuccess);
            Assert.Equal("Email ou senha inválidos.", result.Error); // Ajuste na mensagem de erro
            Assert.Null(result.Value);
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Warning,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Tentativa de login com credenciais inválidas para o e-mail 'usuario@exemplo.com'.")), // Mantido o original
                    null,
                    (Func<It.IsAnyType, Exception, string>)It.IsAny<object>()),
                Times.Once);
        }
    }
}