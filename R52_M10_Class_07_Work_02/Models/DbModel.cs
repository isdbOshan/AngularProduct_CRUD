using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace R52_M10_Class_07_Work_02.Models
{
    public class Section
    {
        public int SectionId { get; set; }
        [Required, StringLength(30)]
        public string SectionName { get; set; } = default!;
        public virtual ICollection<Product> Products { get; set; }=new List<Product>();
    }
    public class Product
    {
        public int ProductId { get; set; }
        [Required, StringLength(40)]
        public string ProductName { get; set; } = default!;
        [Required, ForeignKey("Section")]
        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = default!;
        public virtual ICollection<Manager> Managers { get; set; }= new List<Manager>();
    }
    public class Manager
    {
        public int ManagerId { get; set; }
        [Required, StringLength(50)]
        public string ManagerName { get; set; } = default!;
        public string Picture { get; set; } = default!;
        [Required, ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; } = default!;
    }
    public class PlantDbContext:DbContext
    {
        public PlantDbContext(DbContextOptions<PlantDbContext> options) : base(options) { }
        public DbSet<Section> Sections { get; set; } = default!;
        public DbSet<Product> Products { get; set; } = default!;
        public DbSet<Manager> Managers { get; set; } = default!;
    }
}
