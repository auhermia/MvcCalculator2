using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mvc5Calculator.Models
{
    public class Converter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FromUnit { get; set; }
        public float FromValue { get; set; }
        public string ToUnit { get; set; }
        public float ToValue { get; set; }
    }

    //public class ConverterDBContext : DbContext
    //{
    //    public DbSet<Converter> Converter { get; set; }
    //}
}