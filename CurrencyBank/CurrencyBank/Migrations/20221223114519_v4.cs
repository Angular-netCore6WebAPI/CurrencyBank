using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CurrencyBank.Migrations
{
    /// <inheritdoc />
    public partial class v4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrencyId",
                table: "userscurrencies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "userscurrencies");

            migrationBuilder.AddColumn<string>(
                name: "CurrencyName",
                table: "userscurrencies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "userscurrencies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrencyName",
                table: "userscurrencies");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "userscurrencies");

            migrationBuilder.AddColumn<int>(
                name: "CurrencyId",
                table: "userscurrencies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "userscurrencies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
