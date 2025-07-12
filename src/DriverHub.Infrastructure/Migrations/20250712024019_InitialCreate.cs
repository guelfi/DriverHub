using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DriverHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Motoristas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Sobrenome = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    SenhaHash = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Sal = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    NumeroCelular = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    AluguelSemanalVeiculo = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    DiasTrabalhadosPorSemana = table.Column<int>(type: "integer", nullable: false),
                    AutonomiaVeiculoKmPorLitro = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    DataCadastro = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Motoristas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Viagens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MotoristaId = table.Column<Guid>(type: "uuid", nullable: false),
                    DataViagem = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Origem = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Destino = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    DistanciaKm = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    ValorRecebido = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    CustoCombustivel = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Lucro = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Viagens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Viagens_Motoristas_MotoristaId",
                        column: x => x.MotoristaId,
                        principalTable: "Motoristas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Motoristas_Email",
                table: "Motoristas",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Viagens_MotoristaId",
                table: "Viagens",
                column: "MotoristaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Viagens");

            migrationBuilder.DropTable(
                name: "Motoristas");
        }
    }
}
