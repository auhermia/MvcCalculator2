using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

// ViewModel to list the different units in dropdown (m, cm, in, etc)

namespace Mvc5Calculator.ViewModels
{
    public class UnitListViewModel
    {
        public int Id { get; set; }
        public string UnitType { get; set; }
        public string UnitLongName { get; set; }

    }
}