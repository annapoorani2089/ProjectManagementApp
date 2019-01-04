using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using ProjectManagement.Api.Controllers;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using DAL = ProjectManagement.DAL;
using System.Web.Http.Results;
using System.Net;

namespace ProjectManagement.UnitTest
{
    class UsersControllerTest : ApiController
    {
        [Test]
        public void GetUser()
        {
            // Set up Prerequisites   
            var controller = new UsersController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.Getuser(1);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.user>>(response);
        }

        [Test]
        public void AddUser()
        {
            var controller = new UsersController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.user usr = new DAL.user
            {
                first_name = "fname",
                last_name="lname",
                deleted = false,
                employee_id = 789
            };
            IHttpActionResult actionResult = controller.Postuser(usr);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<DAL.user>;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }

        [Test]
        public void UpdateUser()
        {
            var controller = new UsersController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.user usr = new DAL.user
            {
                first_name = "fname",
                last_name = "lname",
                deleted = false,
                employee_id = 789,
                user_id = 8
            };
            IHttpActionResult actionResult = controller.Putuser(8, usr);
            var createdResult = actionResult as StatusCodeResult;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(HttpStatusCode.NoContent, createdResult.StatusCode);
        }

        [Test]
        public void DeleteUser()
        {
            // Set up Prerequisites   
            var controller = new UsersController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.Deleteuser(11);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.user>>(response);
        }
    }
}
