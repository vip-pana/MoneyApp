using Microsoft.AspNetCore.Mvc;
using MoneyApp.Api.Models;
using MoneyApp.Api.Repositories;

namespace MoneyApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
                _logger.LogInformation("success");
                return Ok(users);
            }
            else
            {
                _logger.LogError("error");
                return NotFound();
            }
        }


        [HttpGet("{id:length(24)}")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _userRepository.GetById(id: id);

            if (user != null)
            {
                _logger.LogInformation("success");
                return Ok(user);
            } else
            {
                _logger.LogError("error");
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            await _userRepository.Create(user);
            return CreatedAtAction(actionName: nameof(Create), routeValues: new { id = user.Id }, value: user);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, User user)
        {
            var existingUser = await _userRepository.GetById(id: id);

            if (existingUser == null)
            {
                return BadRequest();
            }

            await _userRepository.Update(entity: user, id: id);

            return Ok();
        }

         
    }
}

