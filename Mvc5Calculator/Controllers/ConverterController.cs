using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mvc5Calculator.Models;


namespace Mvc5Calculator.Controllers
{
    public class ConverterController : Controller
    {
        private ConverterDBContext db = new ConverterDBContext();

        // GET: Converter
        public ActionResult Index()
        {
            return View();
        }

        // Conversions
        public JsonResult Convert(string fromUnit, float fromValue, float fromCoeff,
                                  string toUnit, float toCoeff )
        {

            System.Diagnostics.Debug.WriteLine(fromUnit);

            float toValue = 0;

            if (fromUnit == "f" && toUnit == "c")
            {
                toValue = (fromValue - 32) * 5 / 9;
            }
            else if (fromUnit == "c" && toUnit == "f")
            {
                toValue = (fromValue * 9 / 5) + 32;
            }
            else 
            {
                toValue = fromValue * (1 / fromCoeff) * toCoeff;
            }

            System.Diagnostics.Debug.WriteLine(toValue);
            return Json(toValue);
        }
        
        public PartialViewResult ConvertPartial()
        {
            List<Converter> model = db.Converter.ToList();
            return PartialView("ConvertPartial", model);
        }

        // Save to DB
        [HttpPost]
        public ActionResult AddConvert(string fromUnit, float fromValue, string toUnit, float toValue)
        {
            System.Diagnostics.Debug.WriteLine("This shows up");
            try
            {
                Converter convertObj = new Converter
                {
                    FromUnit = fromUnit,
                    FromValue = fromValue,
                    ToUnit = toUnit,
                    ToValue = toValue
                };

                db.Converter.Add(convertObj);
                db.SaveChanges();
            }

            catch(Exception ex)
            {
                return Content("Error occured " + ex);
            }

            return RedirectToAction("Index", "Calculator");
        }

        // Delete from DB
    }
}