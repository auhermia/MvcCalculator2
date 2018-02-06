namespace Mvc5Calculator.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Calculators", "Operator", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Calculators", "Operator", c => c.String());
        }
    }
}
