using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ReactApp.Server.Models.Db;

[Area("Auth")]
[Route("api/auth")]
public class HomeController : ControllerBase
{
   private readonly UserManager<User> _userManager;

   public HomeController(UserManager<User> userManager)
   {
      _userManager = userManager;
   }

   [HttpPost]
   [Route("register")]
   public async Task<AuthResponse> Register([FromBody] RegisterForm form)
   {
      if (form.Password != form.ConfirmPassword)
      {
         return CreateResponse(false, "passwords must match", 0, null);
      }

      var user = await _userManager.FindByEmailAsync(form.Email);
      if (user!=null)
      {
         return CreateResponse(false, "user with such email already exist", 1, null);
      }

      user = new User
      {
         UserName = form.UserName,
         DateOfBirth = form.DateOfBirth,
         Email = form.Email
      };

      var result = await _userManager.CreateAsync(user, form.Password);

      if (!result.Succeeded)
      {
         var errors = result.Errors.Select(x => x.Description);
         return CreateResponse(false, string.Join("; ", errors), 3, null);
      }

      
      return CreateResponse(true, null, null, GenerateToken(user));
   }

   [HttpPost]
   [Route("login")]
   public async Task<AuthResponse> Login([FromBody] LoginForm form)
   {
      var user = await _userManager.FindByEmailAsync(form.Login);
      if (user == null)
      {
         return CreateResponse(false, "User with such email doesn't exist", 0, null);
      }

      if (!await _userManager.CheckPasswordAsync(user, form.Password))
      {
         return CreateResponse(false, "Invalid password", 1, null);
      }
      return CreateResponse(true, null, null, GenerateToken(user));
   }
   private string GenerateToken(User user)
   {
      var jwtHandler = new JwtSecurityTokenHandler();
      var key = Encoding.UTF8.GetBytes("my-secret-code-my-secret-code-my-secret-code");
      var jwtDescriptor = new SecurityTokenDescriptor
      {
         Subject = new ClaimsIdentity(new[]
         {
            new Claim("Id", user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
         }),
         Expires = DateTime.Now.AddDays(7),
         SigningCredentials =
            new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = jwtHandler.CreateToken(jwtDescriptor);
      var jwtToken = jwtHandler.WriteToken(token);
      return jwtToken;
   }
   private AuthResponse CreateResponse(bool success, string? errorMessage, int? code, string? token)
   {
      if (errorMessage == null)
      {
         return new AuthResponse
         {
            Success = success,
            Error = null,
            Token = token
         };
      }
      return new AuthResponse
      {
         Success = success,
         Error = new ErrorRest
         {
            Code = code,
            Message = errorMessage
         },
         Token = token
      };
   }
   
}