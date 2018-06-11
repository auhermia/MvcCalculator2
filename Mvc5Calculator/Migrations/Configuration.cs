namespace Mvc5Calculator.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Mvc5Calculator.Models;
    using System.Collections.Generic;

    internal sealed class Configuration : DbMigrationsConfiguration<Mvc5Calculator.Context.CalculatorContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Mvc5Calculator.Context.CalculatorContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            //context.UnitTypes
            //var unitTypes = new List<UnitType>();
            //unitTypes.Add(new UnitType
            //{
            //    Name = "Area"
            //});
            //unitTypes.Add(new UnitType {
            //    Name = "Length"
            //});
            //unitTypes.Add(new UnitType
            //{
            //    Name = "Mass"
            //});
            //unitTypes.Add(new UnitType
            //{
            //    Name = "Temperature"
            //});
            //unitTypes.Add(new UnitType
            //{
            //    Name = "Time"
            //});
            //unitTypes.Add(new UnitType
            //{
            //    Name = "Volume"
            //});
        }
    }
}
