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

        // Conversions
        public JsonResult Convert(string fromUnit, float fromValue, float fromCoeff,
                                  string toUnit, float toCoeff )
        {
            float toValue = 0;

            // temperature conversion
            if (fromUnit == "°F" && toUnit == "°C")
            {
                toValue = (fromValue - 32) * 5 / 9;
            }
            else if (fromUnit == "°C" && toUnit == "°F")
            {
                toValue = (fromValue * 9 / 5) + 32;
            }
            // everything else
            else 
            {
                toValue = fromValue * (1 / fromCoeff) * toCoeff;
            }
            return Json(toValue);
        }
        
        public PartialViewResult ConvertPartial()
        {
            return PartialView("ConvertPartial", db.Converter.ToList());
        }

        // Save to DB
        [HttpPost]
        public ActionResult AddConvert(string fromUnit, float fromValue, string toUnit, float toValue)
        {
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
        [HttpPost]
        public ActionResult Delete()
        {
            db.Converter.RemoveRange(db.Converter);
            db.SaveChanges();
            return RedirectToAction("Index", "Calculator");
        }
    }
}