using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mvc5Calculator.Models
{
    public class ConverterUnitTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UnitType { get; set; }
        public string UnitName { get; set; }
        public string UnitLongName { get; set; }
        public double Coefficient { get; set; }
        public double Intercept { get; set; }
    }

    //public class ConverterUnitTableDbContext : DbContext
    //{
    //    public DbSet<ConverterUnitTable> ConverterUnitTable { get; set; }
    //}
}