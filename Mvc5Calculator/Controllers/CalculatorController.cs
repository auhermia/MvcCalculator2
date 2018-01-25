using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc5Calculator.Controllers
{
    public class CalculatorController : Controller
    {
        // GET: Calculator
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Evaluate(double a, double b, char operation)
        {
            double result = 0;

            switch (operation)
            {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '×':
                    result = a * b;
                    break;
                case '÷':
                    result = a / b;
                    break;
                    //case '^':
                    //    result = Math.Pow(a,b);
                    //    break;
            }

            return Json(result);
        }
    }
}