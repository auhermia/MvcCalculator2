using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mvc5Calculator.Models;
using Mvc5Calculator.Context;
using System.Web.UI.WebControls;
using Mvc5Calculator.ViewModels;

namespace Mvc5Calculator.Controllers
{
    public class ConverterController : Controller

    {
        // 1.  Connect to db through context class
        private CalculatorContext db = new CalculatorContext();

        public ActionResult Index()
        {
            // 1A. Load Unit Type and Units dropdowns

            // Unit Type - data pulled from ViewModel
            // ViewBag.UnitTypes = new SelectList(db.UnitTypes, "Id", "Name");
            List<UnitTypesViewModel> unitType = db.UnitTypes.Select(m => new UnitTypesViewModel()
            {
                Id = m.Id,
                Name = m.Name
            }).ToList();

            ViewBag.UnitTypes = new SelectList(unitType, "Id", "Name");

            return View();
        }

        // Retrieves list of units from db table based on selected unit type 
        public JsonResult GetUnitsByType (string unitType)
        {
            var units = from m in db.ConverterUnitTables
                    where m.UnitType == unitType
                    select m;

            System.Diagnostics.Debug.WriteLine(units);
            System.Diagnostics.Debug.WriteLine("test");

            return Json(units.ToList());
        }

        // 2.  Conversions
        public JsonResult Convert(string fromUnit, float fromValue, string toUnit)
        {
            double toValue = 0;

            // grab coefficients and intercept from db table
            var fromCoefficient = (from m in db.ConverterUnitTables
                                  where m.UnitLongName == fromUnit
                                  select m.Coefficient).SingleOrDefault();
            var fromIntercept = (from m in db.ConverterUnitTables
                                where m.UnitLongName == fromUnit
                                select m.Intercept).SingleOrDefault();
            var toCoefficient = (from m in db.ConverterUnitTables
                                where m.UnitLongName == toUnit
                                select m.Coefficient).SingleOrDefault();
            /* 
             * note - all conversions are linearly scaled, so basic linear equation can be used
             * y = mx + b
            *  y = toValue
            *  m = 'slope' = toCoefficient / fromCoefficient
            *  x = fromValue
            *  b = 'intercept'
            */

            toValue = fromValue * (toCoefficient / fromCoefficient) + fromIntercept;

            System.Diagnostics.Debug.WriteLine("test test test!!!!");
            System.Diagnostics.Debug.WriteLine(fromCoefficient);

            return Json(toValue);
            //return Json(toValue);

        }

        // 3.  Retrieve values from db and sends to PartialView
        public PartialViewResult ConvertPartial()
        {
            return PartialView("ConvertPartial", db.Converters.ToList());
        }

        // 4.  Save to DB
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

                db.Converters.Add(convertObj);
                db.SaveChanges();
            }
            catch(Exception ex)
            {
                return Content("Error occured " + ex);
            }
            return RedirectToAction("Index", "Converter");
        }

        // 5.  Delete from DB
        [HttpPost]
        public ActionResult Delete()
        {
            db.Converters.RemoveRange(db.Converters);
            db.SaveChanges();
            return RedirectToAction("Index", "Converter");
        }
    }
}