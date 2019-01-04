using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProjectManagement.DAL;
using System.Web.Http.Cors;

namespace ProjectManagement.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ParentTaskController : ApiController
    {
        private ProjectManagementEntities db = new ProjectManagementEntities();

        // GET: api/ParentTask
        public IQueryable<parent_task> Getparent_task()
        {
            return db.parent_task;
        }

        // GET: api/ParentTask/5
        [ResponseType(typeof(parent_task))]
        public IHttpActionResult Getparent_task(int id)
        {
            parent_task parent_task = db.parent_task.Find(id);
            if (parent_task == null)
            {
                return NotFound();
            }

            return Ok(parent_task);
        }

        // PUT: api/ParentTask/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putparent_task(int id, parent_task parent_task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != parent_task.parent_id)
            {
                return BadRequest();
            }

            db.Entry(parent_task).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!parent_taskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ParentTask
        [ResponseType(typeof(parent_task))]
        public IHttpActionResult Postparent_task(parent_task parent_task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.parent_task.Add(parent_task);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (parent_taskExists(parent_task.parent_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = parent_task.parent_id }, parent_task);
        }

        // DELETE: api/ParentTask/5
        [ResponseType(typeof(parent_task))]
        public IHttpActionResult Deleteparent_task(int id)
        {
            parent_task parent_task = db.parent_task.Find(id);
            if (parent_task == null)
            {
                return NotFound();
            }

            db.parent_task.Remove(parent_task);
            db.SaveChanges();

            return Ok(parent_task);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool parent_taskExists(int id)
        {
            return db.parent_task.Count(e => e.parent_id == id) > 0;
        }
    }
}