using Microsoft.AspNetCore.Identity;

namespace ReactApp.Server.Models.Db;

public class User:IdentityUser<int>
{
    public DateTime DateOfBirth { get; set; }
}