
using System.Text.Json.Serialization;

namespace ReactApp.Server.Models.Db;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; }
    public List<Option> Options { get; set; } = new List<Option>();
    public Category Category { get; set; }
    public Type Type { get; set; }
    public Difficulty Difficulty { get; set; }
    [JsonIgnore]
    public List<Quiz> Quizzes { get; set; } = new List<Quiz>();
}