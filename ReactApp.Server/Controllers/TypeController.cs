using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp.Server.Models;
using Type = ReactApp.Server.Models.Db.Type;

namespace ReactApp.Server.Controllers

{
	[ApiController]
	[Authorize]
	[Route("api/[controller]")]
	public class TypeController : ControllerBase
	{
		private readonly SiteContext _context;

		public TypeController(SiteContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("types")]
		public List<Type> Get()
		{
			return _context.Types.ToList();
		}
	}
}
