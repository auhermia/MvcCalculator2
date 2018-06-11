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


    /* ACTUAL CONVERSIONS */
    {
        // 1.  Connect to db
        private CalculatorContext db = new CalculatorContext();

        public ActionResult Index()
        {
            // 1A. Load Unit Type and Units dropdowns

            // through db
            ViewBag.UnitTypes = new SelectList(db.UnitTypes, "Id", "Name");

            // through ViewModel
            List<UnitListViewModel> unitList = db.ConverterUnitTables.Select(m => new UnitListViewModel()
            {
                Id = m.Id,
                UnitType = m.UnitType,
                UnitLongName = m.UnitLongName
            }).ToList();

            ViewBag.UnitList = new SelectList(unitList, "Id", "UnitLongName");
           
            return View();
        }

        public JsonResult FilterUnitTypes (string unitType)
        {
            //List<UnitListViewModel> units = new List<UnitListViewModel>();
            var units = from m in db.ConverterUnitTables
                    where m.UnitType == unitType
                    select m;
            
            var unitList = from x in db.ConverterUnitTables
                           select new UnitListViewModel
                           {
                               Id = x.Id,
                               UnitType = x.UnitType,
                               UnitLongName = x.UnitLongName
                           };
            System.Diagnostics.Debug.WriteLine("test");
            System.Diagnostics.Debug.WriteLine(units.ToList());
            return Json(units.ToList());
            
            //Trace.WriteLine("test");
        }

        // 2.  Conversions
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