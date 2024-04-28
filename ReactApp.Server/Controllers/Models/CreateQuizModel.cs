using ReactApp.Server.Models.Db;

namespace ReactApp.Server.Controllers.Models;

public class CreateQuizModel
{
    public List<Question> Questions { get; set; } = new List<Question>();
    public int Category { get; set; }
    public int Difficulty { get; set; }
    public int Type { get; set; }
    public List<int> SelectedOptions { get; set; } = new List<int>();
}