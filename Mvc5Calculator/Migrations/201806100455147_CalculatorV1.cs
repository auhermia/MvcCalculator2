namespace Mvc5Calculator.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CalculatorV1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Calculators",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Operand1 = c.Single(nullable: false),
                        Operand2 = c.Single(nullable: false),
                        Operator = c.String(),
                        Result = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Converters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FromUnit = c.String(),
                        FromValue = c.Single(nullable: false),
                        ToUnit = c.String(),
                        ToValue = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ConverterUnitTables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UnitType = c.String(),
                        UnitName = c.String(),
                        UnitLongName = c.String(),
                        Coefficient = c.Double(nullable: false),
                        Intercept = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UnitTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UnitTypes");
            DropTable("dbo.ConverterUnitTables");
            DropTable("dbo.Converters");
            DropTable("dbo.Calculators");
        }
    }
}
