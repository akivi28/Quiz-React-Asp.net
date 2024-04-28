using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp.Server.Models;
using ReactApp.Server.Models.Db;

namespace ReactApp.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class CategoryController : ControllerBase
	{
		private readonly SiteContext _context;

		public CategoryController(SiteContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("categories")]
		public List<Category> Get()
		{
			return _context.Categories.ToList();
		}
	}
}
