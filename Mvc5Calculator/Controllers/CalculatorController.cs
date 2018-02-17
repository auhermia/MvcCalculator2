using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mvc5Calculator.Models;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Configuration;

namespace Mvc5Calculator.Controllers
{
    public class CalculatorController : Controller
    {
        private CalculatorDBContext db = new CalculatorDBContext();

        // GET: Calculator
        public ActionResult Index()
        {
            //return View(db.Calculator.ToList());
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
                case '^':
                    result = Math.Pow(a, b);
                    break;
            }
            //System.Diagnostics.Debug.WriteLine(TempData["Operator"]);
            return Json(result);
        }

        // Refresh calculations table
        public PartialViewResult CalcPartial()
        {
            // why specify model?
            List<Calculator> model = db.Calculator.ToList();
            return PartialView("CalcPartial", model);
            //return PartialView("PartialTest", db.Calculator.ToList());
        }

        // POST DATA TO DB
        [HttpPost]
        public ActionResult AddCalc(float Operand1, float Operand2, string Operator, float Result)
        {
            try
            {
                Calculator calcObj = new Calculator();
                calcObj.Operand1 = Operand1;
                calcObj.Operand2 = Operand2;
                calcObj.Operator = Operator;
                calcObj.Result = Result;
                
                db.Calculator.Add(calcObj);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content("Error occured " + ex);
            }
            return RedirectToAction("CalcPartial") ;
        }

        // DELETE FROM DB
        [HttpPost]
        public ActionResult Delete()
        {
            db.Calculator.RemoveRange(db.Calculator);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
                
    }
}