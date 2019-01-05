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
    [TestFixture]
    public class ProjectControllerTest : ApiController
    {
        [Test]
        public void GetProject()
        {
            // Set up Prerequisites   
            var controller = new ProjectsController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.GetProject(1);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.Project>>(response);
        }

        [Test]
        public void AddProject()
        {
            var controller = new ProjectsController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.Project prj = new DAL.Project
            {
                end_date = DateTime.Now.AddDays(20),
                start_date = DateTime.Now,
                project1 = "Test project2",
                user_id = 2,
                priority = 20
            };
            IHttpActionResult actionResult = controller.PostProject(prj);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<DAL.Project>;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }

        [Test]
        public void UpdateProject()
        {
            var controller = new ProjectsController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.Project prj = new DAL.Project
            {
                end_date = DateTime.Now.AddDays(20),
                start_date = DateTime.Now,
                project1 = "Test project2",
                user_id = 2,
                priority = 20,
                project_id = 3
            };
            IHttpActionResult actionResult = controller.PutProject(3, prj);
            var createdResult = actionResult as StatusCodeResult;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(HttpStatusCode.NoContent, createdResult.StatusCode);
        }

        [Test]
        public void DeleteProject()
        {
            // Set up Prerequisites   
            var controller = new ProjectsController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.DeleteProject(6);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.Project>>(response);
        }

    }
}
