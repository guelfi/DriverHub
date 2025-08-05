using DriverHub.Application.Common;
using DriverHub.Application.DTOs;
using DriverHub.Application.Services;
using DriverHub.Domain.Repositories;

namespace DriverHub.Application.Services.Implementations;

public class MotoristaService : IMotoristaService
{
    private readonly IMotoristaRepository _motoristaRepository;
    private readonly IPasswordHasher _passwordHasher;

    public MotoristaService(IMotoristaRepository motoristaRepository, IPasswordHasher passwordHasher)
    {
        _motoristaRepository = motoristaRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Result<ProfileDto>> GetProfileAsync(string motoristaId)
    {
        var motorista = await _motoristaRepository.GetByIdAsync(Guid.Parse(motoristaId));
        if (motorista == null)
        {
            return Result<ProfileDto>.Failure("Motorista não encontrado.");
        }

        var profileDto = new ProfileDto
        {
            Nome = motorista.Nome,
            Sobrenome = motorista.Sobrenome,
            Email = motorista.Email
        };

        return Result<ProfileDto>.Success(profileDto);
    }

    public async Task<Result> UpdateProfileAsync(string motoristaId, UpdateProfileDto updateDto)
    {
        var motorista = await _motoristaRepository.GetByIdAsync(Guid.Parse(motoristaId));
        if (motorista == null)
        {
            return Result.Failure("Motorista não encontrado.");
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Email) && updateDto.Email != motorista.Email)
        {
            var existingMotorista = await _motoristaRepository.GetByEmailAsync(updateDto.Email);
            if (existingMotorista != null && existingMotorista.Id != motorista.Id)
            {
                return Result.Failure("O e-mail informado já está em uso por outra conta.");
            }
            motorista.Email = updateDto.Email;
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Nome))
        {
            motorista.Nome = updateDto.Nome;
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Sobrenome))
        {
            motorista.Sobrenome = updateDto.Sobrenome;
        }

        if (!string.IsNullOrWhiteSpace(updateDto.NovaSenha))
        {
            var (hash, salt) = _passwordHasher.HashPassword(updateDto.NovaSenha);
            motorista.SenhaHash = hash;
            motorista.Sal = salt;
        }

        await _motoristaRepository.UpdateAsync(motorista);

        return Result.Success();
    }
}
