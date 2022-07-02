using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.Persistence.Migrations
{
    public partial class MakeItemFieldsUnrequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "QuantityInStock",
                table: "Items",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Items",
                type: "decimal(9,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(9,2)");

            migrationBuilder.AlterColumn<long>(
                name: "MinimalBuyQuantity",
                table: "Items",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "QuantityInStock",
                table: "Items",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Items",
                type: "decimal(9,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(9,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "MinimalBuyQuantity",
                table: "Items",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }
    }
}
