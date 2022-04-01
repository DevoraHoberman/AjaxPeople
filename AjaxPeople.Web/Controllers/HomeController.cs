using AjaxPeople.Data;
using AjaxPeople.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AjaxPeople.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString =
            @"Data Source=.\sqlexpress;Initial Catalog=FurnitureStore;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            var repo = new AjaxPeopleRepo(_connectionString);
            var people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new AjaxPeopleRepo(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        public void EditPerson(Person person)
        {
            var repo = new AjaxPeopleRepo(_connectionString);
            repo.EditPerson(person);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new AjaxPeopleRepo(_connectionString);
            repo.DeletePerson(id);
        }
    }
}
