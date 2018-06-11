using Mvc5Calculator.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Mvc5Calculator.Context
{
    public class CalculatorContext : DbContext
    {
        public CalculatorContext()
        { 
        }

        public DbSet<Calculator> Calculators { get; set; }
        public DbSet<Converter> Converters { get; set; }
        public DbSet<ConverterUnitTable> ConverterUnitTables { get; set; }
        public DbSet<UnitType> UnitTypes { get; set; }

    }
}