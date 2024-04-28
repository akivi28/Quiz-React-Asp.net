using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Models.Db;

namespace ReactApp.Server.Models;

public class SiteContext : IdentityDbContext<User, IdentityRole<int>,int>
{
    public SiteContext(DbContextOptions<SiteContext> options) : base(options) { }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Models.Db.Type> Types { get; set; }
    public virtual DbSet<Option> Options { get; set; }
    public virtual DbSet<Question> Questions { get; set; }
    public virtual DbSet<Quiz> Quizzes { get; set; }
    public virtual DbSet<Difficulty> Difficulties { get; set; }
    public virtual DbSet<SelectedQuizOptions> SelectedQuizOptions { get; set; }
}