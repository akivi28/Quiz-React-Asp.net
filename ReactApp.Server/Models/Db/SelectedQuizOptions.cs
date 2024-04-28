namespace ReactApp.Server.Models.Db;

public class SelectedQuizOptions
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
    public int OptionId { get; set; }
    public Option Option { get; set; }
}