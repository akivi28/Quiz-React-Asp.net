using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ReactApp.Server.Models.Db;

[Area("Auth")]
[Route("api/auth")]
[Authorize]
public class ProfileController : ControllerBase
{
   private readonly UserManager<User> _userManager;

   public ProfileController(UserManager<User> userManager)
   {
      _userManager = userManager;
   }

   [HttpGet]
   [Route("profile")]
   public async Task<UserRest> Profile()
   {
      var id = int.Parse(User.Claims.First(x => x.Type == "Id").Value);
      var user = await _userManager
         .Users
         .FirstAsync(x => x.Id == id);
      return new UserRest
      {
         Id = user.Id,
         Email = user.Email,
         UserName = user.UserName,
         DateOfBirth = user.DateOfBirth.ToString()
      };
   }
   
}