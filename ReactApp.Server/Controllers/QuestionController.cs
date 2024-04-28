using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Controllers.Models;
using ReactApp.Server.Models;
using ReactApp.Server.Models.Db;

namespace ReactApp.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class QuestionController : ControllerBase
	{
		private readonly SiteContext _context;

		public QuestionController(SiteContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("questions/{count}/{category}/{difficulty}/{type}")]
		public List<Question> Get(int count, int category, int difficulty, int type)
		{
			var questionsQuery = _context.Questions
				.Where(q => (category == 0 || q.Category.Id == category) &&
				            (difficulty == 0 || q.Difficulty.Id == difficulty) &&
				            (type == 0 || q.Type.Id == type))
				.Include(q => q.Options)
				.Include(q => q.Type)
				.Include(q => q.Category)
				.Include(q => q.Difficulty);
			var questions = questionsQuery.ToList();
			
			if (questions.Count > count)
			{
				var random = new Random();
				questions = questions.OrderBy(q => random.Next()).Take(count).ToList();
			}
			return questions;
		}
		
		
	}
}
