using Backend.API.Models;
using Backend.API.Models.DTOs;
using Backend.API.Schema.Mutations.User;
using Backend.API.Services;

namespace Backend.API.Schema.Mutations
{
    public class Mutation
    {
        private readonly UserService _userService;

        public Mutation(UserService userService)
        {
            _userService = userService;
        }

        public async Task<bool> CreateUser(UserInputType userInput)
        {
            UserDto userDto = new UserDto()
            {
                Email = userInput.Email,
                Password = userInput.Password,
            };

            // do stuff with Dto

            TbUser user = new TbUser()
            {
                Email = userDto.Email,
                Password = userDto.Password,
            };

            // modify to return the entity saved in Database
            await _userService.CreateAsync(user);

            return true;
        }
    }
}
