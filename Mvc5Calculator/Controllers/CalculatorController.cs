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

            // TempData["key"] = value;
            TempData["Operand1"] = a;
            TempData["Operand2"] = b;
            TempData["Operator"] = operation;
            TempData["Result"] = result;
            System.Diagnostics.Debug.WriteLine("RESULT IS " + result + " a:" + a + " b:" + b);
            System.Diagnostics.Debug.WriteLine(TempData["Operator"]);
            return Json(result);
        }

        // testing out sql connection stuff

        // private SqlConnection con;

        [HttpPost]
        public ActionResult AddCalc(float Operand1, float Operand2, char Operator)
        {
            System.Diagnostics.Debug.WriteLine(TempData["Operand1"]); // this works!!!
           
            try
            {
                Calculator calcObj = new Calculator();
                calcObj.Operand1 = Operand1;
                System.Diagnostics.Debug.WriteLine(calcObj.Operand1);


                db.Calulator.Add(calcObj);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content("Error occured");
            }
                return View();
        }

        //private void AddDetails(Calculator obj)
        //{
        //    SqlConnection con = new SqlConnection("Data Source=(local); Initial Catalog=Calculator2; Integrated Security=SSPI");
        //    SqlDataReader rdr = null;
        //    SqlCommand com = new SqlCommand("AddCalc", con);
        //    com.CommandType = System.Data.CommandType.StoredProcedure;
        //    com.Parameters.AddWithValue("@Operand1", obj.Operand1);
        //    com.Parameters.AddWithValue("@Operand2", obj.Operand2);
        //    com.Parameters.AddWithValue("@Operator", obj.Operator);
        //    com.Parameters.AddWithValue("@Result", obj.Result);
        //    con.Open();
        //    com.ExecuteNonQuery();
        //    con.Close();

        //}

        //[HttpPost]
        //public ActionResult SaveResult(Calculator model)
        //{
        //    try
        //    {
        //        Calculator calculator = new Calculator();
        //        calculator.Operand1 = model.Operand1;
        //        calculator.Operand2 = model.Operand2;
        //        calculator.Operator = model.Operator;
        //        calculator.Result = model.Result;

        //        db.Calulator.Add(calculator);
        //        db.SaveChanges();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }


        //    return View(model);
        //}

        
    }
}