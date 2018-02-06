using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace Mvc5Calculator.Models
{
    public class Calculator
    {
        public int Id { get; set; }
        public float Operand1 { get; set; }
        public float Operand2 { get; set; }
        public string Operator { get; set; }
        public float Result { get; set; }
    }

    // handles connecting to db and mapping Calculator Objs to db records
    public class CalculatorDBContext : DbContext
    {
        public DbSet<Calculator> Calulator { get; set; }
    }
}