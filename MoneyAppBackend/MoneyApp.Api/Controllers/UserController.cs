using Microsoft.AspNetCore.Mvc;
using MoneyApp.Api.Repositories;

namespace MoneyApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserRepository _userRepository;
        public UserController(ILogger<UserController> logger, UserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        [HttpGet(Name = "GetUser")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userRepository.GetAll();

            if (users != null && users.Any())
            {
                return Ok(users);
            }
            else
            {
                return NotFound();
            }
        }
    }
}

