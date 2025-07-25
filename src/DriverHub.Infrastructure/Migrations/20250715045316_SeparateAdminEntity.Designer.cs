﻿// <auto-generated />
using System;
using DriverHub.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DriverHub.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250715045316_SeparateAdminEntity")]
    partial class SeparateAdminEntity
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DriverHub.Domain.Entities.Admin", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTimeOffset>("DataCadastro")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("data_cadastro");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<string>("Sal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("sal");

                    b.Property<string>("SenhaHash")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("senha_hash");

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("sobrenome");

                    b.HasKey("Id")
                        .HasName("pk_admins");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasDatabaseName("ix_admins_email");

                    b.ToTable("admins", (string)null);
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.DespesaPessoal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Categoria")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("categoria");

                    b.Property<DateTime>("Data")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("data");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("descricao");

                    b.Property<Guid>("MotoristaId")
                        .HasColumnType("uuid")
                        .HasColumnName("motorista_id");

                    b.Property<Guid>("MotoristaId1")
                        .HasColumnType("uuid")
                        .HasColumnName("motorista_id1");

                    b.Property<decimal>("Valor")
                        .HasColumnType("numeric")
                        .HasColumnName("valor");

                    b.HasKey("Id")
                        .HasName("pk_despesas_pessoais");

                    b.HasIndex("MotoristaId")
                        .HasDatabaseName("ix_despesas_pessoais_motorista_id");

                    b.HasIndex("MotoristaId1")
                        .HasDatabaseName("ix_despesas_pessoais_motorista_id1");

                    b.ToTable("despesas_pessoais", (string)null);
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.LancamentoDiario", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("Data")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("data");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("descricao");

                    b.Property<Guid>("MotoristaId")
                        .HasColumnType("uuid")
                        .HasColumnName("motorista_id");

                    b.Property<Guid>("MotoristaId1")
                        .HasColumnType("uuid")
                        .HasColumnName("motorista_id1");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("tipo");

                    b.Property<decimal>("Valor")
                        .HasColumnType("numeric")
                        .HasColumnName("valor");

                    b.HasKey("Id")
                        .HasName("pk_lancamentos_diarios");

                    b.HasIndex("MotoristaId")
                        .HasDatabaseName("ix_lancamentos_diarios_motorista_id");

                    b.HasIndex("MotoristaId1")
                        .HasDatabaseName("ix_lancamentos_diarios_motorista_id1");

                    b.ToTable("lancamentos_diarios", (string)null);
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.Motorista", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<decimal>("AluguelSemanalVeiculo")
                        .HasColumnType("numeric")
                        .HasColumnName("aluguel_semanal_veiculo");

                    b.Property<decimal>("AutonomiaVeiculoKmPorLitro")
                        .HasColumnType("numeric")
                        .HasColumnName("autonomia_veiculo_km_por_litro");

                    b.Property<DateTimeOffset>("DataCadastro")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("data_cadastro");

                    b.Property<int>("DiasTrabalhadosPorSemana")
                        .HasColumnType("integer")
                        .HasColumnName("dias_trabalhados_por_semana");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<string>("NumeroCelular")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("numero_celular");

                    b.Property<string>("Sal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("sal");

                    b.Property<string>("SenhaHash")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("senha_hash");

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("sobrenome");

                    b.HasKey("Id")
                        .HasName("pk_motoristas");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasDatabaseName("ix_motoristas_email");

                    b.ToTable("motoristas", (string)null);
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.Viagem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<decimal>("CustoCombustivel")
                        .HasColumnType("numeric")
                        .HasColumnName("custo_combustivel");

                    b.Property<DateTimeOffset>("DataViagem")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("data_viagem");

                    b.Property<string>("Destino")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("destino");

                    b.Property<decimal>("DistanciaKm")
                        .HasColumnType("numeric")
                        .HasColumnName("distancia_km");

                    b.Property<decimal>("Lucro")
                        .HasColumnType("numeric")
                        .HasColumnName("lucro");

                    b.Property<Guid>("MotoristaId")
                        .HasColumnType("uuid")
                        .HasColumnName("motorista_id");

                    b.Property<string>("Origem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("origem");

                    b.Property<decimal>("ValorRecebido")
                        .HasColumnType("numeric")
                        .HasColumnName("valor_recebido");

                    b.HasKey("Id")
                        .HasName("pk_viagens");

                    b.HasIndex("MotoristaId")
                        .HasDatabaseName("ix_viagens_motorista_id");

                    b.ToTable("viagens", (string)null);
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.DespesaPessoal", b =>
                {
                    b.HasOne("DriverHub.Domain.Entities.Motorista", null)
                        .WithMany()
                        .HasForeignKey("MotoristaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_despesas_pessoais_motoristas_motorista_id");

                    b.HasOne("DriverHub.Domain.Entities.Motorista", "Motorista")
                        .WithMany()
                        .HasForeignKey("MotoristaId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_despesas_pessoais_motoristas_motorista_id1");

                    b.Navigation("Motorista");
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.LancamentoDiario", b =>
                {
                    b.HasOne("DriverHub.Domain.Entities.Motorista", null)
                        .WithMany()
                        .HasForeignKey("MotoristaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_lancamentos_diarios_motoristas_motorista_id");

                    b.HasOne("DriverHub.Domain.Entities.Motorista", "Motorista")
                        .WithMany()
                        .HasForeignKey("MotoristaId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_lancamentos_diarios_motoristas_motorista_id1");

                    b.Navigation("Motorista");
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.Viagem", b =>
                {
                    b.HasOne("DriverHub.Domain.Entities.Motorista", "Motorista")
                        .WithMany("Viagens")
                        .HasForeignKey("MotoristaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_viagens_motoristas_motorista_id");

                    b.Navigation("Motorista");
                });

            modelBuilder.Entity("DriverHub.Domain.Entities.Motorista", b =>
                {
                    b.Navigation("Viagens");
                });
#pragma warning restore 612, 618
        }
    }
}
