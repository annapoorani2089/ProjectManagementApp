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
    public class TasksControllerTest : ApiController
    {
        [Test]
        public void GetTask()
        {
            // Set up Prerequisites   
            var controller = new TasksController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.GetTask(1);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.Task>>(response);
        }

        [Test]
        public void AddTask()
        {
            var controller = new TasksController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.Task tsk = new DAL.Task
            {
                end_date = DateTime.Now.AddDays(20),
                start_date = DateTime.Now,
                task1 = "Test task3",
                project_id = 1,
                parent_id = 1,
                user_id = 1,
                priority = 20
            };
            IHttpActionResult actionResult = controller.PostTask(tsk);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<DAL.Task>;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }
        [Test]
        public void AddParentTask()
        {
            var controller = new ParentTaskController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.parent_task tsk = new DAL.parent_task
            {
                parent_task1 = "Test task3"
            };
            IHttpActionResult actionResult = controller.Postparent_task(tsk);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<DAL.parent_task>;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }
        [Test]
        public void UpdateTask()
        {
            var controller = new TasksController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.Task tsk = new DAL.Task
            {
                end_date = DateTime.Now.AddDays(20),
                start_date = DateTime.Now,
                task1 = "Test task3",
                project_id = 1,
                parent_id = 1,
                user_id = 1,
                priority = 20,
                task_id= 3
            };
            IHttpActionResult actionResult = controller.PutTask(3,tsk);
            var createdResult = actionResult as StatusCodeResult;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(HttpStatusCode.NoContent, createdResult.StatusCode);
        }

        [Test]
        public void DeleteTask()
        {
            // Set up Prerequisites   
            var controller = new TasksController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.DeleteTask(5);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.Task>>(response);
        }

    }
}
