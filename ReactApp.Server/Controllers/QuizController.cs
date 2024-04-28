using System.Security.Claims;
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
	public class QuizController : ControllerBase
	{
		private readonly SiteContext _context;
		public QuizController(SiteContext context)
		{
			_context = context;
		}

		[HttpPost]
		[Route("add")]
		public async Task<IActionResult> Add([FromBody] CreateQuizModel model)
		{
			try
			{
				var userEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);
				var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
				Quiz newQuiz = new Quiz
				{
					CreatedAt = DateTime.Now,
					CategoryId = model.Category,
					DifficultyId = model.Difficulty,
					TypeId = model.Type,
					User = user
				};

				_context.Quizzes.Add(newQuiz);

				foreach (var question in model.Questions)
				{
					var currentQuestion = await _context.Questions.FirstOrDefaultAsync(q => q.Id == question.Id);
					if (currentQuestion != null)
					{
						newQuiz.Questions.Add(currentQuestion);
					}
				}

				foreach (var option in model.SelectedOptions)
				{
					var currentOption = await _context.Options.FirstOrDefaultAsync(o => o.Id == option);
					if (currentOption != null)
					{
						SelectedQuizOptions selectedOption = new SelectedQuizOptions
						{
							Option = currentOption,
							Quiz = newQuiz
						};
						_context.SelectedQuizOptions.Add(selectedOption);
					}
				}

				await _context.SaveChangesAsync();
				
				newQuiz.Score = await _context.SelectedQuizOptions.CountAsync(o => o.QuizId == newQuiz.Id && o.Option.IsCorrect);
				await _context.SaveChangesAsync();

				return Ok(newQuiz);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex}");
			}
		}

		[HttpGet]
		[Route("history")]
		public async Task<List<QuizResp>> History()
		{
			var userEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);

			var quizzes =  _context.Quizzes
				.Include(q => q.Questions)
				.ThenInclude(q => q.Options)
				.Where(q => q.User.Email == userEmail)
				.ToList();
			
			List<QuizResp> quizResps = new List<QuizResp>();

			foreach (var q in quizzes)
			{
				var category = _context.Categories.FirstOrDefault(c => c.Id == q.CategoryId);
				var difficulty = _context.Difficulties.FirstOrDefault(d => d.Id == q.DifficultyId);
				var type = _context.Types.FirstOrDefault(t => t.Id == q.TypeId);
				QuizResp quizResp = new QuizResp
				{
					Questions = q.Questions,
					Score = q.Score,
					CreatedAt = q.CreatedAt
				};
				if (category != null)
				{
					quizResp.Category = category.Title;
				}

				if (difficulty != null)
				{
					quizResp.Difficulty = difficulty.Name;
				}

				if (type != null)
				{
					quizResp.Type = type.Title;
				}
				quizResp.SelectedOptions = await _context.SelectedQuizOptions
					.Include(o => o.Option)
					.Where(o => o.QuizId == q.Id)
					.Select(o => o.Option)
					.ToListAsync();
				quizResps.Add(quizResp);
			}
				
			return quizResps;
		}


	}
}
