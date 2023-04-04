using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using R52_M10_Class_07_Work_02.Models;
using R52_M10_Class_07_Work_02.ViewModels;

namespace R52_M10_Class_07_Work_02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagersController : ControllerBase
    {
        private readonly PlantDbContext _context;
        private readonly IWebHostEnvironment env;
        public ManagersController(PlantDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env = env;
        }

        // GET: api/Managers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manager>>> GetManagers()
        {
          if (_context.Managers == null)
          {
              return NotFound();
          }
            return await _context.Managers.Include(x=>x.Product).ToListAsync();
        }

        // GET: api/Managers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Manager>> GetManager(int id)
        {
          if (_context.Managers == null)
          {
              return NotFound();
          }
            var manager = await _context.Managers.FindAsync(id);

            if (manager == null)
            {
                return NotFound();
            }

            return manager;
        }

        // PUT: api/Managers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutManager(int id, Manager manager)
        {
            if (id != manager.ManagerId)
            {
                return BadRequest();
            }

            _context.Entry(manager).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ManagerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Managers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Manager>> PostManager(Manager manager)
        {
          if (_context.Managers == null)
          {
              return Problem("Entity set 'PlantDbContext.Managers'  is null.");
          }
            _context.Managers.Add(manager);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetManager", new { id = manager.ManagerId }, manager);
        }

        // DELETE: api/Managers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManager(int id)
        {
            if (_context.Managers == null)
            {
                return NotFound();
            }
            var manager = await _context.Managers.FindAsync(id);
            if (manager == null)
            {
                return NotFound();
            }

            _context.Managers.Remove(manager);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("Picture/Upload/{id}")]
        public async Task<ActionResult<ImagePath>> Upload(int id, IFormFile file)
        {
            var manager = await _context.Managers.FindAsync(id);
            if (manager == null)
            {
                return NotFound();
            }
            try
            {
                string ext = Path.GetExtension(file.FileName);
                string f = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + ext;
                if (!Directory.Exists(env.WebRootPath + "\\Images\\"))
                {
                    Directory.CreateDirectory(env.WebRootPath + "\\Images\\");
                }
                using FileStream filestream = System.IO.File.Create(env.WebRootPath + "\\Images\\" + f);

                file.CopyTo(filestream);
                filestream.Flush();

                filestream.Close();
                manager.Picture = f;
                await _context.SaveChangesAsync();
                return new ImagePath { SavedFileName=f};

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        private bool ManagerExists(int id)
        {
            return (_context.Managers?.Any(e => e.ManagerId == id)).GetValueOrDefault();
        }
    }
}
