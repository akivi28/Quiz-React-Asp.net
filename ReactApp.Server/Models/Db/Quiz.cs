namespace ReactApp.Server.Models.Db;

public class Quiz
{
    public int Id { get; set; }
    public int CategoryId {get; set;}
    public int DifficultyId { get; set; }
    public int TypeId { get; set; }
    public List<Question> Questions { get; set; } = new List<Question>();
    public DateTime CreatedAt { get; set; }
    public User User { get; set; }
    public int Score { get; set; }
}