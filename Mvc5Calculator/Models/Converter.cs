using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace Mvc5Calculator.Models
{
    public class Converter
    {
        [Key]
        public int Id { get; set; }
        public string FromUnit { get; set; }
        public float FromValue { get; set; }
        //public float FromCoeff { get; set; }
        public string ToUnit { get; set; }
        public float ToValue { get; set; }
        //public float ToCoeff { get; set; }
    }

    public class ConverterDBContext : DbContext
    {
        public DbSet<Converter> Converter { get; set; }
    }
}