using DriverHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DriverHub.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Motorista> Motoristas { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Viagem> Viagens { get; set; }
        public DbSet<LancamentoDiario> LancamentosDiarios { get; set; }
        public DbSet<DespesaPessoal> DespesasPessoais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração para a entidade Motorista
            modelBuilder.Entity<Motorista>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired();
                entity.Property(e => e.Sobrenome).IsRequired();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.SenhaHash).IsRequired();
                entity.Property(e => e.Sal).IsRequired();
                entity.Property(e => e.NumeroCelular).IsRequired();
            });

            // Configuração para a nova entidade Admin
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired();
                entity.Property(e => e.Sobrenome).IsRequired();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.SenhaHash).IsRequired();
                entity.Property(e => e.Sal).IsRequired();
            });

            // Configuração para a entidade Viagem
            modelBuilder.Entity<Viagem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Origem).IsRequired();
                entity.Property(e => e.Destino).IsRequired();
                entity.HasOne(d => d.Motorista)
                    .WithMany(p => p.Viagens)
                    .HasForeignKey(d => d.MotoristaId);
            });

            // Configuração para LancamentoDiario
            modelBuilder.Entity<LancamentoDiario>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne<Motorista>()
                    .WithMany()
                    .HasForeignKey(e => e.MotoristaId)
                    .IsRequired();
            });

            // Configuração para DespesaPessoal
            modelBuilder.Entity<DespesaPessoal>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne<Motorista>()
                    .WithMany()
                    .HasForeignKey(e => e.MotoristaId)
                    .IsRequired();
            });
        }
    }
}
