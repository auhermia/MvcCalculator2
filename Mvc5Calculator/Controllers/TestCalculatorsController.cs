using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Mvc5Calculator.Models;

namespace Mvc5Calculator.Controllers
{
    public class TestCalculatorsController : Controller
    {
        private CalculatorDBContext db = new CalculatorDBContext();

        // GET: TestCalculators
        public ActionResult IndexTest()
        {
            return View(db.Calculator.ToList());
        }

        // GET: TestCalculators/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Calculator calculator = db.Calculator.Find(id);
            if (calculator == null)
            {
                return HttpNotFound();
            }
            return View(calculator);
        }

        // GET: TestCalculators/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TestCalculators/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Operand1,Operand2,Operator,Result")] Calculator calculator)
        {
            if (ModelState.IsValid)
            {
                db.Calculator.Add(calculator);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(calculator);
        }

        // GET: TestCalculators/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Calculator calculator = db.Calculator.Find(id);
            if (calculator == null)
            {
                return HttpNotFound();
            }
            return View(calculator);
        }

        // POST: TestCalculators/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Operand1,Operand2,Operator,Result")] Calculator calculator)
        {
            if (ModelState.IsValid)
            {
                db.Entry(calculator).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(calculator);
        }

        // GET: TestCalculators/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Calculator calculator = db.Calculator.Find(id);
            if (calculator == null)
            {
                return HttpNotFound();
            }
            return View(calculator);
        }

        // POST: TestCalculators/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Calculator calculator = db.Calculator.Find(id);
            db.Calculator.Remove(calculator);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
