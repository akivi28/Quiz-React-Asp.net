namespace ReactApp.Server.Models.Db;

public class AuthResponse
{
    public bool Success { get; set; }
    public ErrorRest? Error { get; set; }
    public string? Token { get; set; }
}