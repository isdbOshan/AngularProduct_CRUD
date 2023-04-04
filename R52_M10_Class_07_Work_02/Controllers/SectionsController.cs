﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using R52_M10_Class_07_Work_02.Models;

namespace R52_M10_Class_07_Work_02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly PlantDbContext _context;
       
        public SectionsController(PlantDbContext context)
        {
            _context = context;
            
        }

        // GET: api/Sections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Section>>> GetSections()
        {
          if (_context.Sections == null)
          {
              return NotFound();
          }
            return await _context.Sections.ToListAsync();
        }

        // GET: api/Sections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Section>> GetSection(int id)
        {
          if (_context.Sections == null)
          {
              return NotFound();
          }
            var section = await _context.Sections.FindAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            return section;
        }
        //Custom
        //******************************
        [HttpGet("Products/{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetSectionProducts(int id /* scetion id */ )
        {
            return await _context.Products.Where(x=> x.SectionId == id).ToListAsync();  
        }

        // PUT: api/Sections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSection(int id, Section section)
        {
            if (id != section.SectionId)
            {
                return BadRequest();
            }

            _context.Entry(section).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SectionExists(id))
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

        // POST: api/Sections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Section>> PostSection(Section section)
        {
          if (_context.Sections == null)
          {
              return Problem("Entity set 'PlantDbContext.Sections'  is null.");
          }
            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSection", new { id = section.SectionId }, section);
        }

        // DELETE: api/Sections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(int id)
        {
            if (_context.Sections == null)
            {
                return NotFound();
            }
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        //Custom
        //For Image upload
        
        private bool SectionExists(int id)
        {
            return (_context.Sections?.Any(e => e.SectionId == id)).GetValueOrDefault();
        }
    }
}
