using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.Persistence.Migrations
{
    public partial class RenameItemPathToFile_To_ItemFileName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoFilePath",
                table: "Items",
                newName: "PhotoFileName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoFileName",
                table: "Items",
                newName: "PhotoFilePath");
        }
    }
}
