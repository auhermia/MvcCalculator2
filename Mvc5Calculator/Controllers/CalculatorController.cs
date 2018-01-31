using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mvc5Calculator.Models;
using System.Data.Entity;

namespace Mvc5Calculator.Controllers
{
    public class CalculatorController : Controller
    {
        private CalculatorDBContext db = new CalculatorDBContext();

        // GET: Calculator
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Evaluate(float a, float b, char operation)
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
            System.Diagnostics.Debug.WriteLine("RESULT IS " + result + " " + a + " " + b);
            return Json(result);
        }

        [HttpPost]
        public ActionResult SaveResult(Calculator model)
        {
            try
            {
                Calculator calculator = new Calculator();
                calculator.Operand1 = model.Operand1;
                calculator.Operand2 = model.Operand2;
                calculator.Operator = model.Operator;
                calculator.Result = model.Result;

                db.Calulator.Add(calculator);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return RedirectToAction("Index");
        }

        
    }
}