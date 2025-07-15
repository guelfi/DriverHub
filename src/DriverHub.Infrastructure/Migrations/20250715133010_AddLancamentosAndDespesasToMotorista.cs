using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DriverHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLancamentosAndDespesasToMotorista : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_despesas_pessoais_motoristas_motorista_id1",
                table: "despesas_pessoais");

            migrationBuilder.DropForeignKey(
                name: "fk_lancamentos_diarios_motoristas_motorista_id1",
                table: "lancamentos_diarios");

            migrationBuilder.DropIndex(
                name: "ix_lancamentos_diarios_motorista_id1",
                table: "lancamentos_diarios");

            migrationBuilder.DropIndex(
                name: "ix_despesas_pessoais_motorista_id1",
                table: "despesas_pessoais");

            migrationBuilder.DropColumn(
                name: "motorista_id1",
                table: "lancamentos_diarios");

            migrationBuilder.DropColumn(
                name: "motorista_id1",
                table: "despesas_pessoais");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "motorista_id1",
                table: "lancamentos_diarios",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "motorista_id1",
                table: "despesas_pessoais",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "ix_lancamentos_diarios_motorista_id1",
                table: "lancamentos_diarios",
                column: "motorista_id1");

            migrationBuilder.CreateIndex(
                name: "ix_despesas_pessoais_motorista_id1",
                table: "despesas_pessoais",
                column: "motorista_id1");

            migrationBuilder.AddForeignKey(
                name: "fk_despesas_pessoais_motoristas_motorista_id1",
                table: "despesas_pessoais",
                column: "motorista_id1",
                principalTable: "motoristas",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_lancamentos_diarios_motoristas_motorista_id1",
                table: "lancamentos_diarios",
                column: "motorista_id1",
                principalTable: "motoristas",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
