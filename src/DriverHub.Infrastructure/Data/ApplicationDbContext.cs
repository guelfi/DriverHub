using Microsoft.EntityFrameworkCore;
using DriverHub.Domain.Entities;

namespace DriverHub.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Motorista> Motoristas { get; set; }
        public DbSet<Viagem> Viagens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Motorista entity
            modelBuilder.Entity<Motorista>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(255);
                entity.Property(e => e.SenhaHash).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Sal).IsRequired().HasMaxLength(255);
                entity.Property(e => e.NumeroCelular).IsRequired().HasMaxLength(20);
                entity.Property(e => e.AluguelSemanalVeiculo).HasPrecision(18, 2);
                entity.Property(e => e.AutonomiaVeiculoKmPorLitro).HasPrecision(18, 2);
                entity.Property(e => e.DataCadastro).IsRequired();
                entity.Property(e => e.Role).IsRequired();
            });

            // Configure Viagem entity
            modelBuilder.Entity<Viagem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Origem).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Destino).IsRequired().HasMaxLength(255);
                entity.Property(e => e.DistanciaKm).HasPrecision(18, 2);
                entity.Property(e => e.DataViagem).IsRequired();
                entity.Property(e => e.ValorRecebido).HasPrecision(18, 2);
                entity.Property(e => e.CustoCombustivel).HasPrecision(18, 2);
                entity.Property(e => e.Lucro).HasPrecision(18, 2);

                entity.HasOne(d => d.Motorista)
                      .WithMany(p => p.Viagens)
                      .HasForeignKey(d => d.MotoristaId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}