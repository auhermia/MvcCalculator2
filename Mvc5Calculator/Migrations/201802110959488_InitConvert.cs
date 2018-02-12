namespace Mvc5Calculator.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitConvert : DbMigration
    {
        public override void Up()
        {
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
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Converters");
        }
    }
}
