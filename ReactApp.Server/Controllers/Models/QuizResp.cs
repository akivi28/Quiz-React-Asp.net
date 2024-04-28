using ReactApp.Server.Models.Db;

namespace ReactApp.Server.Controllers.Models;

public class QuizResp
{
    public string? Category { get; set; }
    public string? Difficulty { get; set; }
    public string? Type { get; set; }
    public List<Question> Questions { get; set; }
    
    public List<Option> SelectedOptions { get; set; }
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; }
}