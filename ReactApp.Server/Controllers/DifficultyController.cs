using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp.Server.Models;
using ReactApp.Server.Models.Db;

namespace ReactApp.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class DifficultyController : ControllerBase
	{
		private readonly SiteContext _context;
		public DifficultyController(SiteContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("difficulties")]
		public List<Difficulty> Get()
		{
			return _context.Difficulties.ToList();
		}
	}
}
