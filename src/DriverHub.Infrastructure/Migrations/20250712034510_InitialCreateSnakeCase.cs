using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DriverHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateSnakeCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "motoristas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    sobrenome = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    senha_hash = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    sal = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    numero_celular = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    aluguel_semanal_veiculo = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    dias_trabalhados_por_semana = table.Column<int>(type: "integer", nullable: false),
                    autonomia_veiculo_km_por_litro = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    data_cadastro = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_motoristas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "viagens",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    motorista_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_viagem = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    origem = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    destino = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    distancia_km = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    valor_recebido = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    custo_combustivel = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    lucro = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_viagens", x => x.id);
                    table.ForeignKey(
                        name: "fk_viagens_motoristas_motorista_id",
                        column: x => x.motorista_id,
                        principalTable: "motoristas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_motoristas_email",
                table: "motoristas",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_viagens_motorista_id",
                table: "viagens",
                column: "motorista_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "viagens");

            migrationBuilder.DropTable(
                name: "motoristas");
        }
    }
}
