using Backend.API.Models;
using Backend.API.Services;

namespace Backend.API.Schema.Queries
{
    public class Query
    {
        public string instructions => "Test Pana";

        public async Task<IEnumerable<TbUser>> GetUsers([Service] UserService userService)
        {
            return await userService.GetUsersAsync();
        }
    }
}
